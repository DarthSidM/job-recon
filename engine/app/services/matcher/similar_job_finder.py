from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession

from app.schemas.jobs import Job


async def get_similar_jobs(
    db: AsyncSession,
    resume_embedding: list[float],
    limit: int = 30,
) -> list[Job]:
    if not resume_embedding:
        raise ValueError("Resume embedding is empty.")

    embedding_str = "[" + ",".join(map(str, resume_embedding)) + "]"
    embedding_dims = len(resume_embedding)

    result = await db.execute(
        text("""
            SELECT
                source,
                "sourceJobId" AS source_job_id,
                "sourceUrl" AS source_url,
                company,
                "applyUrl" AS apply_url,
                "isActive" AS is_active,
                title,
                location,
                "employmentType" AS employment_type,
                "firstSeenAt" AS first_seen_at,
                "missingCount" AS missing_count,
                "salaryMin" AS salary_min,
                "salaryMax" AS salary_max,
                skills,
                "expMin" AS exp_min,
                                "jobDescription" AS job_description
            FROM "Job"
            WHERE embedding IS NOT NULL
              AND vector_dims(embedding) = :embedding_dims
            ORDER BY embedding <=> CAST(:embedding AS vector)
            LIMIT :limit
        """),
        {
            "embedding": embedding_str,
            "embedding_dims": embedding_dims,
            "limit": limit,
        },
    )

    rows = result.mappings().all()

    return [Job.model_validate(row) for row in rows]