import { ProductProductOptionResponse } from "./product-option-model";

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
  options: ProductProductOptionResponse[];
};

export type CreateProductRequest = {
  product_name: string;
  image: string;
  category: string;
  description: string;
  price: number;
};

export type UpdateProductRequest = {
  product_name?: string;
  image?: string;
  category?: string;
  description?: string;
  price?: number;
};
