import { getActiveResume } from "../../repos/resume.repo.js";  
import axios from "axios"
import dotenv from "dotenv"
dotenv.config();


export async function getMatchedJobsController(req, res){
    const { id } = req.user;
    try{
        const resume = await getActiveResume(id);
        if (!resume) {
            return res.status(404).json({
                status: "failed",
                message: "No active resume found",
            });
        }
        const { data } = await axios.get(
            `${process.env.ENGINE_URL}/matcher/${resume.id}`
        );

        return res.status(200).json({
            status: "success",
            message: "jobs",
            jobData: data,
        });
    }
    catch(error){
        console.log("error occurred while fetching jobs", error);
        return res.status(500).json({ status: "failed", message: "failure" })
    }
    
}