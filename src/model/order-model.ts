import {
  Order,
  OrderDetail,
  OrderDetailOption,
  OrderDiscount,
  OrderSource,
  OrderStatus,
} from "@prisma/client";

// Order
export type OrderResponse = Order & {
  order_details: (OrderDetail & {
    options?: OrderDetailOption[];
  })[];
} & {
  discounts: OrderDiscount[];
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
  discounts: string[];
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
