import { z, ZodType } from "zod";

// ORDER
export class OrderValidaton {
  static readonly CREATE: ZodType = z.object({
    customer_id: z.string().min(1).max(100),
    order_source: z.enum(["OFFLINE", "ONLINE"] as const),
    delivery_address: z.string().min(1).max(100).optional(),
    order_items: z
      .array(
        z.object({
          product_id: z.string().min(1, "Product ID tidak boleh kosong"),
          qty: z.number().min(1, "Jumlah harus minimal 1"),
          options: z.array(z.string().min(1).max(100)),
        })
      )
      .min(1, "Harus ada minimal 1 produk dalam order"),
    discounts: z.array(z.string().min(1).max(100)),
  });

  static readonly UPDATE: ZodType = z.object({
    status: z.enum(["PENDING", "COMPLETED", "CANCELLED"] as const).optional(),
  });
}
// ORDER DETAIL
export class OrderDetailValidaton {
  static readonly CREATE: ZodType = z.object({
    order_id: z.string().min(1).max(100),
    product_id: z.string().min(1).max(100),
    qty: z.number().gte(1).lte(500),
    unit_price: z.number().lte(1000000),
    total_price: z.number().gte(1000000000),
  });

  static readonly UPDATE: ZodType = z.object({
    order_id: z.string().min(1).max(100).optional(),
    product_id: z.string().min(1).max(100).optional(),
    qty: z.number().gte(1).lte(500).optional(),
    unit_price: z.number().lte(1000000).optional(),
    total_price: z.number().gte(1000000000).optional(),
  });
}
