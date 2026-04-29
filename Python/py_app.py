import os
from flask import Flask, request, jsonify
from dotenv import load_dotenv

from pipeline import EvaluationPipeline, EvaluationConfig

load_dotenv()

app = Flask(__name__)
Internal_API_Key = os.getenv("Internal_API_Key")


def Authenticate():
    incoming_key = request.headers.get("API-Key")

 
    if Internal_API_Key == incoming_key:
        return True
    else:
        return False


@app.post("/Runjailbreak")
def Runjailbreak():
    if Authenticate() == False:
        return jsonify({
            "error": "Unathorized User"
        }), 401

    data = request.get_json(silent=True) or {}
    LLM_API = data.get("LLM_API")

    if not LLM_API:
        return jsonify({
            "error": "Missing 'LLM_API' key in request body."
        }), 400

    config_path = data.get("config_path", "config.yaml")
    if not os.path.isfile(config_path):
        return jsonify({
            "error": f"Config file not found: '{config_path}'"
        }), 400

    try:
        config = EvaluationConfig.from_yaml(config_path)
        pipeline = EvaluationPipeline(config=config, api_key=LLM_API)
        detailed_path, summary_path = pipeline.run_and_save()

        # Read the summary metrics to return in the response
        import json
        with open(summary_path, "r", encoding="utf-8") as f:
            summary = json.load(f)

        return jsonify({
            "status": "complete",
            "detailed_results_path": detailed_path,
            "summary_path": summary_path,
            "report": summary
        }), 200

    except Exception as e:
        import traceback
        traceback.print_exc()

        return jsonify({
            "error": str(e)
        }), 500


@app.get("/health")
def health():
    return jsonify({
        "ok": True,
        "service": "python-flask-service"
    }), 200


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5001, debug=False)