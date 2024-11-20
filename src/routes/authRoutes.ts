import { Router } from "express";
import { signIn, signUp } from "../controllers/authController";

const router = Router();

// Signup route
router.post("/signUp", signUp);

// Signin route
router.post("/signIn", signIn);

export default router;
