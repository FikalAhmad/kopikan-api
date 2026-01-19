import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { publicRouter } from "../routes/public-api";
import { apiRouter } from "../routes/api";
import midtransClient from "midtrans-client";
import helmet from "helmet";
import { expressRateLimit } from "../middleware/rate-limit";

dotenv.config();
export const web = express();
web.use(express.json());
web.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://pos-kopikan.vercel.app",
];
web.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true); // allow
      } else {
        callback(new Error("Not allowed by CORS")); // block
      }
    },
    credentials: true,
  }),
);
web.use(helmet());
web.use(expressRateLimit());

export const snap = new midtransClient.Snap({
  isProduction: false, // true jika sudah live
  serverKey: process.env.SERVER_KEY,
});

web.use(publicRouter);
web.use(apiRouter);
// web.use(errorMiddleware);
