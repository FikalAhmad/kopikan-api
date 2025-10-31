import { NextFunction, Request, Response } from "express";
import {
  CreateProductRequest,
  UpdateProductRequest,
} from "../model/product-model";
import { ProductService } from "../service/product-service";

export class ProductController {
  static async getProducts(req: Request, res: Response, next: NextFunction) {
    const { page, pageSize } = req.query;
    try {
      const response = await ProductService.get(
        page?.toString(),
        pageSize?.toString()
      );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateProductRequest = req.body as CreateProductRequest;
      const response = await ProductService.create(request);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async updateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const request: UpdateProductRequest = req.body as UpdateProductRequest;
      const response = await ProductService.update(req.params.id, request);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await ProductService.remove(req.params.id);
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}
