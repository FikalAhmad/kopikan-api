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

export interface ProductProductOptionResponse {
  id: string;
  product_id: string;
  option_id: string;
  createdAt: Date;
  option: ProductOptionResponse;
}

// TODO====================Create====================
export type CreateProductOptionValueRequest = {
  option_id: string;
  label: string;
  extra_price: number;
};

export type CreateProductOptionRequest = {
  name: string;
};

export type CreateProductProductOptionRequest = {
  product_id: string;
  option_id: string;
};

// TODO====================Update====================
export type UpdateProductOptionValueRequest = {
  label?: string;
  extra_price?: number;
};

export type UpdateProductOptionRequest = {
  name: string;
};

export type UpdateProductProductOptionRequest = {};
