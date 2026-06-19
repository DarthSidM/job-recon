from celery import Celery

celery_app = Celery(
    "resume_engine",
    broker="redis://localhost:6379/0",
    backend="redis://localhost:6379/0"
)