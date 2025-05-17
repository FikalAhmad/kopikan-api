import express from "express";
import { Login, Register } from "../controller/user-controller";
import { refreshToken } from "../controller/refresh-token";
import { createRole } from "../controller/role-controller";

export const publicRouter = express.Router();

// User API
publicRouter.get("/api/token", refreshToken);
publicRouter.post("/api/users", Register);
publicRouter.post("/api/login", Login);

// Role API
publicRouter.post("/api/roles", createRole);
