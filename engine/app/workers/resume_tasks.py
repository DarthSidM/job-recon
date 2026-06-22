import asyncio
from app.core.celery_app import celery_app
from app.services.resume.get_resume import resume_getter
from app.services.resume.download_resume import resume_downloader

@celery_app.task
def process_resume_task(resume_id: int):
    resume = asyncio.run(resume_getter(resume_id))
    resume_url = resume.storage_url
    # pdf_path = resume_downloader(resume_url=resume_url, resume_id=resume_id)
    
    # print(pdf_path)
    if not resume:
        raise Exception(f"Resume {resume_id} not found")
    print(resume_url)

