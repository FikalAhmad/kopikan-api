import { StockMovementType } from "@prisma/client";

export type InventoryResponse = {
  id: string;
  product_id: string;
  type: StockMovementType;
  current_stock: number;
  reference: string | null;
  createdAt: Date;
};

export type CreateInventoryRequest = {
  product_id: string;
  type: StockMovementType;
  current_stock: number;
  reference?: string;
};

export type UpdateInventoryRequest = {
  type?: StockMovementType;
  current_stock?: number;
  reference?: string;
};
