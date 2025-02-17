import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserRequest } from "../types/user-request.js";
import { NextFunction, Request, Response } from "express";
import {
  get,
  getById,
  login,
  logout,
  register,
  update,
} from "../service/user-service.js";
import {
  CreateUserRequest,
  LoginUserRequest,
  UpdateUserRequest,
} from "../model/user-model.js";

export const getUsers = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await get();
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
export const getUsersById = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.params.id) {
      return res.status(401).json({
        error: "User not authenticated",
      });
    }

    if (!req.params.id) {
      return res.status(400).json({
        error: "User ID not found",
      });
    }

    const response = await getById(req.params.id);
    if (!response) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    return res.status(200).json(response);
  } catch (error) {
    console.error("Error in getUsersById:", error);
    next(error);
  }
};

export const updateUser = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const request: UpdateUserRequest = req.body as UpdateUserRequest;
    const response = await update(req.user!, request);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const Register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const request: CreateUserRequest = req.body as CreateUserRequest;
    const response = await register(request);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const Login = async (req: Request, res: Response) => {
  try {
    const request: LoginUserRequest = req.body as LoginUserRequest;
    const response = await login(request);
    const { accessToken, refreshToken, msg } = response;

    // Set cookie dulu
    res
      .status(200)
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: "none",
        secure: false,
        path: "/",
      })
      .json({
        accessToken,
        msg,
      });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        msg: error.message || "Login failed",
      });
    }
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
};

export const Logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    const response = await logout(refreshToken);

    res.clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
