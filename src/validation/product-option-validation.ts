import { z, ZodType } from "zod";

export class ProductOptionValidation {
  static readonly CREATE: ZodType = z.object({
    name: z.string().min(1).max(50),
  });

  static readonly UPDATE: ZodType = z.object({
    name: z.string().min(1).max(50),
  });
}

export class ProductOptionValueValidation {
  static readonly CREATE: ZodType = z.object({
    option_id: z.string().min(1).max(100),
    label: z.string().min(1).max(50),
    extra_price: z.number().lte(50000),
  });

  static readonly UPDATE: ZodType = z.object({
    extra_price: z.number().lte(50000),
  });
}

export class ProductProductOptionValidation {
  static readonly CREATE: ZodType = z.object({
    product_id: z.string().min(1).max(100),
    option_id: z.string().min(1).max(100),
  });
}
