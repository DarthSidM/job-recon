from celery import Celery
from app.core.config import REDIS_URL
celery_app = Celery(
    "engine",
    broker=REDIS_URL,
    backend=REDIS_URL
)
celery_app.conf.imports = (
    "app.workers.resume_tasks",
    "app.workers.job_tasks",
)
celery_app.conf.update(
    task_default_queue="default",
    task_routes={
        "app.workers.resume_tasks.*": {"queue": "resume"},
        "app.workers.job_tasks.*": {"queue": "jobs"},
    },
    beat_schedule={
        "sync-jobs-every-4-hours": {
            "task": "app.workers.job_tasks.process_jobs_task",
            "schedule": 4*60*60,  
            "options": {"queue": "jobs"},
        },
    },
    timezone="Asia/Kolkata",
)