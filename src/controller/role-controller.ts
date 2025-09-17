import { NextFunction, Request, Response } from "express";
import { CreateRoleRequest, UpdateRoleRequest } from "../model/role-model";
import { RoleService } from "../service/role-service";

export class RoleController {
  static async getRoles(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await RoleService.get();
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async createRole(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateRoleRequest = req.body as CreateRoleRequest;
      const response = await RoleService.create(request);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async updateRole(req: Request, res: Response, next: NextFunction) {
    try {
      const request: UpdateRoleRequest = req.body as UpdateRoleRequest;
      const response = await RoleService.update(req.params.id, request);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async deleteRole(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await RoleService.remove(req.params.id);
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}
