import { NextFunction, Request, Response } from "express";
import { create, get, remove, update } from "../service/product-service";
import {
  CreateProductRequest,
  UpdateProductRequest,
} from "../model/product-model";

export const getProducts = async (
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

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const request: CreateProductRequest = req.body as CreateProductRequest;
    const response = await create(request);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const request: UpdateProductRequest = req.body as UpdateProductRequest;
    const response = await update(req.params.id, request);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (
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
