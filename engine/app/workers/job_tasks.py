from app.core.celery_app import celery_app
from app.harvester.manager import process_job_csv

csv_path = "/home/siddharth/programming/projects/job-recon/engine/app/data/test.csv"

@celery_app.task(name="app.workers.job_tasks.process_jobs_task")
def process_jobs_task():
    process_job_csv(csv_path=csv_path)