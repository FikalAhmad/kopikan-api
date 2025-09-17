import { Order, PaymentMethod, PaymentStatus } from "@prisma/client";

export type PaymentResponse = {
  id: string;
  order_id: string;
  payment_date: Date;
  amount: number;
  status: PaymentStatus;
  payment_method: PaymentMethod;
  createdAt: Date;
  order: Order;
};

export type CreatePaymentRequest = {
  order_id: string;
  amount: number;
  payment_method: PaymentMethod;
};

export type UpdatePaymentRequest = {
  order_id?: string;
  payment_date?: Date;
  amount?: number;
  status?: PaymentStatus;
  payment_method?: PaymentMethod;
};
