from datetime import datetime

from app.core.database_sync import SessionLocal
from app.models.resume_raw import ResumeRaw
from app.models.resume_education import ResumeEducation
from app.models.resume_experience import ResumeExperience
from app.models.resume_profile import ResumeProfile
from app.models.resume_project import ResumeProject
from app.models.resume_skills import ResumeSkills


def parse_date(date_str: str | None):
    if date_str is None:
        return None
    return datetime.strptime(date_str, "%Y-%m-%d")


def save_resume(resume_id: int, raw_text: dict):

    with SessionLocal() as db:
        try:

            # ---------------- Resume Raw ---------------- #

            db.add(
                ResumeRaw(
                    resume_id=resume_id,
                    raw_text=raw_text
                )
            )

            # ---------------- Resume Profile ---------------- #

            profile = raw_text["resume_profile"]

            db.add(
                ResumeProfile(
                    resume_id=resume_id,
                    full_name=profile["full_name"],
                    email=profile["email"],
                    phone=profile["phone"],
                    summary=profile["summary"]
                )
            )

            # ---------------- Resume Education ---------------- #

            for education in raw_text["resume_education"]:
                db.add(
                    ResumeEducation(
                        resume_id=resume_id,
                        institution=education["institution"],
                        degree=education["degree"],
                        start_date=parse_date(education["start_date"]),
                        end_date=parse_date(education["end_date"])
                    )
                )

            # ---------------- Resume Experience ---------------- #

            for experience in raw_text["resume_experience"]:
                db.add(
                    ResumeExperience(
                        resume_id=resume_id,
                        company=experience["company"],
                        title=experience["title"],
                        description=experience["description"],
                        start_date=parse_date(experience["start_date"]),
                        end_date=parse_date(experience["end_date"])
                    )
                )

            # ---------------- Resume Projects ---------------- #

            for project in raw_text["resume_projects"]:
                db.add(
                    ResumeProject(
                        resume_id=resume_id,
                        project_name=project["project_name"],
                        description=project["description"]
                    )
                )

            # ---------------- Resume Skills ---------------- #

            db.add(
                ResumeSkills(
                    resume_id=resume_id,
                    skill_names=raw_text["resume_skills"]["skill_names"]
                )
            )

            db.commit()

        except Exception as e:
            db.rollback()
            print(f"Error while saving resume {resume_id}: {e}")
            raise