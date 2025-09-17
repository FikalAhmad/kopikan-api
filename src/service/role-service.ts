import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import {
  CreateRoleRequest,
  RoleResponse,
  UpdateRoleRequest,
} from "../model/role-model";
import { ApiResponse } from "../types/globals.types";

export class RoleService {
  static async create(request: CreateRoleRequest): Promise<ApiResponse<void>> {
    const checkRoleExist = await prismaClient.role.count({
      where: {
        role_name: request.role_name,
      },
    });

    if (checkRoleExist !== 0) {
      throw new ResponseError(400, "Role already exists");
    }

    await prismaClient.role.create({
      data: request,
    });

    return {
      success: true,
      message: "Add role successfully",
    };
  }

  static async get(): Promise<ApiResponse<RoleResponse[]>> {
    const role = await prismaClient.role.findMany();
    return {
      success: true,
      data: role,
    };
  }

  static async update(
    id: string,
    request: UpdateRoleRequest
  ): Promise<ApiResponse<RoleResponse>> {
    const roleUpdate = await prismaClient.role.update({
      where: {
        id,
      },
      data: request,
    });

    return {
      success: true,
      data: roleUpdate,
    };
  }

  static async remove(id: string): Promise<ApiResponse<void>> {
    const removeRole = await prismaClient.role.delete({
      where: { id },
    });

    if (!removeRole) {
      throw new ResponseError(404, "Role ID is not found");
    }
    return {
      success: true,
      message: "Deleted role successfully",
    };
  }
}
