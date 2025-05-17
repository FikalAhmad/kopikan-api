import { z, ZodType } from "zod";

export class ProductValidaton {
  static readonly CREATE: ZodType = z.object({
    product_name: z.string().min(1).max(100),
    image: z.string().min(1).max(100),
    category: z.string().min(1).max(100),
    description: z.string().min(1).max(255),
    price: z.number().lte(1000000),
    stock: z.number().lte(1000000),
  });

  static readonly UPDATE: ZodType = z.object({
    product_name: z.string().min(1).max(100).optional(),
    image: z.string().min(1).max(100).optional(),
    category: z.string().min(1).max(100).optional(),
    description: z.string().min(1).max(255).optional(),
    price: z.number().lte(1000000).optional(),
    stock: z.number().lte(1000000).optional(),
  });
}
