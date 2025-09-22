import { z, ZodType } from "zod";

export const productOptionValueSchema = z.object({
  label: z.string().min(1, "Label tidak boleh kosong"),
  extra_price: z.number().int().min(0).default(0),
});

export const productOptionSchema = z.object({
  name: z.string().min(1, "Nama option tidak boleh kosong"),
  values: z
    .array(productOptionValueSchema)
    .nonempty("Harus ada minimal 1 value"),
});
export class ProductValidation {
  static readonly CREATE: ZodType = z.object({
    product_name: z.string().min(1).max(100),
    image: z.string().min(1).max(100),
    category: z.string().min(1).max(100),
    description: z.string().min(1).max(255),
    price: z.number().lte(1000000),
    options: z.array(productOptionSchema).optional(),
  });

  static readonly UPDATE: ZodType = z.object({
    product_name: z.string().min(1).max(100).optional(),
    image: z.string().min(1).max(100).optional(),
    category: z.string().min(1).max(100).optional(),
    description: z.string().min(1).max(255).optional(),
    price: z.number().lte(1000000).optional(),
    options: z.array(productOptionSchema).optional(),
  });
}
