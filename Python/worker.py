from __future__ import annotations

import threading
import time
import uuid
from dataclasses import dataclass, field
from queue import Queue, Empty
from typing import Optional, Dict, Any

from pipeline import EvaluationPipeline, EvaluationConfig


@dataclass
class EvalJob:
    job_id: str
    config_path: str
    api_key: str
    created_at: float = field(default_factory=time.time)


@dataclass
class JobResult:
    status: str  # "queued" | "running" | "done" | "failed"
    started_at: Optional[float] = None
    finished_at: Optional[float] = None
    error: Optional[str] = None
    detailed_path: Optional[str] = None
    summary_path: Optional[str] = None


class EvaluationWorker:
    """
    Background worker that consumes EvalJob items from a queue.
    When the queue is empty, it blocks (idle) until a job arrives.
    """

    def __init__(self) -> None:
        self._queue: Queue[EvalJob] = Queue()
        self._stop_event = threading.Event()
        self._thread = threading.Thread(target=self._run_loop, daemon=True)

        # In-memory job status store (good enough for prototype/demo).
        # In production, store this in a DB.
        self.results: Dict[str, JobResult] = {}

    def start(self) -> None:
        self._thread.start()

    def stop(self) -> None:
        self._stop_event.set()
        self._thread.join(timeout=5)

    def submit(self, config_path: str, api_key: str) -> str:
        job_id = str(uuid.uuid4())
        job = EvalJob(job_id=job_id, config_path=config_path, api_key=api_key)
        self.results[job_id] = JobResult(status="queued")
        self._queue.put(job)
        return job_id

    def get_status(self, job_id: str) -> Optional[JobResult]:
        return self.results.get(job_id)

    def _run_loop(self) -> None:
        while not self._stop_event.is_set():
            try:
                # Blocks until a job arrives -> worker is "idle" when queue empty
                job = self._queue.get(timeout=0.5)
            except Empty:
                continue

            self.results[job.job_id].status = "running"
            self.results[job.job_id].started_at = time.time()

            try:
                config = EvaluationConfig.from_yaml(job.config_path)

                pipeline = EvaluationPipeline(
                    config=config,
                    api_key=job.api_key,  # <— direct API key injection
                )

                # You may want run_and_save to return paths; if it doesn't,
                # you can compute them from config or capture printed output.
                detailed_path, summary_path = pipeline.run_and_save()

                self.results[job.job_id].status = "done"
                self.results[job.job_id].detailed_path = detailed_path
                self.results[job.job_id].summary_path = summary_path

            except Exception as e:
                self.results[job.job_id].status = "failed"
                self.results[job.job_id].error = str(e)

            finally:
                self.results[job.job_id].finished_at = time.time()
                self._queue.task_done()