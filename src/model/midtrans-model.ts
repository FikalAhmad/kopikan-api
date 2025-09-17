import { PaymentMethod } from "@prisma/client";

export type CreateMidtransRequest = {
  order_id: string;
  gross_amount: number;
  customer_name: string;
  customer_email: string;
};

export type CreateEwalletPaymentRequest = {
  order_id: string;
  amount: number;
  customer_name: string;
  customer_email: string;
  payment_method: string | PaymentMethod;
};

export type MidtransWebhookRequest = {
  order_id: string;
  transaction_status: string;
};
