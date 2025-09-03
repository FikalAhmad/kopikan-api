import { z, ZodType } from "zod";

export class InventoryValidaton {
  static readonly CREATE: ZodType = z.object({
    product_id: z.string().min(1).max(100),
    type: z.string().min(1).max(5),
    quantity: z.number().lte(10000),
    reference: z.string().min(1).max(100).optional(),
  });

  static readonly UPDATE: ZodType = z.object({
    product_id: z.string().min(1).max(100).optional(),
    type: z.string().min(1).max(5).optional(),
    quantity: z.number().lte(10000).optional(),
    reference: z.string().min(1).max(100).optional(),
  });
}
