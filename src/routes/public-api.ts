import express from "express";
import { Login, Register } from "../controller/user-controller";
import { refreshToken } from "../controller/refresh-token";
import { createRole } from "../controller/role-controller";
import {
  createMidtransPayment,
  handleMidtransWebhook,
} from "../controller/midtrans-controller";

export const publicRouter = express.Router();

// User API
publicRouter.get("/api/token", refreshToken);
publicRouter.post("/api/users", Register);
publicRouter.post("/api/login", Login);

// Role API
publicRouter.post("/api/roles", createRole);
publicRouter.post("/api/midpayment", createMidtransPayment);
publicRouter.post("/api/payments/webhook", handleMidtransWebhook);
