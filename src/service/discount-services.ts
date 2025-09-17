import { prismaClient } from "../application/database";
import {
  CreateDiscountRequest,
  DiscountResponse,
  UpdateDiscountRequest,
} from "../model/discount-model";
import { ApiResponse } from "../types/globals.types";
import { DiscountValidaton } from "../validation/discount-validation";
import { validate } from "../validation/validation";

export class DiscountService {
  static async get(): Promise<ApiResponse<DiscountResponse[]>> {
    const allDiscount = await prismaClient.discount.findMany();
    return { success: true, data: allDiscount };
  }

  static async getById(
    id: string
  ): Promise<ApiResponse<DiscountResponse | null>> {
    const discountById = await prismaClient.discount.findUnique({
      where: { id },
    });
    return { success: true, data: discountById };
  }

  static async create(
    request: CreateDiscountRequest
  ): Promise<ApiResponse<void>> {
    const createDiscountValidation = validate(
      DiscountValidaton.CREATE,
      request
    );

    await prismaClient.discount.create({
      data: createDiscountValidation,
    });

    return {
      success: true,
      message: "Discount created successfully",
    };
  }

  static async update(
    id: string,
    request: UpdateDiscountRequest
  ): Promise<ApiResponse<void>> {
    const updateDiscountValidation = validate(
      DiscountValidaton.UPDATE,
      request
    );

    await prismaClient.discount.update({
      where: { id },
      data: updateDiscountValidation,
    });

    return {
      success: true,
      message: "Discount updated successfully",
    };
  }

  static async remove(id: string): Promise<ApiResponse<void>> {
    await prismaClient.discount.delete({
      where: { id },
    });
    return { success: true, message: "Discount deleted successfully" };
  }
}
