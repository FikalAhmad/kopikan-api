import express from "express";
import { UserController } from "../controller/user-controller";
import { refreshToken } from "../controller/refresh-token";
import { MidtransController } from "../controller/midtrans-controller";

export const publicRouter = express.Router();

// Auth API
publicRouter.get("/api/token", refreshToken);
publicRouter.post("/api/register", UserController.Register);
publicRouter.post("/api/login", UserController.Login);
publicRouter.patch("/api/logout", UserController.Logout);

// Midtrans API
// publicRouter.post("/api/midpayment", MidtransController.createMidtransPayment);
publicRouter.post(
  "/api/payments/webhook",
  MidtransController.handleMidtransWebhook
);
