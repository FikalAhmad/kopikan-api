import { NextFunction, Request, Response } from "express";
import { CreateMidtransRequest } from "../model/midtrans-model";
import {
  createEwalletTransaction,
  createMidtrans,
  midtransWebhook,
  verifySignature,
} from "../service/midtrans-service";

export const createMidtransPayment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const request: CreateMidtransRequest = req.body as CreateMidtransRequest;
    const response = await createMidtrans(request);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const createEwalletPayment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await createEwalletTransaction(req.body);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const handleMidtransWebhook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!verifySignature(req)) {
      return res.status(403).json({ error: "Invalid signature" });
    }

    const response = await midtransWebhook(req.body);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
