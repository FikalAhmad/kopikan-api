import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { publicRouter } from "../routes/public-api";
import { apiRouter } from "../routes/api";

dotenv.config();
export const web = express();
web.use(express.json());
web.use(cookieParser());
web.use(
  cors({
    origin: ["http://localhost:3000", "https://pos-kopikan.vercel.app"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Set-Cookie"],
  })
);

web.use(publicRouter);
web.use(apiRouter);
// web.use(errorMiddleware);
