import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import {
  CreateRoleRequest,
  RoleResponse,
  UpdateRoleRequest,
} from "../model/role-model";
import { MessageResponse } from "../types/globals.types";

export const create = async (
  request: CreateRoleRequest
): Promise<MessageResponse> => {
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
    msg: "Add role successfully",
  };
};

export const get = async (): Promise<RoleResponse[]> => {
  const role = await prismaClient.role.findMany();
  return role;
};

export const update = async (
  id: string,
  request: UpdateRoleRequest
): Promise<MessageResponse> => {
  await prismaClient.role.update({
    where: {
      id,
    },
    data: request,
  });

  return { msg: "Updated role successfully" };
};

export const remove = async (id: string): Promise<MessageResponse> => {
  const removeRole = await prismaClient.role.delete({
    where: { id },
  });

  if (!removeRole) {
    throw new ResponseError(404, "Role ID is not found");
  }
  return { msg: "Deleted role successfully" };
};
