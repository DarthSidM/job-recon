from abc import ABC, abstractmethod
from typing import List, Dict, Any
from app.schemas.jobs import Job
from app.harvester.repository import JobRepository
from datetime import datetime
from openai import OpenAI
from app.core.config import LLM_API_KEY, LLM_BASE_URL, LLM_MODEL

class BaseHarvester(ABC):
    source:str = ""
    playwright_reqd:bool = False
    repository: JobRepository = None

    def __init__(self):
        self.repository = JobRepository()

    def harvest(self) -> None:
        pass

    @abstractmethod
    def fetch_jobs(self) -> List[Job]:
        raise NotImplementedError
    
    def normalize(self, job: Dict[str, Any]) -> Job:
        """
        Converts a raw harvested job dict into a validated Job object.
        Also cleans common LLM inconsistencies.
        """

        def to_int(value):
            if value in (None, "", "null"):
                return None
            try:
                return int(float(value))
            except (TypeError, ValueError):
                return None

        def to_float(value):
            if value in (None, "", "null"):
                return None
            try:
                return float(value)
            except (TypeError, ValueError):
                return None

        def clean_skills(skills):
            if not skills:
                return []

            if isinstance(skills, str):
                skills = [s.strip() for s in skills.split(",")]

            cleaned = []
            seen = set()

            for skill in skills:
                if not skill:
                    continue

                skill = str(skill).strip()

                if not skill:
                    continue

                key = skill.lower()
                if key not in seen:
                    seen.add(key)
                    cleaned.append(skill)

            return cleaned

        first_seen = job.get("first_seen_at")
        if isinstance(first_seen, str):
            try:
                first_seen = datetime.fromisoformat(first_seen)
            except ValueError:
                first_seen = None

        return Job(
            source=job["source"],
            source_job_id=str(job["source_job_id"]),
            source_url=job["source_url"],
            company=job["company"],
            apply_url=job["apply_url"],
            is_active=job.get("is_active", True),

            title=job["title"],
            location=job["location"],
            employment_type=job.get("employment_type"),

            first_seen_at=first_seen,
            missing_count=job.get("missing_count", 0),

            salary_min=to_int(job.get("salary_min")),
            salary_max=to_int(job.get("salary_max")),

            skills=clean_skills(job.get("skills")),

            exp_min=to_float(job.get("exp_min")),

            job_description=job["job_description"],
        )

    def now(self):
        return datetime.now()

    @abstractmethod
    def launch_playwright(self):
        pass

    def extract_details(self, job: Dict[str, Any]):
        client = OpenAI(
            base_url=LLM_BASE_URL,
            api_key=LLM_API_KEY
        )
        model_name = LLM_MODEL
        
        # 1. Grab the description and title out of the passed job dictionary
        job_title = job.get("title", "Unknown Title")
        job_text = job.get("job_description", "")
        
        # 2. Feed it into the prompt. Notice the double {{ }} for JSON syntax structure.
        prompt = f"""
        You are an expert data extraction assistant. Analyze the following job posting.
        
        Job Title: {job_title}
        Job Description:
        \"\"\"
        {job_text}
        \"\"\"
        
        Tasks:
        Find the key technical skills in one or two words max required and the salary range offered.
        
        Return the extracted data strictly in the following JSON format:
        {{
            "skills": ["skill_1", "skill_2"],
            "salary_min": "minimum value or null",
            "salary_max": "maximum value or null",
            "exp_min": "minimum number of years of experience required or 0",
        }}
        
        If any value is missing or not understandable, put it as null. Do not return any conversational text, just the raw JSON block.
        """
        
        try:
            response = client.chat.completions.create(
                model=model_name,
                messages=[
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                extra_headers={
                    "HTTP-Referer": "https://localhost:3000",
                    "X-Title": "Engine App",
                }
            )
            return response.choices[0].message.content

        except Exception as e:
            return f"Error interacting with the LLM ({model_name}): {str(e)}"