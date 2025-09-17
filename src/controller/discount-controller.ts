import { NextFunction, Request, Response } from "express";
import {
  CreateDiscountRequest,
  UpdateDiscountRequest,
} from "../model/discount-model";
import { DiscountService } from "../service/discount-services";

export class DiscountController {
  static async getDiscount(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await DiscountService.get();
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async getDiscountbyId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await DiscountService.getById(req.params.id);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async createDiscount(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateDiscountRequest = req.body as CreateDiscountRequest;
      const response = await DiscountService.create(request);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async updateDiscount(req: Request, res: Response, next: NextFunction) {
    try {
      const request: UpdateDiscountRequest = req.body as UpdateDiscountRequest;
      const response = await DiscountService.update(req.params.id, request);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async deleteDiscount(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await DiscountService.remove(req.params.id);
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}
