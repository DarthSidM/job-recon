import { createResume, getResumeById, getAllResumes } from "../../repos/resume.repo.js";
import { uploadPDF,deletePDF } from "../../lib/cloud.js";

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
