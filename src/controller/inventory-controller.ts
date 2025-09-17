import { NextFunction, Request, Response } from "express";
import { InventoryService } from "../service/inventory-services";
import {
  CreateInventoryRequest,
  UpdateInventoryRequest,
} from "../model/inventory-models";

export class InventoryController {
  static async getInventory(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await InventoryService.get();
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async getInventorybyId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await InventoryService.getById(req.params.id);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async createInventory(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const request: CreateInventoryRequest =
        req.body as CreateInventoryRequest;
      const response = await InventoryService.create(request);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async updateInventory(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const request: UpdateInventoryRequest =
        req.body as UpdateInventoryRequest;
      const response = await InventoryService.update(req.params.id, request);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async deleteInventory(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await InventoryService.remove(req.params.id);
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}
