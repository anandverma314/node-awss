import { Request, Response } from "express";
import {
  signupUserService,
  signinUserService,
  confirmUserEmailService,
  forgotPasswordService,
} from "../services/cognitoService";

// Signup Controller
export const signUpAWS: any = async (req: Request, res: Response) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).send("Username, password, and email are required");
  }

  try {
    const result = await signupUserService(username, password, email);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

// Verify user email (confirm sign-up) controller
export const verifyUserEmailAWS: any = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { username, confirmationCode } = req.body;

  // Check if both username and confirmation code are provided
  if (!username || !confirmationCode) {
    return res
      .status(400)
      .json({ error: "Username and ConfirmationCode are required" });
  }

  try {
    // Call the service to confirm the user's email
    await confirmUserEmailService(username, confirmationCode);

    // Send a success response
    return res.status(200).json({
      message: "Email successfully confirmed. You can now log in.",
    });
  } catch (error: any) {
    // Log the error for debugging purposes (optional)
    console.error("Error confirming user email:", error);

    // Check if error is due to Cognito-specific issues
    if (error.code === "CodeMismatchException") {
      return res.status(400).json({ error: "Invalid confirmation code" });
    }

    if (error.code === "UserNotFoundException") {
      return res.status(404).json({ error: "User not found" });
    }

    // Handle any other unexpected errors
    return res
      .status(500)
      .json({
        error:
          "An error occurred while processing your request. Please try again later.",
      });
  }
};

// Signin Controller
export const signInAWS: any = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Username and password are required");
  }

  try {
    const result = await signinUserService(username, password);
    res.status(200).json({
      message: "Signin successful",
      tokens: result,
    });
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

// Forgot Password Controller
export const forgotPasswordAWS: any = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { username } = req.body;

  // Validate that username is provided
  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  try {
    await forgotPasswordService(username);
    return res.status(200).json({
      message:
        "Password reset confirmation email sent successfully. Please check your inbox.",
    });
  } catch (error: any) {
    console.error("Error during forgot password:", error);

    // Check if error is due to Cognito-specific issues and handle accordingly
    if (error.code === "UserNotFoundException") {
      return res.status(404).json({ error: "User not found" });
    }

    // Generic error handler
    return res.status(500).json({
      error:
        "An error occurred while processing your request. Please try again later.",
    });
  }
};
