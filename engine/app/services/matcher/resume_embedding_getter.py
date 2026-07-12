from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.resume_embedding import ResumeEmbedding


async def get_resume_embedding(
    db: AsyncSession,
    resume_id: int,
    embedding_type: str = "experience",
) -> list[float]:
    result = await db.execute(
        select(ResumeEmbedding.embedding).where(
            ResumeEmbedding.resume_id == resume_id,
            ResumeEmbedding.embedding_type == embedding_type,
        )
    )

    embedding = result.scalar_one_or_none()

    if embedding is None:
        raise ValueError(
            f"No '{embedding_type}' embedding found for resume_id={resume_id}"
        )

    return list(embedding)