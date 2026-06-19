from pydantic import BaseModel

class ResumeProcessRequest(BaseModel):
    resume_id: str
    resume_url: str