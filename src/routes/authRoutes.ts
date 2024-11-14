import { Router } from "express";
import { signIn, signUp } from "../controllers/authController";

const router = Router();

// Signup route
router.post("/signup", signUp);

// Signin route
router.post("/signin", signIn);

export default router;
