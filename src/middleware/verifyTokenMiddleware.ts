import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { JWT_KEY } from "../constant";

// Function to verify the token
const verifyToken = (token: string): jwt.JwtPayload | null => {
  try {
    return jwt.verify(token, JWT_KEY) as jwt.JwtPayload;
  } catch (error) {
    return null;
  }
};

// Common Token Verification Middleware
export const verifyTokenMiddleware: any = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from "Bearer <token>"

  // If no token is provided
  if (!token) {
    return res.status(401).json({ error: "Token is required" });
  }

  // Verify the token using the verifyToken function
  if (verifyToken(token)) {
    next(); // Token is valid, proceed to the next middleware or route handler
  } else {
    return res.status(401).json({ error: "Token is not valid" });
  }
};
