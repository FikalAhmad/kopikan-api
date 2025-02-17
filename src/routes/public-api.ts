import express from "express";
import { Login, Register } from "../controller/user-controller";
import { refreshToken } from "../controller/refresh-token";

export const publicRouter = express.Router();
publicRouter.post("/api/users", Register);
publicRouter.post("/api/login", Login);
publicRouter.get("/api/token", refreshToken);
