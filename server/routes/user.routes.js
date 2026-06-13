import { getProfile } from "../controllers/user/profile.controller.js";   
import express from "express";
import authenticationMiddleware from "../middlewares/auth.middleware.js"; 

const router = express.Router();

router.get("/profile", authenticationMiddleware, getProfile);

export default router;

