import { NextFunction, Request, Response } from "express";
import {
  getCustomerCount,
  getProductSales,
} from "../service/dashboard-services";

export type ProductSalesFilter = {
  period: string;
  category: string;
};

export const getProductSalesPeriod = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const request: { period: string } = req.body;
    const response = await getProductSales(request);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const getCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await getCustomerCount();
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
