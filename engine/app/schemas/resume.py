from pydantic import BaseModel

class ResumeProcessRequest(BaseModel):
    resume_id: int
    # resume_url: str