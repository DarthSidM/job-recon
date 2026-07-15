import { prisma } from "../lib/db.js";

export async function getExperience(resumeId) {
    return await prisma.resumeExperience.findMany({
        where: {
            resume_id: resumeId,
        },
        select: {
            company: true,
            description: true,
        },
    });
}

export async function getProjects(resumeId) {
    return await prisma.resumeProject.findMany({
        where: {
            resume_id: resumeId,
        },
        select: {
            project_name: true,
            description: true,
        },
    });
}

export async function getSkills(resumeId) {
    return await prisma.resumeSkills.findMany({
        where: {
            resume_id: resumeId,
        },
        select: {
            skill_names: true,
        },
    });
}