from abc import ABC, abstractmethod
from typing import List
from app.schemas.jobs import Job
from app.harvester.repository import JobRepository

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
    
    def normalize(self): # llm jd clean up to extract stuff like skills, exp reqd, salary offered 
        pass

    def now(self):
        pass

    @abstractmethod
    def launch_playwright(self):
        pass


    