from typing import List, Dict, Any
import requests
import json
from playwright.sync_api import sync_playwright
from app.harvester.base_harvester import BaseHarvester
from app.services.harvester.parsed_text_cleanup import strip_thought_tags, normalize_json


class LeverHarvester(BaseHarvester):
    source = "lever"

    def __init__(self, company: str, playwright_reqd: bool = False):
        super().__init__()

        self.company = company
        self.playwright_reqd = playwright_reqd
        self.jobs = None
    
    def harvest(self) -> None:
        print(f"[lever.harvest] start company={self.company} playwright_reqd={self.playwright_reqd}")

        self.jobs = self.fetch_jobs()

        print(f"[lever.harvest] fetched_jobs={len(self.jobs) if self.jobs else 0}")

        if not self.jobs:
            print(f"[lever.harvest] no jobs fetched for company={self.company}")
            return

        BATCH_SIZE = 10
        normalized_jobs = []

        total_jobs = len(self.jobs)

        for batch_start in range(0, total_jobs, BATCH_SIZE):
            batch = self.jobs[batch_start: batch_start + BATCH_SIZE]

            batch_no = batch_start // BATCH_SIZE + 1
            total_batches = (total_jobs + BATCH_SIZE - 1) // BATCH_SIZE

            print(
                f"[lever.harvest] processing batch "
                f"{batch_no}/{total_batches} "
                f"({len(batch)} jobs)"
            )

            for job in batch:
                source_job_id = job.get("source_job_id")

                try:
                    print(
                        f"[lever.harvest] extracting details "
                        f"source_job_id={source_job_id}"
                    )

                    llm_res = self.extract_details(job)
                    cleaned_llm_res = strip_thought_tags(llm_res)
                    data = normalize_json(cleaned_llm_res)

                    job["skills"] = data.get("skills", [])
                    job["salary_min"] = data.get("salary_min")
                    job["salary_max"] = data.get("salary_max")
                    job["exp_min"] = data.get("exp_min", 0)

                    normalized_jobs.append(self.normalize(job=job))

                except Exception as e:
                    print(
                        f"[lever.harvest] skipping malformed job "
                        f"source_job_id={source_job_id}"
                    )
                    print(f"[lever.harvest] error={e}")

                    if 'cleaned_llm_res' in locals():
                        print("=" * 80)
                        print(cleaned_llm_res)
                        print("=" * 80)

                    continue

            print(
                f"[lever.harvest] completed batch "
                f"{batch_no}/{total_batches}"
            )

        self.jobs = normalized_jobs

        print(
            f"[lever.harvest] normalized_jobs="
            f"{len(self.jobs)}/{total_jobs}"
        )

        self.print_normalized_jobs()

        print(
            f"[lever.harvest] syncing jobs "
            f"source={self.source} company={self.company}"
        )

        self.repository.sync_jobs(
            self.source,
            self.company,
            self.jobs,
        )

        print(
            f"[lever.harvest] sync complete "
            f"source={self.source} company={self.company}"
        )

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

    def launch_playwright(self, hostedUrl):
        url = hostedUrl
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            page = browser.new_page()
            page.goto(url)
            jd = page.locator("body").inner_text()
            browser.close()
            return jd
        
    def print_jobs(self): ###### only use during debugging
        pretty_json = json.dumps(self.jobs, indent=4, ensure_ascii=False)
        print(pretty_json)

    def print_normalized_jobs(self): ###### only use during debugging
        """Only use during debugging."""
        print(
            json.dumps(
                [job.model_dump(mode="json") for job in self.jobs],
                indent=4,
                ensure_ascii=False,
            )
        )

