import { NextFunction, Request, Response } from "express";
import "dotenv/config";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "@prisma/client";

interface UserRequest extends Request {
  user?: User;
}
export const authMiddleware = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.get("authorization");

    if (!authHeader) {
      return res.status(401).json({
        error: "No authorization header found",
      });
    }

    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        error: "No token provided",
      });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET ?? "", (err, decoded) => {
      if (err) {
        return res.status(403).json({
          error: "Invalid or expired token",
        });
      }

      const payload = decoded as JwtPayload;

      req.user = req.user || ({} as User);
      req.user.id = payload.id as string;
      req.user.name = payload.name as string;
      req.user.email = payload.email as string;
      req.user.role_id = payload.role_id as string;
      next();
    });
  } catch (error) {
    return res.status(500).json({
      error: "Authentication error",
    });
  }
};
