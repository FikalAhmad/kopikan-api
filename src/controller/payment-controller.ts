import { NextFunction, Request, Response } from "express";
import { PaymentService } from "../service/payment-service";
import {
  CreatePaymentRequest,
  UpdatePaymentRequest,
} from "../model/payment-model";

export class PaymentController {
  static async getPayments(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await PaymentService.get();
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async getPaymentById(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await PaymentService.getById(req.params.id);
      return res.status(200).json(response);
    } catch (error) {
      console.error("Error in getPaymentById:", error);
      next(error);
    }
  }

  static async createPayment(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreatePaymentRequest = req.body as CreatePaymentRequest;
      const response = await PaymentService.create(request);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async updatePayment(req: Request, res: Response, next: NextFunction) {
    try {
      const request: UpdatePaymentRequest = req.body as UpdatePaymentRequest;
      const response = await PaymentService.update(req.params.id, request);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async deletePayment(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await PaymentService.remove(req.params.id);
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}
