import { NextFunction, Request, Response } from "express";
import {
  getProductSales,
  orderSummary,
  totalDashboardSummary,
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

export const getTotalDashboardSummary = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await totalDashboardSummary();
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const getOrderSummary = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await orderSummary();
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
