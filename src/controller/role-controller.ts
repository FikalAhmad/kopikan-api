import { NextFunction, Request, Response } from "express";
import { create, get, remove, update } from "../service/role-service";
import { CreateRoleRequest, UpdateRoleRequest } from "../model/role-model";

export const getRoles = async (
  req: Request,
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

export const createRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const request: CreateRoleRequest = req.body as CreateRoleRequest;
    const response = await create(request);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const updateRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const request: UpdateRoleRequest = req.body as UpdateRoleRequest;
    const response = await update(req.params.id, request);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const deleteRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await remove(req.params.id);
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
