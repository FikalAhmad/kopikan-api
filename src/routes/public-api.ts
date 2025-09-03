import express from "express";
import { Login, Register } from "../controller/user-controller";
import { refreshToken } from "../controller/refresh-token";
import {
  createMidtransPayment,
  handleMidtransWebhook,
} from "../controller/midtrans-controller";

export const publicRouter = express.Router();

// Auth API
publicRouter.get("/api/token", refreshToken);
publicRouter.post("/api/register", Register);
publicRouter.post("/api/login", Login);

// Midtrans API
publicRouter.post("/api/midpayment", createMidtransPayment);
publicRouter.post("/api/payments/webhook", handleMidtransWebhook);
