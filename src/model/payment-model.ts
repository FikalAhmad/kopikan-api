import {
  Order,
  PaymentDiscount,
  PaymentMethod,
  PaymentStatus,
} from "@prisma/client";

export type PaymentResponse = {
  id: string;
  order_id: string;
  payment_date: Date;
  amount: number;
  status: PaymentStatus;
  payment_method: PaymentMethod;
  createdAt: Date;
  order: Order;
} & {
  discounts: PaymentDiscount[];
};

export type CreatePaymentRequest = {
  order_id: string;
  amount: number;
  payment_method: PaymentMethod;
  discounts: string[];
};

export type UpdatePaymentRequest = {
  status?: PaymentStatus;
};
