// TODO====================Response====================
export interface ProductOptionValueResponse {
  id: string;
  option_id: string;
  label: string;
  extra_price: number;
  createdAt: Date;
}

export interface ProductOptionResponse {
  id: string;
  name: string;
  createdAt: Date;
  values: ProductOptionValueResponse[];
}

// TODO====================Create====================
export type CreateProductOptionValueRequest = {
  option_id: string;
  label: string;
  extra_price: number;
};

export type CreateProductOptionRequest = {
  product_id: string;
  name: string;
};

// TODO====================Update====================
export type UpdateProductOptionValueRequest = {
  label?: string;
  extra_price?: number;
};

export type UpdateProductOptionRequest = {
  name: string;
};
