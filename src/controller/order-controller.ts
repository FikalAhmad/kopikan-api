import { NextFunction, Request, Response } from "express";
import { OrderService } from "../service/order-service";
import { CreateOrderRequest, UpdateOrderRequest } from "../model/order-model";

export class OrderController {
  static async getOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await OrderService.get();
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async getOrderById(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await OrderService.getById(req.params.id);
      return res.status(200).json(response);
    } catch (error) {
      console.error("Error in getOrderById:", error);
      next(error);
    }
  }

  static async getOfflineOrders(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await OrderService.getOffline();
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async getOnlineOrders(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await OrderService.getOnline();
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async createOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateOrderRequest = req.body as CreateOrderRequest;
      const response = await OrderService.create(request);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async updateOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const request: UpdateOrderRequest = req.body as UpdateOrderRequest;
      const response = await OrderService.update(req.params.id, request);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async deleteOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await OrderService.remove(req.params.id);
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}
