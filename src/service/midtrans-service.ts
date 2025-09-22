import { PaymentMethod, PaymentStatus } from "@prisma/client";
import { prismaClient } from "../application/database";
// import { snap } from "../application/web";
import {
  CreateEwalletPaymentRequest,
  // CreateMidtransRequest,
  MidtransWebhookRequest,
} from "../model/midtrans-model";
// import { MidtransValidaton } from "../validation/midtrans-validation";
// import { validate } from "../validation/validation";
import crypto from "crypto";

const MIDTRANS_API_URL = "https://api.sandbox.midtrans.com/v2/charge";

export class MidtransService {
  // SNAP METHOD
  // static async createMidtrans(req: CreateMidtransRequest) {
  //   const createMidtransPaymentRequest = validate(
  //     MidtransValidaton.CREATE,
  //     req
  //   );

  //   const { order_id, gross_amount, customer_name, customer_email } =
  //     createMidtransPaymentRequest;

  //   const parameter = {
  //     transaction_details: {
  //       order_id: order_id,
  //       gross_amount: gross_amount,
  //     },
  //     customer_details: {
  //       first_name: customer_name,
  //       email: customer_email,
  //     },
  //   };

  //   const transaction = await snap.createTransaction(parameter);
  //   const snapToken = transaction.token;
  //   return { snapToken };
  // }

  static async createEwalletTransaction(req: CreateEwalletPaymentRequest) {
    const { order_id, amount, customer_name, customer_email, payment_method } =
      req;

    const ewallet = ["gopay", "shopeepay", "ovo", "dana, linkaja"];

    const payload = {
      payment_type: payment_method.toLowerCase(),
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
          "Basic " +
          Buffer.from(process.env.SERVER_KEY + ":").toString("base64"),
      },
    });

    const result = await midtransRes.json();

    await prismaClient.payment.create({
      data: {
        order_id: order_id,
        amount,
        payment_method: ewallet.includes(payment_method)
          ? "E_WALLET"
          : (payment_method as PaymentMethod),
      },
    });

    return result;
  }

  static async verifySignature(req: any) {
    const { order_id, status_code, gross_amount, signature_key } = req;

    const input =
      order_id + status_code + gross_amount + process.env.SERVER_KEY;

    const expectedSignature = crypto
      .createHash("sha512")
      .update(input)
      .digest("hex");

    return expectedSignature.toLowerCase() === signature_key.toLowerCase();
  }

  static async midtransWebhook(req: MidtransWebhookRequest) {
    const { order_id, transaction_status } = req;

    const transactionStatus = transaction_status;

    let status = "PENDING" as PaymentStatus;
    if (transactionStatus === "settlement") {
      status = "COMPLETED";
    } else if (
      transactionStatus === "cancel" ||
      transactionStatus === "expire" ||
      transactionStatus === "deny"
    ) {
      status = "CANCELED";
    }
    console.log("ini status testing: " + transactionStatus);

    await prismaClient.payment.update({
      where: { order_id },
      data: { status },
    });

    return { message: "OK" };
  }
}
