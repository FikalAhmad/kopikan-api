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
    const {
      order_id,
      amount,
      customer_name,
      customer_email,
      payment_method,
      discounts,
    } = req;

    const ewallet = ["gopay", "shopeepay", "ovo", "dana", "linkaja"];
    const normalizedMethod = payment_method.toLowerCase();

    let total = amount;
    if (discounts?.length) {
      const activeDiscounts = await prismaClient.discount.findMany({
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

    const payload = {
      payment_type: normalizedMethod,
      transaction_details: {
        order_id,
        gross_amount: total,
      },
      customer_details: {
        first_name: customer_name,
        email: customer_email,
      },
    };

    try {
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

      if (result.status_code == "201") {
        await prismaClient.payment.create({
          data: {
            order_id,
            amount: total,
            payment_method: ewallet.includes(normalizedMethod)
              ? "E_WALLET"
              : (payment_method.toUpperCase() as PaymentMethod),
          },
        });
      }

      return result;
    } catch (err: any) {
      console.error("Create Ewallet Transaction Error:", err);
      return {
        status_code: "500",
        status_message: err.message || "Payment creation failed",
      };
    }
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

    await prismaClient.payment.update({
      where: { order_id },
      data: { status },
    });

    return { message: "OK" };
  }

  static async checkStatus(orderId: string) {
    const result = await fetch(
      `https://api.sandbox.midtrans.com/v2/${orderId}/status`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Basic " +
            Buffer.from(process.env.SERVER_KEY + ":").toString("base64"),
        },
      }
    );

    return await result.json();
  }
}
