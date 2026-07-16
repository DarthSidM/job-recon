import json
from redis import Redis
from app.core.config import REDIS_RESUME_BUILDER_HOST
redis_client = Redis(
    host=REDIS_RESUME_BUILDER_HOST,
    port=6379,
    db=1,
    decode_responses=True
)
def update_status(
    resume_id: int,
    status: str,
    step: str,
    progress: int,
    message: str,
):
    key = f"resume:status:{resume_id}"

    redis_client.set(
        key,
        json.dumps({
            "status": status,
            "step": step,
            "progress": progress,
            "message": message
        }),
        ex=3600
    )