import { Request, Response } from "express";
import { signupUser, signinUser } from "../services/cognitoService";

// Signup Controller
export const signUpAWS: any = async (req: Request, res: Response) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).send("Username, password, and email are required");
  }

  try {
    const result = await signupUser(username, password, email);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

// Signin Controller
export const signInAWS: any = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Username and password are required");
  }

  try {
    const result = await signinUser(username, password);
    res.status(200).json({
      message: "Signin successful",
      tokens: result,
    });
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};
