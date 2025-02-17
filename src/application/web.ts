import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { publicRouter } from "../routes/public-api";
import { apiRouter } from "../routes/api";

dotenv.config();
export const web = express();
web.use(express.json());
web.use(
  cors({
    origin: function (origin, callback) {
      callback(null, true);
    },
    // origin: [
    //   "http://localhost:3000",
    //   "http://your-production-domain.com",
    //   "https://your-production-domain.com"
    // ],
    credentials: true,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

web.use(cookieParser());

web.use(publicRouter);
web.use(apiRouter);
// web.use(errorMiddleware);
