from typing import List, Dict, Any
import requests
import json
from playwright.sync_api import sync_playwright
from app.harvester.base_harvester import BaseHarvester
from app.services.harvester.parsed_text_cleanup import strip_thought_tags
from app.schemas.jobs import Job


class LeverHarvester(BaseHarvester):
    source = "lever"

    def __init__(self, company: str, playwright_reqd: bool = False):
        super().__init__()

        self.company = company
        self.playwright_reqd = playwright_reqd
        self.jobs = None
    
    def harvest(self) -> None:
    
        self.jobs = self.fetch_jobs()

        if not self.jobs:
            return
        self.print_jobs()
        print("__________________ llm output coming __________________")
        for job in self.jobs:
            llm_res = self.extract_details(job)
            cleaned_llm_res = strip_thought_tags(llm_res)
            data = json.dumps(cleaned_llm_res)
            job["skills"] = data.get("skills", [])
            job["salary_min"] = data.get("salary_min", None)
            job["salary_max"] = data.get("salary_max", None)
            
        # await self.repository.upsert_jobs(
        #     source=self.source,
        #     company=self.company,
        #     jobs=jobs
        # )

    def fetch_jobs(self) -> List[Dict[str, Any]]:
        lever_url = f"https://api.lever.co/v0/postings/{self.company}?mode=json"
        
        try:
            response = requests.get(lever_url)
            response.raise_for_status()  # Raises an error for bad status codes (4xx, 5xx)
            
            postings = response.json()
            harvested_jobs = []
            
            for post in postings:
                jd = ""
                if self.playwright_reqd:
                    jd = self.launch_playwright(post["hostedUrl"])
                else:
                    jd = post.get("descriptionBodyPlain", "")

                job_data = {
                    "source":self.source,
                    "source_job_id": post.get("id"),
                    "source_url": post.get("hostedUrl"),
                    "company": self.company,
                    "apply_url":post.get("applyUrl"),
                    "title": post.get("text",""),
                    "location": post.get("categories", {}).get("location",""),
                    "first_seen_at": str(self.now()),
                    "job_description": jd
                }
                if(job_data["job_description"] == ""):
                    continue

                harvested_jobs.append(job_data)
                
            return harvested_jobs

        except requests.RequestException as e:
            print(f"Error fetching jobs from Lever for {self.company}: {e}")
            return []

    def normalize(self):
        pass

    def launch_playwright(self, hostedUrl):
        url = hostedUrl
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            page = browser.new_page()
            page.goto(url)
            jd = page.locator("body").inner_text()
            browser.close()
            return jd
        
    def print_jobs(self):
        pretty_json = json.dumps(self.jobs, indent=4, ensure_ascii=False)
        print(pretty_json)