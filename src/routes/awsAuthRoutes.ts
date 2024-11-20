import { Router } from "express";
import { forgotPasswordAWS, signInAWS, signUpAWS, verifyUserEmailAWS } from "../controllers/awsAuthController";

const router = Router();

// Signup route
router.post("/signUp", signUpAWS);

// Signup route
router.post("/verifyUserEmail", verifyUserEmailAWS);

// Signin route
router.post("/signIn", signInAWS);
// Signin route
router.post("/forgotPassword", forgotPasswordAWS);

export default router;
