import { NextFunction, Request, Response } from "express";
import {
  ProductOptionService,
  ProductOptionValueService,
  // ProductProductOptionService,
} from "../service/product-option-services";
import {
  CreateProductOptionRequest,
  CreateProductOptionValueRequest,
  // CreateProductProductOptionRequest,
  UpdateProductOptionRequest,
  UpdateProductOptionValueRequest,
} from "../model/product-option-model";

export class ProductOptionController {
  static async getProductOption(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await ProductOptionService.getPO();
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async createProductOption(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const request: CreateProductOptionRequest =
        req.body as CreateProductOptionRequest;
      const response = await ProductOptionService.createPO(request);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async updateProductOption(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const request: UpdateProductOptionRequest =
        req.body as UpdateProductOptionRequest;
      const response = await ProductOptionService.updatePO(
        req.params.id,
        request
      );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async deleteProductOption(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await ProductOptionService.removePO(req.params.id);
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}

export class ProductOptionValueController {
  static async getProductOptionValue(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await ProductOptionValueService.getPOV();
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async createProductOptionValue(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const request: CreateProductOptionValueRequest =
        req.body as CreateProductOptionValueRequest;
      const response = await ProductOptionValueService.createPOV(request);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async updateProductOptionValue(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const request: UpdateProductOptionValueRequest =
        req.body as UpdateProductOptionValueRequest;
      const response = await ProductOptionValueService.updatePOV(
        req.params.id,
        request
      );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async deleteProductOptionValue(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await ProductOptionValueService.removePOV(req.params.id);
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}

// export class ProductProductOptionController {
//   static async createProductProductOption(
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ) {
//     try {
//       const request: CreateProductProductOptionRequest =
//         req.body as CreateProductProductOptionRequest;
//       const response = await ProductProductOptionService.createPPO(request);
//       res.status(200).json(response);
//     } catch (error) {
//       next(error);
//     }
//   }

//   static async getProductProductOption(
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ) {
//     try {
//       const response = await ProductProductOptionService.getPPO();
//       res.status(200).json(response);
//     } catch (error) {
//       next(error);
//     }
//   }
// }
