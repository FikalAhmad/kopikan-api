export type InventoryResponse = {
  id: string;
  product_id: string;
  type: string;
  quantity: number;
  reference: string | null;
  createdAt: Date;
};

export type CreateInventoryRequest = {
  product_id: string;
  type: string;
  quantity: number;
  reference?: string;
};

export type UpdateInventoryRequest = {
  type?: string;
  quantity?: number;
  reference?: string;
};
