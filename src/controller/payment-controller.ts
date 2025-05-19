import { NextFunction, Request, Response } from "express";
import {
  create,
  get,
  getById,
  remove,
  update,
} from "../service/payment-service";
import {
  CreatePaymentRequest,
  UpdatePaymentRequest,
} from "../model/payment-model";

export const getPayments = async (
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

export const getPaymentById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await getById(req.params.id);
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error in getPaymentById:", error);
    next(error);
  }
};

export const createPayment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const request: CreatePaymentRequest = req.body as CreatePaymentRequest;
    const response = await create(request);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const updatePayment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const request: UpdatePaymentRequest = req.body as UpdatePaymentRequest;
    const response = await update(req.params.id, request);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const deletePayment = async (
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
