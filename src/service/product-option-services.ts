import { prismaClient } from "../application/database";
import {
  CreateProductOptionRequest,
  CreateProductOptionValueRequest,
  CreateProductProductOptionRequest,
  ProductOptionResponse,
  ProductOptionValueResponse,
  ProductProductOptionResponse,
  UpdateProductOptionRequest,
  UpdateProductOptionValueRequest,
} from "../model/product-option-model";
import { ApiResponse } from "../types/globals.types";
import {
  ProductOptionValidation,
  ProductOptionValueValidation,
  ProductProductOptionValidation,
} from "../validation/product-option-validation";
import { validate } from "../validation/validation";

export class ProductOptionService {
  static async createPO(
    request: CreateProductOptionRequest
  ): Promise<ApiResponse<void>> {
    const createProductOptionRequest = validate(
      ProductOptionValidation.CREATE,
      request
    );

    await prismaClient.productOption.create({
      data: createProductOptionRequest,
    });

    return {
      success: true,
      message: "Add product option successfully",
    };
  }

  static async getPO(): Promise<ApiResponse<ProductOptionResponse[]>> {
    const productOption = await prismaClient.productOption.findMany({
      include: { values: true },
    });
    return { success: true, data: productOption };
  }

  static async updatePO(
    id: string,
    request: UpdateProductOptionRequest
  ): Promise<ApiResponse<void>> {
    const updateProductOptionRequest = validate(
      ProductOptionValidation.UPDATE,
      request
    );

    await prismaClient.productOption.update({
      where: {
        id,
      },
      data: updateProductOptionRequest,
    });

    return { success: true, message: "Updated product option successfully" };
  }

  static async removePO(id: string): Promise<ApiResponse<void>> {
    await prismaClient.productOption.delete({
      where: { id },
    });

    return { success: true, message: "Deleted product option successfully" };
  }
}

export class ProductOptionValueService {
  static async createPOV(
    request: CreateProductOptionValueRequest
  ): Promise<ApiResponse<void>> {
    const createProductOptionValueRequest = validate(
      ProductOptionValueValidation.CREATE,
      request
    );

    await prismaClient.productOptionValue.create({
      data: createProductOptionValueRequest,
    });

    return {
      success: true,
      message: "Add product option value successfully",
    };
  }

  static async getPOV(): Promise<ApiResponse<ProductOptionValueResponse[]>> {
    const productOptionValue = await prismaClient.productOptionValue.findMany();
    return { success: true, data: productOptionValue };
  }

  static async updatePOV(
    id: string,
    request: UpdateProductOptionValueRequest
  ): Promise<ApiResponse<void>> {
    const updateProductOptionValueRequest = validate(
      ProductOptionValueValidation.UPDATE,
      request
    );

    await prismaClient.productOptionValue.update({
      where: {
        id,
      },
      data: updateProductOptionValueRequest,
    });

    return {
      success: true,
      message: "Updated product value option successfully",
    };
  }

  static async removePOV(id: string): Promise<ApiResponse<void>> {
    await prismaClient.productOptionValue.delete({
      where: { id },
    });

    return {
      success: true,
      message: "Deleted product option value successfully",
    };
  }
}

export class ProductProductOptionService {
  static async createPPO(
    request: CreateProductProductOptionRequest
  ): Promise<ApiResponse<void>> {
    const createProductProductOptionRequest = validate(
      ProductProductOptionValidation.CREATE,
      request
    );

    await prismaClient.productProductOption.create({
      data: createProductProductOptionRequest,
    });

    return {
      success: true,
      message: "link product with option successfully",
    };
  }

  static async getPPO(): Promise<ApiResponse<ProductProductOptionResponse[]>> {
    const ppo = await prismaClient.productProductOption.findMany({
      include: {
        option: {
          include: { values: true },
        },
      },
    });

    return { success: true, data: ppo };
  }
}
