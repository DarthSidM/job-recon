from app.core.celery_app import celery_app


@celery_app.task
def process_resume_task(resume_id: str, resume_url: str):
    print(
        f"Processing Resume: {resume_id} URL: {resume_url}"
    )

    return {
        "status": "completed",
        "resume_id": resume_id
    }