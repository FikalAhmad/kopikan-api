import { NextFunction, Request, Response } from "express";
// import { CreateMidtransRequest } from "../model/midtrans-model";
import { MidtransService } from "../service/midtrans-service";

export class MidtransController {
  // static async createMidtransPayment(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ) {
  //   try {
  //     const request: CreateMidtransRequest = req.body as CreateMidtransRequest;
  //     const response = await MidtransService.createMidtrans(request);
  //     res.status(200).json(response);
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  static async createEwalletPayment(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await MidtransService.createEwalletTransaction(req.body);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async handleMidtransWebhook(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (!MidtransService.verifySignature(req.body)) {
        return res.status(403).json({ error: "Invalid signature" });
      }

      const response = await MidtransService.midtransWebhook(req.body);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}
