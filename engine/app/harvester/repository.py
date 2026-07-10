from typing import Dict, List
from datetime import datetime

from sqlalchemy import select
from app.services.harvester.embedder import embed
from app.schemas.jobs import Job
from app.core.database_sync import SessionLocal
from app.models.job import Job as JobRecord

class JobRepository:

    def sync_jobs(self, source: str, company: str, harvested_jobs: List[Job]) -> None:
        """
        Synchronize harvested jobs with the database.

        Steps:
        1. Fetch existing jobs.
        2. Determine inserts, updates and missing jobs.
        3. Increment missing_count for missing jobs.
        4. Upsert new/existing jobs.
        """
        print(
            f"[repo.sync_jobs] start source={source} company={company} harvested={len(harvested_jobs)}"
        )
        existing_jobs_in_db = self._get_jobs(source, company)
        print(f"[repo.sync_jobs] existing_active_jobs={len(existing_jobs_in_db)}")

        existing_map = self._build_job_map(existing_jobs_in_db)
        harvested_map = self._build_job_map(harvested_jobs)

        jobs_to_insert = [
            job
            for job_id, job in harvested_map.items()
            if job_id not in existing_map
        ]

        jobs_to_update = [
            job
            for job_id, job in harvested_map.items()
            if job_id in existing_map
        ]

        missing_jobs = [
            job
            for job_id, job in existing_map.items()
            if job_id not in harvested_map
        ]

        print(
            f"[repo.sync_jobs] insert={len(jobs_to_insert)} update={len(jobs_to_update)} missing={len(missing_jobs)}"
        )

        self._mark_missing_jobs(missing_jobs)

        jobs_to_insert = self._embed_jobs(jobs_to_insert)
        jobs_to_update = self._embed_jobs(jobs_to_update)
        self._upsert_jobs(jobs_to_insert, jobs_to_update)
        print(f"[repo.sync_jobs] complete source={source} company={company}")

    def _get_jobs(self, source: str, company: str) -> List[Job]:
        """
        Fetch all jobs belonging to a company + source + is_active = True.
        """
        with SessionLocal() as db:
            result = db.execute(
                select(JobRecord).where(
                    JobRecord.source == source,
                    JobRecord.company == company,
                    JobRecord.isActive.is_(True),
                )
            )

            jobs = []
            for record in result.scalars().all():
                jobs.append(
                    Job(
                        source=record.source,
                        source_job_id=record.sourceJobId,
                        source_url=record.sourceUrl,
                        company=record.company,
                        apply_url=record.applyUrl,
                        is_active=record.isActive,
                        title=record.title,
                        location=record.location,
                        employment_type=record.employmentType,
                        first_seen_at=record.firstSeenAt,
                        missing_count=record.missingCount,
                        salary_min=record.salaryMin,
                        salary_max=record.salaryMax,
                        skills=list(record.skills or []),
                        exp_min=record.expMin,
                        job_description=record.jobDescription,
                    )
                )

            return jobs

    def _build_job_map(self, jobs: List[Job]) -> Dict[str, Job]:
        """
        Returns:
            {
                source_job_id: Job(...)
            }
        """
        return {
            job.source_job_id: job
            for job in jobs
        }

    def _mark_missing_jobs(self, missing_jobs: List[Job]) -> None:
        """
        Increment missing_count.

        Optionally:
            if missing_count >= 3:
                is_active = False
        """
        if not missing_jobs:
            print("[repo.mark_missing_jobs] nothing to mark")
            return

        with SessionLocal() as db:
            print(f"[repo.mark_missing_jobs] processing={len(missing_jobs)}")
            for job in missing_jobs:
                print(f"[repo.mark_missing_jobs] source_job_id={job.source_job_id}")
                result = db.execute(
                    select(JobRecord).where(
                        JobRecord.source == job.source,
                        JobRecord.sourceJobId == job.source_job_id,
                    )
                )
                record = result.scalar_one_or_none()

                if record is None:
                    continue

                record.missingCount = (record.missingCount or 0) + 1
                if record.missingCount >= 3:
                    record.isActive = False
                    print(
                        f"[repo.mark_missing_jobs] deactivated source_job_id={job.source_job_id} missing_count={record.missingCount}"
                    )
                else:
                    print(
                        f"[repo.mark_missing_jobs] incremented source_job_id={job.source_job_id} missing_count={record.missingCount}"
                    )

            db.commit()
            print("[repo.mark_missing_jobs] commit complete")

    def _upsert_jobs(self, jobs_to_insert: List[Job], jobs_to_update: List[Job]) -> None:
        """
        Insert new jobs.

        Update existing jobs:
            - title
            - description
            - salary
            - skills
            - exp
            - location
            - missing_count = 0
            - is_active = True
        """
        with SessionLocal() as db:
            now = datetime.now()
            print(
                f"[repo.upsert_jobs] inserting={len(jobs_to_insert)} updating={len(jobs_to_update)}"
            )

            for job in jobs_to_insert:
                print(f"[repo.upsert_jobs] upsert-insert source_job_id={job.source_job_id}")
                result = db.execute(
                    select(JobRecord).where(
                        JobRecord.source == job.source,
                        JobRecord.sourceJobId == job.source_job_id,
                    )
                )
                record = result.scalar_one_or_none()

                if record is None:
                    db.add(
                        JobRecord(
                            source=job.source,
                            sourceJobId=job.source_job_id,
                            sourceUrl=job.source_url,
                            company=job.company,
                            applyUrl=job.apply_url,
                            isActive=job.is_active,
                            title=job.title,
                            location=job.location,
                            firstSeenAt=job.first_seen_at or now,
                            lastSeenAt=now,
                            missingCount=job.missing_count,
                            jobDescription=job.job_description,
                            employmentType=job.employment_type,
                            salaryMin=job.salary_min,
                            salaryMax=job.salary_max,
                            skills=job.skills,
                            expMin=job.exp_min,
                            embedding=job.jd_embedding,
                            model=job.embedding_model,
                        )
                    )
                    continue

                print(f"[repo.upsert_jobs] resurrect-existing source_job_id={job.source_job_id}")
                record.sourceUrl = job.source_url
                record.applyUrl = job.apply_url
                record.company = job.company
                record.isActive = True
                record.title = job.title
                record.location = job.location
                record.lastSeenAt = now
                record.missingCount = 0
                record.jobDescription = job.job_description
                record.employmentType = job.employment_type
                record.salaryMin = job.salary_min
                record.salaryMax = job.salary_max
                record.skills = job.skills
                record.expMin = job.exp_min

            for job in jobs_to_update:
                print(f"[repo.upsert_jobs] update source_job_id={job.source_job_id}")
                result = db.execute(
                    select(JobRecord).where(
                        JobRecord.source == job.source,
                        JobRecord.sourceJobId == job.source_job_id,
                    )
                )
                record = result.scalar_one_or_none()

                if record is None:
                    continue

                record.sourceUrl = job.source_url
                record.applyUrl = job.apply_url
                record.isActive = True
                record.title = job.title
                record.location = job.location
                record.lastSeenAt = now
                record.missingCount = 0
                record.jobDescription = job.job_description
                record.employmentType = job.employment_type
                record.salaryMin = job.salary_min
                record.salaryMax = job.salary_max
                record.skills = job.skills
                record.expMin = job.exp_min
                record.embedding = job.jd_embedding
                record.model = job.embedding_model

            db.commit()
            print("[repo.upsert_jobs] commit complete")

    def _embed_jobs(self, jobs: List[Job]) -> List[Job]:
        if not jobs:
            return jobs

        for job in jobs:
            if not job.job_description:
                continue

            embedding, model = embed(job.job_description)

            job.jd_embedding = embedding
            job.embedding_model = model

        return jobs