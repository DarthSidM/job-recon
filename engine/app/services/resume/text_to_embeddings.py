from app.core.database_sync import SessionLocal
from app.models.resume_embedding import ResumeEmbedding
from app.services.resume.embedding_generator import generate_embedding
from app.core.config import EMBEDDING_MODEL

def experience_to_embedding(experience_text: str, resume_id: int):
    with SessionLocal() as db:
        print("generating embeddings for experience")
        result = generate_embedding(experience_text)
        db.add(
            ResumeEmbedding(
                embedding_type="experience",
                embedding = result,
                model_name = EMBEDDING_MODEL,
                resume_id = resume_id
            )
        )
        db.commit()

def projects_to_embedding(projects_text: str, resume_id: int):
    with SessionLocal() as db:
        print("generating embeddings for projects")
        result = generate_embedding(projects_text)
        db.add(
            ResumeEmbedding(
                embedding_type="projects",
                embedding = result,
                model_name = EMBEDDING_MODEL,
                resume_id = resume_id
            )
        )
        db.commit()

def skills_to_embedding(skills_text: str, resume_id: int):
    with SessionLocal() as db:
        print("generating embeddings for skills")
        result = generate_embedding(skills_text)
        db.add(
            ResumeEmbedding(
                embedding_type="skills",
                embedding = result,
                model_name = EMBEDDING_MODEL,
                resume_id = resume_id
            )
        )
        db.commit()
