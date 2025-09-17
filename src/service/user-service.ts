import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  CreateUserRequest,
  LoginUserRequest,
  UpdateUserRequest,
  UserResponse,
} from "../model/user-model";
import { prismaClient } from "../application/database";
import { validate } from "../validation/validation";
import { UserValidaton } from "../validation/user-validation";
import { ResponseError } from "../error/response-error";
import { ApiResponse } from "../types/globals.types";

export class UserService {
  static async register(
    request: CreateUserRequest
  ): Promise<ApiResponse<void>> {
    const registerRequest = validate(UserValidaton.REGISTER, request);

    const totalUserWithSameUsername = await prismaClient.user.count({
      where: {
        email: registerRequest.email,
      },
    });

    if (totalUserWithSameUsername !== 0) {
      throw new ResponseError(400, "Username already exists");
    }

    registerRequest.password = await bcrypt.hash(registerRequest.password, 10);

    await prismaClient.user.create({
      data: registerRequest,
    });

    return {
      success: true,
      message: "Register successfully",
    };
  }

  static async login(
    request: LoginUserRequest
  ): Promise<{ refreshToken: string; accessToken: string; msg: string }> {
    const loginRequest = validate(UserValidaton.LOGIN, request);

    let user = await prismaClient.user.findUnique({
      where: {
        email: loginRequest.email,
      },
    });

    if (!user) {
      throw new ResponseError(401, "Email or password is wrong");
    }

    const isPasswordValid = await bcrypt.compare(
      loginRequest.password,
      user.password
    );
    if (!isPasswordValid) {
      throw new ResponseError(401, "Email or password is wrong");
    }

    const id = user.id;
    const name = user.name;
    const email = user.email;
    const accessToken = jwt.sign(
      { id, name, email },
      process.env.ACCESS_TOKEN_SECRET ?? "",
      {
        expiresIn: "1d",
      }
    );
    const refreshToken = jwt.sign(
      { id, name, email },
      process.env.REFRESH_TOKEN_SECRET ?? "",
      {
        expiresIn: "1d",
      }
    );
    await prismaClient.user.update({
      where: {
        email: loginRequest.email,
      },
      data: {
        refresh_token: refreshToken,
      },
    });
    return {
      refreshToken: refreshToken,
      accessToken: accessToken,
      msg: "Login successfully!",
    };
  }

  static async get(): Promise<ApiResponse<UserResponse[]>> {
    const user = await prismaClient.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role_id: true,
        createdAt: true,
        role: {
          select: {
            role_name: true,
          },
        },
      },
    });
    return {
      success: true,
      data: user,
    };
  }

  static async getById(id: string): Promise<ApiResponse<UserResponse>> {
    const userById = await prismaClient.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role_id: true,
        createdAt: true,
        role: true,
      },
    });
    if (!userById) {
      throw new ResponseError(404, "User not found");
    }
    return {
      success: true,
      data: userById,
    };
  }

  static async update(
    id: string,
    request: UpdateUserRequest
  ): Promise<ApiResponse<UserResponse>> {
    const updateRequest = validate(UserValidaton.UPDATE, request);

    if (updateRequest.password) {
      updateRequest.password = await bcrypt.hash(updateRequest.password, 10);
    }

    const updateUser = await prismaClient.user.update({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role_id: true,
        createdAt: true,
        role: true,
      },
      data: updateRequest,
    });

    return {
      success: true,
      data: updateUser,
    };
  }

  static async remove(id: string): Promise<ApiResponse<void>> {
    const deleteUserById = await prismaClient.user.delete({
      where: { id },
    });

    if (!deleteUserById) {
      throw new ResponseError(404, "User ID is not found");
    }
    return {
      success: true,
      message: "Deleted successfully",
    };
  }

  static async logout(refreshToken: string): Promise<ApiResponse<void>> {
    if (!refreshToken) {
      throw new ResponseError(400, "Refresh token is required");
    }

    const result = await prismaClient.user.update({
      where: { refresh_token: refreshToken },
      data: { refresh_token: null },
    });

    if (!result) {
      throw new ResponseError(401, "Invalid refresh token");
    }

    return {
      success: true,
      message: "Logout successfully",
    };
  }
}
