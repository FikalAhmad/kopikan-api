import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import {
  CreatePaymentRequest,
  PaymentResponse,
  UpdatePaymentRequest,
} from "../model/payment-model";
import { MessageResponse } from "../types/globals.types";
import { PaymentValidaton } from "../validation/payment-validation";
import { validate } from "../validation/validation";

export const create = async (
  request: CreatePaymentRequest
): Promise<MessageResponse> => {
  const createPaymentRequest = validate(PaymentValidaton.CREATE, request);

  await prismaClient.payment.create({
    data: createPaymentRequest,
  });

  return {
    msg: "Payment created successfully",
  };
};

export const get = async (): Promise<PaymentResponse[]> => {
  const payment = await prismaClient.payment.findMany({
    include: {
      order: true,
    },
  });
  return payment;
};

export const getById = async (id: string): Promise<PaymentResponse> => {
  const paymentById = await prismaClient.payment.findUnique({
    where: { id },

    include: {
      order: true,
    },
  });
  if (!paymentById) {
    throw new ResponseError(404, "Order not found");
  }
  return paymentById;
};

export const update = async (
  id: string,
  request: UpdatePaymentRequest
): Promise<MessageResponse> => {
  const updatePaymentRequest = validate(PaymentValidaton.UPDATE, request);

  await prismaClient.payment.update({
    where: {
      id,
    },
    data: updatePaymentRequest,
  });

  return { msg: "Payment updated successfully" };
};

export const remove = async (id: string): Promise<MessageResponse> => {
  const removePayment = await prismaClient.payment.delete({
    where: { id },
  });

  if (!removePayment) {
    throw new ResponseError(404, "Payment ID is not found");
  }
  return { msg: "Payment deleted successfully" };
};
