import express from "express";
import {
  getUsers,
  getUsersById,
  Logout,
  updateUser,
} from "../controller/user-controller";
import { authMiddleware } from "../middleware/auth-middleware";

export const apiRouter = express.Router();
// apiRouter.use(authMiddleware);

// User API
apiRouter.get("/api/users", authMiddleware, getUsers);
apiRouter.get("/api/users/:id", authMiddleware, getUsersById);
apiRouter.patch("/api/users", authMiddleware, updateUser);
apiRouter.patch("/api/logout", authMiddleware, Logout);
