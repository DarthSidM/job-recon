from openai import OpenAI
from app.core.config import LLM_API_KEY, LLM_BASE_URL, LLM_MODEL

client = OpenAI(
    base_url=LLM_BASE_URL,
    api_key=LLM_API_KEY
)

def parse_text(resume_text: str):
    model_name = LLM_MODEL
    prompt = prompt = f"""
You are a resume information extraction engine.

Your task is to extract structured information from the resume and return ONLY a single valid JSON object.

=========================
STRICT RULES
=========================

1. Return ONLY valid JSON.
2. Do NOT output markdown.
3. Do NOT wrap the output inside ```json.
4. Do NOT output explanations.
5. Do NOT output reasoning or thinking.
6. Do NOT invent information.
7. If a value is missing, use null.
8. Do NOT create any keys not defined in the schema.
9. Preserve the exact key names shown below.
10. Every array must contain only objects matching the schema.

=========================
DATE RULES
=========================

Every date MUST be either:

- YYYY-MM-DD
OR
- null

NEVER output:

- "Present"
- "Current"
- "Ongoing"
- "Till Date"
- "Now"
- "Currently"

For ongoing education or experience:

"end_date": null

If only the month and year are known:

Example:
Jun 2025

Convert to

start_date = "2025-06-01"

If only the year is known:

Example:
2023

Convert to

start_date = "2023-01-01"

Use reasonable defaults when the exact day is unknown.

=========================
SECTION MAPPING
=========================

Everything under:

- Experience
- Work Experience
- Employment
- Internship
- Internships
- Research Internship
- Research Experience
- Leadership
- Positions of Responsibility
- Volunteer Experience
- Teaching Experience
- Part-Time Work

MUST go into:

resume_experience

Everything under:

- Projects
- Academic Projects
- Personal Projects
- Research Projects

MUST go into:

resume_projects

All skills from every section MUST be combined into one flat list:

resume_skills.skill_names

=========================
OUTPUT SCHEMA
=========================

{{
  "resume_profile": {{
    "full_name": "",
    "email": "",
    "phone": "",
    "summary": null
  }},

  "resume_education": [
    {{
      "institution": "",
      "degree": "",
      "start_date": null,
      "end_date": null
    }}
  ],

  "resume_experience": [
    {{
      "company": "",
      "title": "",
      "start_date": null,
      "end_date": null,
      "description": ""
    }}
  ],

  "resume_projects": [
    {{
      "project_name": "",
      "description": ""
    }}
  ],

  "resume_skills": {{
    "skill_names": []
  }}
}}

=========================
VALIDATION
=========================

Before producing the output, verify that:

- The output is valid JSON.
- json.loads() should parse it successfully.
- There are no trailing commas.
- There are no markdown fences.
- There are no comments.
- There are no extra keys.
- Every start_date and end_date is either:
  - YYYY-MM-DD
  - null
- Missing values are null, not empty strings or words like "Present".
- Output exactly one JSON object.

Resume:

{resume_text}

Return ONLY the JSON object.
"""
    try:
        response = client.chat.completions.create(
            model=model_name,
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            # stream=True,
            # OpenRouter ignores these if you're using Ollama, so they are safe to keep
            extra_headers={
                "HTTP-Referer": "https://localhost:3000",
                "X-Title": "Engine App",
            }
        )
        return response.choices[0].message.content

    except Exception as e:
        return f"Error interacting with the LLM ({model_name}): {str(e)}"
    


