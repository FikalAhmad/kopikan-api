import { Order, OrderDetail, Product } from "@prisma/client";

// Order
export type OrderResponse = Order & {
  order_details: (OrderDetail & {
    product?: Product;
  })[];
};

export type CreateOrderRequest = {
  customer_id: string;
  order_date: Date;
  order_type: string;
  order_source: string;
  delivery_address?: string;
  total: number;
  status: string;
  order_items: {
    product_id: string;
    qty: number;
    unit_price: number;
  }[];
};

export type UpdateOrderRequest = {
  customer_id?: string;
  order_date?: Date;
  order_type?: string;
  order_source?: string;
  delivery_address?: string;
  total?: number;
  status?: string;
};

// Order Detail
export type OrderDetailResponse = {
  id: string;
  order_id: string;
  product_id: string;
  qty: number;
  unit_price: number;
  total_price: number;
};

export type CreateOrderDetailRequest = {
  order_id: string;
  product_id: string;
  qty: number;
  unit_price: number;
  total_price: number;
};

export type UpdateOrderDetailRequest = {
  order_id?: string;
  product_id?: string;
  qty?: number;
  unit_price?: number;
  total_price?: number;
};
