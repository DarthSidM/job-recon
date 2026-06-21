import time

from app.core.celery_app import celery_app


@celery_app.task
def process_resume_task(
    resume_id: int,
    resume_url: str
):
    print(
        f"Starting resume {resume_id}"
    )

    time.sleep(10)

    print(
        f"Resume URL: {resume_url}"
    )

    return {
        "status": "completed"
    }