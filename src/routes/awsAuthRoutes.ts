import { Router } from "express";
import { signInAWS, signUpAWS } from "../controllers/awsAuthController";

const router = Router();

// Signup route
router.post("/signup", signUpAWS);

// Signin route
router.post("/signin", signInAWS);

export default router;
