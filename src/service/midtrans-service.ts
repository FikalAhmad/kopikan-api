import { prismaClient } from "../application/database";
import { snap } from "../application/web";
import {
  CreateEwalletPaymentRequest,
  CreateMidtransRequest,
  MidtransWebhookRequest,
} from "../model/midtrans-model";
import { MidtransValidaton } from "../validation/midtrans-validation";
import { validate } from "../validation/validation";
import crypto from "crypto";

const MIDTRANS_API_URL = "https://api.sandbox.midtrans.com/v2/charge";

export const createMidtrans = async (req: CreateMidtransRequest) => {
  const createMidtransPaymentRequest = validate(MidtransValidaton.CREATE, req);

  const { order_id, gross_amount, customer_name, customer_email } =
    createMidtransPaymentRequest;

  const parameter = {
    transaction_details: {
      order_id: order_id,
      gross_amount: gross_amount,
    },
    customer_details: {
      first_name: customer_name,
      email: customer_email,
    },
  };

  const transaction = await snap.createTransaction(parameter);
  const snapToken = transaction.token;
  return { snapToken };
};

export async function createEwalletTransaction(
  req: CreateEwalletPaymentRequest
) {
  const { order_id, amount, customer_name, customer_email } = req;

  const payload = {
    payment_type: "qris",
    transaction_details: {
      order_id,
      gross_amount: amount,
    },
    customer_details: {
      first_name: customer_name,
      email: customer_email,
    },
    // gopay: {
    //   enable_callback: true,
    //   callback_url: "https://yourdomain.com/payment/callback",
    // },
  };

  const midtransRes = await fetch(MIDTRANS_API_URL, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Basic " + Buffer.from(process.env.SERVER_KEY + ":").toString("base64"),
    },
  });

  const result = await midtransRes.json();

  await prismaClient.payment.create({
    data: {
      order_id: order_id,
      amount,
      payment_method: "qris",
      transaction_id: result.transaction_id,
    },
  });

  return result;
}

export const verifySignature = (body: any) => {
  const input =
    body.order_id +
    body.status_code +
    body.gross_amount +
    process.env.MIDTRANS_SERVER_KEY;
  const expectedSignature = crypto
    .createHash("sha512")
    .update(input)
    .digest("hex");
  return expectedSignature === body.signature_key;
};

export const midtransWebhook = async (req: MidtransWebhookRequest) => {
  const { order_id, transaction_status } = req;

  const orderId = order_id;
  const transactionStatus = transaction_status;

  let status = "pending";
  if (transactionStatus === "settlement") {
    status = "success";
  } else if (
    transactionStatus === "cancel" ||
    transactionStatus === "expire" ||
    transactionStatus === "deny"
  ) {
    status = "failed";
  }

  await prismaClient.payment.update({
    where: { order_id: orderId },
    data: { status },
  });

  return { message: "OK" };
};
