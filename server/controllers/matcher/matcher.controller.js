import { getActiveResume } from "../../repos/resume.repo.js";  
import redis from "../../lib/redis.js"
import axios from "axios"
import dotenv from "dotenv"
dotenv.config();

const CACHE_TTL=60*60;
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
        const cacheKey = `matched_jobs:${resume.id}`;
        //cache hit
        const cachedJobs = await redis.get(cacheKey);
        if (cachedJobs) {
            return res.status(200).json({
                status: "success",
                message: "jobs (cached)",
                jobData: JSON.parse(cachedJobs),
            });
        }
        //cache miss
        const { data } = await axios.get(
            `${process.env.ENGINE_URL}/matcher/${resume.id}`
        );
        //get data then store in redis for 1 hr
        await redis.set(cacheKey, JSON.stringify(data), {
            EX: CACHE_TTL,
        });

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