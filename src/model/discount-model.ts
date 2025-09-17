import { DiscountType } from "@prisma/client";

export type DiscountResponse = {
  id: string;
  code: string;
  description: string;
  type: DiscountType;
  value: number;
  min_purchase: number | null;
  valid_days: string[] | null;
  time_start: string | null;
  time_end: string | null;
  start_date: Date;
  end_date: Date;
  is_active: boolean;
};

// export enum DiscountType {
//   PERCENTAGE = "PERCENTAGE",
//   FIXED_AMOUNT = "FIXED_AMOUNT",
// }

export type CreateDiscountRequest = {
  code: string;
  description: string;
  type: DiscountType;
  value: number;
  min_purchase?: number;
  valid_days?: string[];
  time_start?: string;
  time_end?: string;
  start_date: Date;
  end_date: Date;
  is_active: boolean;
};

export type UpdateDiscountRequest = {
  code?: string;
  description?: string;
  type?: DiscountType;
  value?: number;
  min_purchase?: number;
  valid_days?: string[];
  time_start?: string;
  time_end?: string;
  start_date?: Date;
  end_date?: Date;
  is_active?: boolean;
};
