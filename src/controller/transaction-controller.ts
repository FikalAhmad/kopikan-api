import { NextFunction, Request, Response } from "express";
import { cancel, confirm, create } from "../service/transaction-service";

export const CreateOrderTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await create(req.body);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const ConfirmPaymentTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { orderId, status } = req.body;
    const response = await confirm(orderId, status);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const CancelOrderTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { orderId } = req.body;
    const response = await cancel(orderId);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
