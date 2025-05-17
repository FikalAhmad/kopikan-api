import { Order, Payment } from "@prisma/client";

export type PaymentResponse = {
  id: string;
  payment_date: Date;
  amount: number;
  status: string;
  payment_method: string;
  transaction_id: string | null;
  order: Order;
};

export type CreatePaymentRequest = {
  order_id: string;
  payment_date: Date;
  amount: number;
  status: string;
  payment_method: string;
  transaction_id: string | null;
};

export type UpdatePaymentRequest = {
  order_id?: string;
  payment_date?: Date;
  amount?: number;
  status?: string;
  payment_method?: string;
  transaction_id?: string | null;
};
