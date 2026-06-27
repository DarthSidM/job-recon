def experience_to_text(cleaned_resume: dict) -> str:
    experiences = cleaned_resume.get("resume_experience", [])

    sections = []

    for exp in experiences:
        title = (exp.get("title") or "").strip()
        description = (exp.get("description") or "").strip()

        if not title and not description:
            continue

        section = "\n".join(
            part for part in [title, "", description] if part is not None
        ).strip()

        sections.append(section)

    return "\n\n---\n\n".join(sections)

def projects_to_text(cleaned_resume: dict) -> str:
    projects = cleaned_resume.get("resume_projects", [])

    sections = []

    for project in projects:
        name = (project.get("project_name") or "").strip()
        description = (project.get("description") or "").strip()

        if not name and not description:
            continue

        section = "\n".join(
            part for part in [name, "", description] if part
        )

        sections.append(section)

    return "\n\n---\n\n".join(sections)

def skills_to_text(cleaned_resume: dict) -> str:
    skills = (
        cleaned_resume.get("resume_skills", {})
        .get("skill_names", [])
    )

    skills = [skill.strip() for skill in skills if skill.strip()]

    return ", ".join(skills)