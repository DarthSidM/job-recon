import { getMatchedJobsController } from "../controllers/matcher/matcher.controller.js";
import authenticationMiddleware from "../middlewares/auth.middleware.js";
import express from "express";

const router = express.Router();

router.get("", authenticationMiddleware, getMatchedJobsController);
export default router;