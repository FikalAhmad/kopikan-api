import { z, ZodType } from "zod";

export class DiscountValidaton {
  static readonly CREATE: ZodType = z.object({
    code: z.string().min(1).max(100),
    description: z.string().min(1).max(10000),
    type: z.enum(["PERCENTAGE", "FIXED_AMOUNT"] as const),
    value: z.number().lte(1000000),
    min_purchase: z.number().lte(100000).optional(),
    valid_days: z.array(z.string().min(1).max(100)).optional(),
    time_start: z.string().min(1).max(5).optional(),
    time_end: z.string().min(1).max(5).optional(),
    start_date: z.string().datetime().optional(),
    end_date: z.string().datetime().optional(),
    is_active: z.boolean(),
  });

  static readonly UPDATE: ZodType = z.object({
    code: z.string().min(1).max(100).optional(),
    description: z.string().min(1).max(10000).optional(),
    type: z.enum(["PERCENTAGE", "FIXED_AMOUNT"] as const).optional(),
    value: z.number().lte(1000000).optional(),
    min_purchase: z.number().lte(100000).optional(),
    valid_days: z.array(z.string().min(1).max(100)).optional(),
    time_start: z.string().min(1).max(5).optional(),
    time_end: z.string().min(1).max(5).optional(),
    start_date: z.string().datetime().optional(),
    end_date: z.string().datetime().optional(),
    is_active: z.boolean().optional(),
  });
}
