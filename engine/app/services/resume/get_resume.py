from sqlalchemy import select
from app.core.database import AsyncSessionLocal

from app.models.resume import Resume


async def resume_getter(resume_id: int):
    async with AsyncSessionLocal() as db:
        result = await db.execute(
            select(Resume)
            .where(Resume.id == resume_id)
        )

        resume = result.scalar_one_or_none()
        print(f"Resume found: {resume}")
        return resume