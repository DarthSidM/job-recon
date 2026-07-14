from pydantic import BaseModel
from uuid import UUID


class BuildResumeRequest(BaseModel):
    message: str
    jd: str
    experience: str | None = None
    skills: str | None = None
    projects: str | None = None
    session_id: UUID | None = None