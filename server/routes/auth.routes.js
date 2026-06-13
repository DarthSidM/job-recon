import { login } from "../controllers/user/auth/login.controller.js";
import { signup } from "../controllers/user/auth/signup.controller.js";
import express from "express";

const router = express.Router();



router.post("/signup", signup);

router.post("/login", login);

export default router;