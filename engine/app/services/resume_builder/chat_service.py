from openai import OpenAI
from app.core.config import LLM_API_KEY, LLM_BASE_URL, LLM_MODEL

class ChatLLM:
    def __init__(self):
        self.client = OpenAI(
            base_url=LLM_BASE_URL,
            api_key=LLM_API_KEY
        )

    def chat(
        self,
        history: list[dict],
        jd: str,
        experience: str | None,
        skills: str | None,
        projects: str | None,
        message: str,
    ) -> str:

        system_prompt = f"""
You are an expert ATS resume optimization assistant.

You are given:

Job Description
----------------
{jd}

Candidate Experience
----------------
{experience or ""}

Candidate Skills
----------------
{skills or ""}

Candidate Projects
----------------
{projects or ""}

Rules:

- Never invent experience.
- Never fabricate projects.
- Never fabricate skills.
- Suggest improvements only.
- Help maximize ATS score.
- Point out missing skills.
- Suggest keyword improvements.
- Keep responses conversational.
"""

        messages = [
            {
                "role": "system",
                "content": system_prompt,
            }
        ]

        messages.extend(history)

        messages.append(
            {
                "role": "user",
                "content": message,
            }
        )

        response = self.client.chat.completions.create(
            model=LLM_MODEL,
            messages=messages,
            temperature=0.3,
        )

        return response.choices[0].message.content