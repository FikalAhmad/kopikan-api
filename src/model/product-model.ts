import {
  CreateProductOptionRequest,
  CreateProductOptionValueRequest,
  ProductOptionResponse,
} from "./product-option-model";

export type ProductResponse = {
  id: string;
  product_name: string;
  image: string;
  category: string;
  description: string;
  price: number;
};

export type ProductWithOptionResponse = {
  id: string;
  product_name: string;
  image: string;
  category: string;
  description: string;
  price: number;
  options: ProductOptionResponse[];
};

export type CreateProductOption = {
  product_id: string;
  name: string;
  // values:
};

export type CreateProductRequest = {
  product_name: string;
  image: string;
  category: string;
  description: string;
  price: number;
  options: {
    name: string;
    values: {
      label: string;
      extra_price: number;
    }[];
  }[];
};

export interface ProductOptionValue {
  id?: string;
  label: string;
  extra_price?: number;
}

export interface ProductOption {
  id?: string;
  name: string;
  values?: ProductOptionValue[];
}

export interface UpdateProductRequest {
  product_name?: string;
  image?: string;
  category?: string;
  description?: string;
  price?: number;
  options?: ProductOption[];
}
