import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { publicRouter } from "../routes/public-api";
import { apiRouter } from "../routes/api";
import midtransClient from "midtrans-client";

dotenv.config();
export const web = express();
web.use(express.json());
web.use(cookieParser());
web.use(
  cors({
    origin: (origin, callback) => {
      callback(null, true);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

export const snap = new midtransClient.Snap({
  isProduction: false, // true jika sudah live
  serverKey: process.env.SERVER_KEY,
});

web.use(publicRouter);
web.use(apiRouter);
// web.use(errorMiddleware);
