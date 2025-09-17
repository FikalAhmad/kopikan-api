import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import {
  CreateProductRequest,
  ProductResponse,
  ProductWithOptionResponse,
  UpdateProductRequest,
} from "../model/product-model";
import { ApiResponse } from "../types/globals.types";
import { ProductValidaton } from "../validation/product-validation";
import { validate } from "../validation/validation";

export class ProductService {
  static async create(
    request: CreateProductRequest
  ): Promise<ApiResponse<ProductResponse>> {
    const createProductRequest = validate(ProductValidaton.CREATE, request);

    const checkProducteExist = await prismaClient.product.count({
      where: {
        product_name: request.product_name,
      },
    });

    if (checkProducteExist !== 0) {
      throw new ResponseError(400, "Product already exists");
    }

    const product = await prismaClient.product.create({
      data: createProductRequest,
    });

    return {
      success: true,
      data: product,
    };
  }

  static async get(): Promise<ApiResponse<ProductWithOptionResponse[]>> {
    const product = await prismaClient.product.findMany({
      include: {
        options: {
          include: {
            option: {
              include: {
                values: true,
              },
            },
          },
        },
      },
    });
    return {
      success: true,
      data: product,
    };
  }

  static async update(
    id: string,
    request: UpdateProductRequest
  ): Promise<ApiResponse<ProductResponse>> {
    const updateProductRequest = validate(ProductValidaton.UPDATE, request);

    const productUpdate = await prismaClient.product.update({
      where: {
        id,
      },
      data: updateProductRequest,
    });

    return { success: true, data: productUpdate };
  }

  static async remove(id: string): Promise<ApiResponse<void>> {
    const removeProduct = await prismaClient.product.delete({
      where: { id },
    });

    if (!removeProduct) {
      throw new ResponseError(404, "Product ID is not found");
    }
    return { success: true, message: "Deleted product successfully" };
  }
}
