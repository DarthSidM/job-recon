from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field, HttpUrl, ConfigDict


class Job(BaseModel):
    model_config = ConfigDict(
        extra="ignore",          
        validate_assignment=True,
        str_strip_whitespace=True,
    )

    source: str            # "lever"
    source_job_id: str     # "123456"
    source_url: str
    company: str
    apply_url: str
    is_active: bool = True

    title: str

    location: str

    employment_type: Optional[str] = None

    first_seen_at: Optional[datetime] = None
    missing_count: int = 0

    # Compensation
    salary_min: Optional[int] = None
    salary_max: Optional[int] = None

    # Extracted by your NLP pipeline
    skills: list[str] = Field(default_factory=list)

    # Experience in years
    exp_min: Optional[float] = None
    exp_max: Optional[float] = None

    # Complete normalized job description
    job_description: str