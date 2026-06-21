from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import Depends, APIRouter, HTTPException

from app.models.resume import Resume
from app.schemas.resume import ResumeProcessRequest
from app.core.dependencies import get_db

from app.workers.resume_tasks import process_resume_task

router = APIRouter()


@router.post("/process-resume")
async def process_resume(
    payload: ResumeProcessRequest,
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(
        select(Resume)
        .where(Resume.id == payload.resume_id)
    )

    resume = result.scalar_one_or_none()

    if not resume:
        raise HTTPException(
            status_code=404,
            detail="Resume not found"
        )

    process_resume_task.delay(
        resume.id,
        resume.storage_url
    )

    return {
        "message": "Resume queued for processing"
    }