from sqlalchemy import select
from app.core.database_sync import SessionLocal
from app.models.resume_raw import ResumeRaw


def is_raw_available(resume_id: int) -> bool:
    with SessionLocal() as db:
        result = db.execute(
            select(ResumeRaw).where(ResumeRaw.resume_id == resume_id)
        )
        resume = result.scalar_one_or_none()
        if resume == None:
            return 0
        return 1 
        