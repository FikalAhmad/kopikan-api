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

    const { order_id, amount, payment_method, discounts } =
      createPaymentRequest;

    await prismaClient.$transaction(async (tx) => {
      // Hitung total dengan diskon
      let total = amount;
      if (discounts?.length) {
        const activeDiscounts = await tx.discount.findMany({
          where: {
            id: { in: discounts },
            is_active: true,
            start_date: { lte: new Date() },
            end_date: { gte: new Date() },
          },
        });

        for (const d of activeDiscounts) {
          if (d.min_purchase && total < d.min_purchase) continue;

          let discountValue = 0;

          if (d.type === "PERCENTAGE") {
            discountValue = Math.floor((total * d.value) / 100);
            if (d.max_discount && discountValue > d.max_discount) {
              discountValue = d.max_discount;
            }
          } else if (d.type === "FIXED_AMOUNT") {
            discountValue = d.value;
          }

          total -= discountValue;
        }
      }

      const taxRate = 0.1;
      total += total * taxRate;
      if (total < 0) {
        total = 0;
      }

      await tx.payment.create({
        data: {
          order_id,
          amount: total,
          payment_method,
          status: "COMPLETED",
          discounts: {
            create: discounts?.map((d: string) => ({
              discount_id: d,
            })),
          },
        },
        include: {
          discounts: true,
        },
      });

      await tx.order.update({
        where: { id: order_id },
        data: {
          status: "COMPLETED",
        },
      });
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
        discounts: true,
      },
    });
    return { success: true, data: payment };
  }

  static async getById(id: string): Promise<ApiResponse<PaymentResponse>> {
    const paymentById = await prismaClient.payment.findUnique({
      where: { id },

      include: {
        order: true,
        discounts: true,
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
