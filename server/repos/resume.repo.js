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

export async function getActiveResume(userId){
    return await prisma.resume.findFirst({
        where:{
            user_id: userId, 
            status: true
        }
    });
}

export async function setActiveResume(userId, resumeId) {
  return prisma.$transaction(async (tx) => {
    const resume = await tx.resume.findFirst({
      where: {
        id: resumeId,
        user_id: userId,
      },
    });

    if (!resume) {
      throw new Error("Resume not found");
    }

    await tx.resume.updateMany({
      where: {
        user_id: userId,
      },
      data: {
        status: false,
      },
    });

    return tx.resume.update({
      where: {
        id: resumeId,
      },
      data: {
        status: true,
      },
    });
  });
}