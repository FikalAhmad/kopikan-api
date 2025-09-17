import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import {
  CreatePaymentRequest,
  PaymentResponse,
  UpdatePaymentRequest,
} from "../model/payment-model";
import { PaymentValidaton } from "../validation/payment-validation";
import { validate } from "../validation/validation";
import { ApiResponse } from "../types/globals.types";

export class PaymentService {
  static async create(
    request: CreatePaymentRequest
  ): Promise<ApiResponse<void>> {
    const createPaymentRequest = validate(PaymentValidaton.CREATE, request);

    const { order_id, amount, payment_method } = createPaymentRequest;

    await prismaClient.payment.create({
      data: {
        order_id,
        amount,
        payment_method,
        status: "COMPLETED",
      },
    });

    return {
      success: true,
      message: "Payment created successfully",
    };
  }

  static async get(): Promise<ApiResponse<PaymentResponse[]>> {
    const payment = await prismaClient.payment.findMany({
      include: {
        order: true,
      },
    });
    return { success: true, data: payment };
  }

  static async getById(id: string): Promise<ApiResponse<PaymentResponse>> {
    const paymentById = await prismaClient.payment.findUnique({
      where: { id },

      include: {
        order: true,
      },
    });
    if (!paymentById) {
      throw new ResponseError(404, "Order not found");
    }
    return { success: true, data: paymentById };
  }

  static async update(
    id: string,
    request: UpdatePaymentRequest
  ): Promise<ApiResponse<void>> {
    const updatePaymentRequest = validate(PaymentValidaton.UPDATE, request);

    await prismaClient.payment.update({
      where: {
        id,
      },
      data: updatePaymentRequest,
    });

    return { success: true, message: "Payment updated successfully" };
  }

  static async remove(id: string): Promise<ApiResponse<void>> {
    const removePayment = await prismaClient.payment.delete({
      where: { id },
    });

    if (!removePayment) {
      throw new ResponseError(404, "Payment ID is not found");
    }
    return { success: true, message: "Payment deleted successfully" };
  }
}
