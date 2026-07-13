import { createResume, getResumeById, getAllResumes, setActiveResume, getActiveResume, deleteResumeById } from "../../repos/resume.repo.js";
import { uploadPDF, deletePDF } from "../../lib/cloud.js";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();


export async function createResumeController(req, res) {
    const { id } = req.user;
    const name = req.body?.name;
    const pdf = req.file;
    // console.log(id);
    console.log(name);
    console.log(pdf);
    
    if(!id || !name || !pdf){
        return res.status(400).json({
            message: "user id, name of resume and resume file should be added"
        });
    }
    let result;
    try{
        result = await uploadPDF(pdf.buffer, name);
    }catch(uploadError){
        console.error("error uploading resume file: ", uploadError);
        return res.status(500).json({
            status:"failed",
            message:"error uploading resume file"
        });
    }

    try{
        const resume = await createResume({
            name, 
            storage_url: result.url,
            user_id: id
        });
        //add process resume controller calling here
        axios.post(`${process.env.ENGINE_URL}/api/v2/process-resume/`,{
            "resume_id":resume.id
        });
        console.log(`resume created for user with id ${id}`);
        return res.status(201).json({
            status:"success",
            message: "Resume created",
            resumeId: resume.id
        });
    }catch(err){
        console.error(err);
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
}

export async function getResumeController(req, res){
    try{
        const { id } = req.user;
        const resumeId = Number(req.params.resumeId);
        
        const resume = await getResumeById(resumeId, id);
        return res.status(200).json({
            status: "success",
            resumeData: resume
        });
    }
    catch(error){
        console.error("error occured getting resume", error);
        return res.status(500).json({
            status: "failed",
            message:"failure"
        });
    }
}

// Get all resumes for a user

 export async function getAllResumesController(req, res) {
     try {
         const { id } = req.user;
         const allResumes = await getAllResumes(id);
         return res.status(200).json({ status: "success", resumeData: allResumes });
     } catch(error) {
         console.error("error occured getting all resumes", error);
         return res.status(500).json({ status: "failed", message: "failure" });
     }
}

export async function setResumeActiveController(req, res){
    const { id } = req.user;
    const { resume_id } = req.body;
    try{
        const resume = await setActiveResume(id, resume_id);
        return res.status(200).json({
            message : "resume set active",
            status : "success",
            resumeId: resume_id
        });
    }
    catch(error){
        console.log("error occurred setting resume as active", error);
        return res.status(500).json({ status: "failed", message: "failure" })
    }
}
export async function getActiveResumeController(req, res){
    const { id } = req.user;
    try{
        const resume = await getActiveResume(id);
        return res.status(200).json({
            message: "active resume",
            status: "success",
            resumeId: resume.id,
            resumeName: resume.name
        });
    }
    catch(error){
        console.log("error occurred while getting active resume", error);
        return res.status(500).json({ status: "failed", message: "failure" })
    }
}
export async function deleteResumeController(req, res) {
    try {
        const { id: userId } = req.user;
        const resumeId = Number(req.params.resumeId);

        if (!resumeId) {
            return res.status(400).json({
                status: 'failed',
                message: 'valid userId and resumeId are required',
            });
        }

        const resume = await getResumeById(resumeId, userId);

        if (!resume) {
            return res.status(404).json({
                status: 'failed',
                message: 'resume not found',
            });
        }

        await deletePDF(resume.storage_url);
        await deleteResumeById(resumeId, userId);

        return res.status(200).json({
            status: 'success',
            message: 'resume deleted successfully',
            resumeId,
        });
    } catch (error) {
        console.error('error occurred deleting resume', error);
        return res.status(500).json({
            status: 'failed',
            message: 'failure',
        });
    }
}