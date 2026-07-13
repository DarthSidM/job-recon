import { createResumeController, getResumeController, getAllResumesController, setResumeActiveController } from "../controllers/resume/resume.controller.js";  
import express from "express";
import authenticationMiddleware from "../middlewares/auth.middleware.js"; 
import multer from "multer";

const storage = multer.memoryStorage();

export const upload = multer({
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024
    }
});

const router = express.Router();

router.post("/upload", authenticationMiddleware, upload.single("pdf"), createResumeController);
router.get("/get/:resumeId", authenticationMiddleware, getResumeController);
router.get("/get", authenticationMiddleware, getAllResumesController);
router.post("/set-active", authenticationMiddleware, setResumeActiveController);
export default router;