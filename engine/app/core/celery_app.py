from celery import Celery
from app.core.config import REDIS_URL
celery_app = Celery(
    "resume_engine",
    broker=REDIS_URL,
    backend=REDIS_URL
)