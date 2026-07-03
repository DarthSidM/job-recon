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

    async def harvest(self) -> None:
        pass

    @abstractmethod
    async def fetch_jobs(self) -> List[Job]:
        raise NotImplementedError
    
    @abstractmethod
    def normalize(self): # llm jd clean up to extract stuff like skills, exp reqd, salary offered 
        pass

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
            "salary_max": "maximum value or null"
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