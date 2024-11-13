import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction, } from "express";

// The spread operator '...roles' allows passing multiple roles as arguments
export const verifyRoleMiddleware:any = (...roles: string[])  => {
  return (req: Request, res: Response, next: NextFunction): void | Response<any> => {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header

    if (!token) {
      return res.status(401).json({ error: "Missing or malformed token" });
    }

    try {
      // Decode the token
      const decoded = jwt.decode(token) as JwtPayload | null;

      // Check if decoded token is valid and contains a role
      if (decoded && typeof decoded !== "string" && "role" in decoded) {
        const userRole = decoded.role ?? null;

        if (!userRole) {
          return res.status(400).json({ error: "Role not found in the token" });
        }

        // Check if the user's role is allowed
        if (roles.includes(userRole)) {
          return next(); // Role is valid, proceed to the next middleware or route handler
        } else {
          return res.status(403).json({ error: "Access denied" });
        }
      } else {
        return res.status(401).json({ error: "Invalid token or missing role" });
      }
    } catch (error) {
      // Catch errors from JWT decoding process
      return res.status(401).json({ error: "Failed to decode token" });
    }
  };
};
