from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.dependencies import get_db
from app.schemas.jobs import Job
from app.services.matcher.resume_embedding_getter import get_resume_embedding
from app.services.matcher.similar_job_finder import get_similar_jobs

router = APIRouter(
    prefix="/matcher",
    tags=["Matcher"],
)


@router.get(
    "/{resume_id}",
    response_model=list[Job],
    response_model_exclude={"jd_embedding", "embedding_model"},
)
async def match_resume(
    resume_id: int,
    limit: int = 30,
    db: AsyncSession = Depends(get_db),
):
    try:
        resume_embedding = await get_resume_embedding(
            db=db,
            resume_id=resume_id,
            embedding_type="experience",
        )

        jobs = await get_similar_jobs(
            db=db,
            resume_embedding=resume_embedding,
            limit=limit,
        )

        return jobs

    except ValueError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e),
        )

    except Exception:
        raise HTTPException(
            status_code=500,
            detail="Failed to retrieve similar jobs.",
        )