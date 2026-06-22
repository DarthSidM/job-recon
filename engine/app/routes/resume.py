from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import Depends, APIRouter, HTTPException

from app.models.resume import Resume
from app.schemas.resume import ResumeProcessRequest
from app.core.dependencies import get_db

from app.workers.resume_tasks import process_resume_task

router = APIRouter()

@router.post("/process-resume")
async def process_resume(payload: ResumeProcessRequest):
    id = payload.resume_id
    process_resume_task.delay(id)
    return {
        "message": "Resume queued for processing"
    }
