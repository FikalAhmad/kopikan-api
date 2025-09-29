import {
  Order,
  OrderDetail,
  OrderDetailOption,
  OrderSource,
  OrderStatus,
  Product,
} from "@prisma/client";

// Order
export type OrderResponse = Order & {
  order_details: (OrderDetail & {
    options?: OrderDetailOption[];
  })[];
};

export type OrderTypeResponse = Order & {
  order_details: (OrderDetail & {
    product: Product;
    options: {
      optionValue: {
        id: string;
        createdAt: Date;
        option_id: string;
        label: string;
        extra_price: number;
        option: {
          id: string;
          createdAt: Date;
          product_id: string;
          name: string;
        };
      };
    }[];
  })[];
};

export type CreateOrderRequest = {
  customer_id: string;
  order_source: OrderSource;
  delivery_address?: string;
  order_items: {
    product_id: string;
    qty: number;
    options: {
      id: string;
      name: string;
      values: {
        id: string;
        label: string;
        extra_price: number;
      };
    }[];
  }[];
};

export type UpdateOrderRequest = {
  status?: OrderStatus;
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
