# app.py
"""
Flask REST API for the LLM Jailbreak Evaluation Framework.

Endpoints:
  POST   /api/run                  - Submit a new evaluation job
  GET    /api/status/<job_id>      - Poll job status
  GET    /api/results/<job_id>     - Get detailed per-attack results
  GET    /api/summary/<job_id>     - Get aggregated metrics summary
  GET    /api/jobs                 - List all jobs and their statuses

Usage:
  pip install flask flask-cors
  python app.py
"""

import json
import os
from pathlib import Path

from flask import Flask, jsonify, request
from flask_cors import CORS

from worker import EvaluationWorker

# ------------------------------------------------------------------ #
# App setup                                                           #
# ------------------------------------------------------------------ #

app = Flask(__name__)
CORS(app)  # Allow Next.js (different port) to call this API

# Single shared worker — starts its background thread on launch.
worker = EvaluationWorker()
worker.start()


# ------------------------------------------------------------------ #
# Helper                                                              #
# ------------------------------------------------------------------ #

def _job_not_found(job_id: str):
    return jsonify({"error": f"Job '{job_id}' not found."}), 404


def _load_json_file(path: str):
    """Read a JSON file from disk and return its contents as a dict."""
    p = Path(path)
    if not p.is_file():
        return None
    with open(p, "r", encoding="utf-8") as f:
        return json.load(f)


# ------------------------------------------------------------------ #
# Routes                                                              #
# ------------------------------------------------------------------ #

@app.route("/api/run", methods=["POST"])
def run_evaluation():
    """
    Submit a new evaluation job.

    Expected JSON body:
    {
        "api_key":     "<your Groq API key>",          # required
        "config_path": "config.yaml"                   # optional, defaults to config.yaml
    }

    Returns:
    {
        "job_id": "<uuid>"
    }
    """
    body = request.get_json(silent=True) or {}

    # API key: body > environment variable
    api_key = body.get("api_key") or os.getenv("GROQ_API_KEY")
    if not api_key:
        return jsonify({
            "error": "Missing API key. Provide 'api_key' in the request body or set GROQ_API_KEY."
        }), 400

    config_path = body.get("config_path", "config.yaml")
    if not Path(config_path).is_file():
        return jsonify({
            "error": f"Config file not found: '{config_path}'"
        }), 400

    job_id = worker.submit(config_path=config_path, api_key=api_key)

    return jsonify({"job_id": job_id}), 202


@app.route("/api/status/<job_id>", methods=["GET"])
def get_status(job_id: str):
    """
    Poll the status of a submitted job.

    Returns:
    {
        "job_id":      "<uuid>",
        "status":      "queued" | "running" | "done" | "failed",
        "started_at":  <unix timestamp or null>,
        "finished_at": <unix timestamp or null>,
        "error":       "<message or null>"
    }
    """
    result = worker.get_status(job_id)
    if result is None:
        return _job_not_found(job_id)

    return jsonify({
        "job_id":      job_id,
        "status":      result.status,
        "started_at":  result.started_at,
        "finished_at": result.finished_at,
        "error":       result.error,
    })


@app.route("/api/results/<job_id>", methods=["GET"])
def get_results(job_id: str):
    """
    Return the detailed per-attack evaluation results for a completed job.

    Returns the full GradSafe JSON (list of per-attack entries) or an error
    if the job is not yet done.
    """
    result = worker.get_status(job_id)
    if result is None:
        return _job_not_found(job_id)

    if result.status != "done":
        return jsonify({
            "error": f"Job is not complete yet. Current status: '{result.status}'"
        }), 409

    data = _load_json_file(result.detailed_path)
    if data is None:
        return jsonify({
            "error": f"Results file not found on disk: '{result.detailed_path}'"
        }), 500

    return jsonify(data)


@app.route("/api/summary/<job_id>", methods=["GET"])
def get_summary(job_id: str):
    """
    Return the aggregated metrics summary for a completed job.

    Returns the summary JSON (overall metrics + per-category breakdown) or
    an error if the job is not yet done.
    """
    result = worker.get_status(job_id)
    if result is None:
        return _job_not_found(job_id)

    if result.status != "done":
        return jsonify({
            "error": f"Job is not complete yet. Current status: '{result.status}'"
        }), 409

    data = _load_json_file(result.summary_path)
    if data is None:
        return jsonify({
            "error": f"Summary file not found on disk: '{result.summary_path}'"
        }), 500

    return jsonify(data)


@app.route("/api/jobs", methods=["GET"])
def list_jobs():
    """
    List all submitted jobs and their current statuses.

    Useful for a dashboard to show job history.

    Returns:
    {
        "jobs": [
            {
                "job_id":      "<uuid>",
                "status":      "queued" | "running" | "done" | "failed",
                "started_at":  <unix timestamp or null>,
                "finished_at": <unix timestamp or null>
            },
            ...
        ]
    }
    """
    jobs = [
        {
            "job_id":      job_id,
            "status":      r.status,
            "started_at":  r.started_at,
            "finished_at": r.finished_at,
        }
        for job_id, r in worker.results.items()
    ]

    # Most recent first
    jobs.sort(key=lambda j: j["started_at"] or 0, reverse=True)

    return jsonify({"jobs": jobs})


# ------------------------------------------------------------------ #
# Entry point                                                         #
# ------------------------------------------------------------------ #

if __name__ == "__main__":
    # debug=False is important — debug mode runs the reloader which
    # would start a second worker thread.
    app.run(host="0.0.0.0", port=5000, debug=False)