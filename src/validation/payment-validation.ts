import { z, ZodType } from "zod";

export class PaymentValidaton {
  static readonly CREATE: ZodType = z.object({
    order_id: z.string().min(1).max(100),
    amount: z.number().min(1).max(1000000000),
    status: z.enum(["PENDING", "COMPLETED", "CANCELED"] as const).optional(),
    payment_method: z.enum([
      "CASH",
      "E_WALLET",
      "QRIS",
      "DEBIT_CARD",
      "CREDIT_CARD",
      "BANK_TRANSFER",
    ] as const),
    discounts: z.array(z.string()).optional(),
  });

  static readonly UPDATE: ZodType = z.object({
    order_id: z.string().min(1).max(100).optional(),
    amount: z.number().min(1).max(1000000000).optional(),
    status: z.enum(["PENDING", "COMPLETED", "CANCELED"] as const).optional(),
    payment_method: z
      .enum([
        "CASH",
        "E_WALLET",
        "QRIS",
        "DEBIT_CARD",
        "CREDIT_CARD",
        "BANK_TRANSFER",
      ] as const)
      .optional(),
  });
}
