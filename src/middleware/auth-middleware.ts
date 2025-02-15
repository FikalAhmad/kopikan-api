import { NextFunction, Request, Response } from "express";
import "dotenv/config";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserRequest } from "../types/user-request";
import { User } from "@prisma/client";

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
      req.user.email = payload.email;
      next();
    });
  } catch (error) {
    return res.status(500).json({
      error: "Authentication error",
    });
  }
};
