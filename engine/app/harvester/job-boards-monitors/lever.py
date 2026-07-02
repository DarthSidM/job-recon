from typing import List

from app.harvester.base_harvester import BaseHarvester
from app.schemas.jobs import Job


class LeverHarvester(BaseHarvester):
    source = "lever"

    def __init__(self, company: str, playwright_reqd: bool = False):
        super().__init__()

        self.company = company
        self.playwright_reqd = playwright_reqd

    async def harvest(self) -> None:
        if self.playwright_reqd:
            await self.launch_playwright()

        jobs = await self.fetch_jobs()

        if not jobs:
            return

        jobs = self.normalize(jobs)

        # await self.repository.upsert_jobs(
        #     source=self.source,
        #     company=self.company,
        #     jobs=jobs
        # )

    async def fetch_jobs(self) -> List[Job]:
        # TODO: Fetch Lever jobs
        return []

    def normalize(self, jobs: List[Job]) -> List[Job]:
        return jobs

    async def launch_playwright(self):
        # TODO: Launch browser and perform any page interactions if needed.
        pass