import { NextFunction, Request, Response } from "express";
import {
  CreateDiscountRequest,
  UpdateDiscountRequest,
} from "../model/discount-model";
import {
  create,
  get,
  getById,
  remove,
  update,
} from "../service/discount-services";

export const getDiscount = async (
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

export const getDiscountbyId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await getById(req.params.id);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const createDiscount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const request: CreateDiscountRequest = req.body as CreateDiscountRequest;
    const response = await create(request);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const updateDiscount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const request: UpdateDiscountRequest = req.body as UpdateDiscountRequest;
    const response = await update(req.params.id, request);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const deleteDiscount = async (
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
