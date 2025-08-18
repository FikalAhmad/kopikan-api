import { z, ZodType } from "zod";

export class MidtransValidaton {
  static readonly CREATE: ZodType = z.object({
    order_id: z.string().min(1).max(100),
    gross_amount: z.number().min(1).max(1000000000),
    customer_name: z.string().min(1).max(20),
    customer_email: z.string().email({ message: "Invalid email address" }),
  });
}
