import axios from "axios";
import {
    getExperience,
    getProjects,
    getSkills,
} from "../../repos/resume_elements.repo.js";

const ENGINE_API_URL = process.env.ENGINE_URL || "http://localhost:8000";

export const buildResume = async (req, res) => {
    const { active_resume_id, message, jd, session_id } = req.body;

    try {
        const [experienceData, projectData, skillData] = await Promise.all([
            getExperience(active_resume_id),
            getProjects(active_resume_id),
            getSkills(active_resume_id),
        ]);

        const experience = experienceData
            .map(
                (exp) =>
                    `Company: ${exp.company}\nDescription: ${exp.description}`
            )
            .join("\n\n");

        const projects = projectData
            .map(
                (project) =>
                    `Project: ${project.project_name}\nDescription: ${project.description}`
            )
            .join("\n\n");

        const skills = skillData
            .flatMap((skill) => skill.skill_names)
            .join(", ");

        const response = await axios.post(
            `${ENGINE_API_URL}/build-resume/`,
            {
                message,
                jd,
                experience,
                skills,
                projects,
                session_id,
            }
        );

        return res.status(response.status).json(response.data);
    } catch (error) {
        console.error(
            "Error forwarding request to engine API:",
            error.response?.data || error.message
        );

        return res
            .status(error.response?.status || 500)
            .json({ error: "Failed to build resume" });
    }
};