from app.core.celery_app import celery_app
# from app.services.resume.get_resume import resume_getter
from app.services.resume.download_resume import resume_downloader
from app.services.resume.extract_text_resume import text_extracter
from app.services.resume.parse_resume_text import parse_text
from app.services.resume.parsed_text_cleanup import strip_thought_tags, normalize_json
from app.services.resume.save_llm_text import save_resume
from app.services.resume.check_raw_text import is_raw_available
from app.services.resume.json_to_text import experience_to_text, projects_to_text, skills_to_text
from app.services.resume.text_to_embeddings import experience_to_embedding, projects_to_embedding, skills_to_embedding
from app.services.resume.resume_status import update_status

@celery_app.task
def process_resume_task(resume_id: int, resume_url: str):

    if(is_raw_available(resume_id)):
        print(f"Resume {resume_id} already processed. Skipping.")
        return
    

    update_status(
        resume_id,
        "processing",
        "downloading_resume",
        5,
        "Downloading resume"
    )
    pdf_path = resume_downloader(resume_url, resume_id)
    print("resume downloaded")
    # extracted text from pdf

    update_status(
        resume_id,
        "processing",
        "extracting_text",
        20,
        "Extracting text"
    )
    text_in_pages = text_extracter(pdf_path)

    print("text extracted")
    resume_text = "\n".join(
        page.decode("utf-8", errors="ignore")
        if isinstance(page, bytes)
        else str(page)
        for page in text_in_pages
    )

    print("sending text to llm...")

    update_status(
        resume_id,
        "processing",
        "parsing_resume",
        45,
        "Parsing resume with AI"
    )
    llm_text = parse_text(resume_text)
    cleaned_llm_text = strip_thought_tags(llm_text)
    print("the output of llm is: ", cleaned_llm_text)

    print("the output of json conversion")
    data = normalize_json(cleaned_llm_text)
    print(data["resume_profile"]["full_name"])


    print("saving raw to db")
    update_status(
        resume_id,
        "processing",
        "saving_resume",
        70,
        "Saving parsed data"
    )
    save_resume(resume_id, data)
    print("data saved")


    update_status(
        resume_id,
        "processing",
        "generating_embeddings",
        85,
        "Generating embeddings"
    )
    experience_text = experience_to_text(data)
    if experience_text:
        # Generate experience embedding
        experience_to_embedding(experience_text, resume_id)

    projects_text = projects_to_text(data)
    if projects_text:
        # Generate project embedding
        projects_to_embedding(projects_text, resume_id)

    skills_text = skills_to_text(data)
    if skills_text:
        # Generate skills embedding
        skills_to_embedding(skills_text, resume_id)

    update_status(
        resume_id,
        "completed",
        "completed",
        100,
        "Resume processed successfully"
    )