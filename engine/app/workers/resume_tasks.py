import asyncio
from app.core.celery_app import celery_app
from app.services.resume.get_resume import resume_getter
from app.services.resume.download_resume import resume_downloader
from app.services.resume.extract_text_resume import text_extracter
from app.services.resume.parse_resume_text import parse_text

@celery_app.task
def process_resume_task(resume_id: int):

    # get resume from database
    resume = asyncio.run(resume_getter(resume_id))
    resume_url = resume.storage_url

    if not resume:
        raise Exception(f"Resume {resume_id} not found")

    # download resume pdf into media dir and get it's pdf path
    pdf_path = resume_downloader(resume_url, resume_id)

    # extracted text from pdf
    text_in_pages = text_extracter(pdf_path)

    resume_text = "\n".join(
        page.decode("utf-8", errors="ignore")
        if isinstance(page, bytes)
        else str(page)
        for page in text_in_pages
    )
        
    llm_text = parse_text(resume_text)
    print("the output of llm is: ", llm_text)

