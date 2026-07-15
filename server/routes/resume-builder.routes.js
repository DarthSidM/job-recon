import { Router } from 'express';
import authenticationMiddleware from '../middlewares/auth.middleware.js';
import { buildResume } from '../controllers/resume-builder/builder.controller.js';

const router = Router();

router.post('/build-resume',authenticationMiddleware, buildResume);

export default router;