from fastapi import APIRouter

from app.schemas.resume_builder import BuildResumeRequest
from app.services.resume_builder.chat_service import ChatLLM
from app.services.resume_builder.memory_service import MemoryLLM

router = APIRouter()


@router.post("/build-resume")
async def build_resume(req: BuildResumeRequest):

    memory = MemoryLLM()

    if req.session_id is None:
        session_id = memory.create_session()
    else:
        memory.load_session(req.session_id)
        session_id = req.session_id

    history = memory.get_history()

    chat = ChatLLM()

    reply = chat.chat(
        history=history,
        jd=req.jd,
        experience=req.experience,
        skills=req.skills,
        projects=req.projects,
        message=req.message,
    )

    memory.save_history(req.message, "user")
    memory.save_history(reply, "assistant")

    return {
        "session_id": session_id,
        "response": reply,
    }