import { NextFunction, Request, Response } from "express";
import { UserService } from "../service/user-service.js";
import {
  CreateUserRequest,
  LoginUserRequest,
  UpdateUserRequest,
} from "../model/user-model.js";

export class UserController {
  static async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await UserService.get();
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          error: "User ID not found",
        });
      }

      const response = await UserService.getById(req.params.id);
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
  }

  static async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const request: UpdateUserRequest = req.body as UpdateUserRequest;
      const response = await UserService.update(req.params.id, request);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          error: "User ID not found",
        });
      }

      const response = await UserService.remove(req.params.id);
      if (!response) {
        return res.status(404).json({
          error: "User not found",
        });
      }

      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async Register(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateUserRequest = req.body as CreateUserRequest;
      const response = await UserService.register(request);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async Login(req: Request, res: Response) {
    try {
      const request: LoginUserRequest = req.body as LoginUserRequest;
      const response = await UserService.login(request);
      const { accessToken, refreshToken, msg } = response;
      res
        .status(200)
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
          sameSite: "none",
          secure: true,
          path: "/",
        })
        .json({
          accessToken,
          refreshToken,
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
  }

  static async Logout(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const response = await UserService.logout(id);

      // res.clearCookie("refreshToken", {
      //   httpOnly: true,
      //   sameSite: "none",
      //   secure: true,
      //   path: "/",
      // });
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}
