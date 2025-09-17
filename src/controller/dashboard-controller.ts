import { NextFunction, Request, Response } from "express";
import { DashboardService } from "../service/dashboard-services";

export type ProductSalesFilter = {
  period: string;
  category: string;
};

export class DashboardController {
  static async getProductSalesPeriod(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const request: { period: string } = req.body;
      const response = await DashboardService.getProductSales(request);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async getTotalDashboardSummary(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await DashboardService.totalDashboardSummary();
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async getOrderSummary(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await DashboardService.orderSummary();
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}
