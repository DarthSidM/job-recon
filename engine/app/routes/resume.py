from fastapi import APIRouter

from app.schemas.resume import ResumeProcessRequest
from app.workers.resume_tasks import process_resume_task

router = APIRouter()


@router.post("/process-resume")
async def process_resume(
    payload: ResumeProcessRequest
):
    task = process_resume_task.delay(
        payload.resume_id,
        payload.resume_url
    )

    return {
        "status": "queued",
        "task_id": task.id
    }