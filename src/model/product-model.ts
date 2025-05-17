export type ProductResponse = {
  id: string;
  product_name: string;
  image: string;
  category: string;
  description: string;
  price: number;
  stock: number;
};

export type CreateProductRequest = {
  product_name: string;
  image: string;
  category: string;
  description: string;
  price: number;
  stock: number;
};

export type UpdateProductRequest = {
  product_name?: string;
  image?: string;
  category?: string;
  description?: string;
  price?: number;
  stock?: number;
};
