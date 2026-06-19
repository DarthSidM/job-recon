import { prisma } from "../lib/db.js";

export async function createResume(resumeData) {
    return await prisma.resume.create({
        data: resumeData
    });
}

export async function getResumeById(id, userId) {
    return await prisma.resume.findUnique({
        where: {
            id,
            user_id: userId
        }
    });
}

export async function getAllResumes(userId) {
    return await prisma.resume.findMany({
        where: {
            user_id: userId
        }
    });
}

export async function updateResumeById(id, resumeData) {
    return await prisma.resume.update({
        where:{
            id
        },
        data: resumeData
    });
}