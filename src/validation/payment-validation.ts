import { z, ZodType } from "zod";

export class PaymentValidaton {
  static readonly CREATE: ZodType = z.object({
    order_id: z.string().min(1).max(100),
    // payment_date: z.string().datetime(),
    amount: z.number().min(1).max(1000000000),
    // status: z.string().min(1).max(10),
    payment_method: z.string().min(1).max(100),
    transaction_id: z.string().min(1).max(100).optional(),
  });

  static readonly UPDATE: ZodType = z.object({
    order_id: z.string().min(1).max(100).optional(),
    // payment_date: z.string().datetime().optional(),
    amount: z.number().min(1).max(1000000000).optional(),
    status: z.string().min(1).max(10).optional(),
    payment_method: z.string().min(1).max(100).optional(),
    transaction_id: z.string().min(1).max(100).optional(),
  });
}
