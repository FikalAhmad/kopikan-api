import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import {
  CreateOrderRequest,
  OrderResponse,
  UpdateOrderRequest,
} from "../model/order-model";
import { MessageResponse } from "../types/globals.types";
import { OrderValidaton } from "../validation/order-validation";
import { validate } from "../validation/validation";

interface AfterOrderResponse {
  msg: string;
  data: {
    id: string;
    customer_id: string;
    order_date: Date;
    order_type: string;
    order_source: string;
    delivery_address: string | null;
    total: number;
    status: string;
    createdAt: Date;
  } | null;
}

export const create = async (
  request: CreateOrderRequest
): Promise<AfterOrderResponse> => {
  const createOrderRequest = validate(OrderValidaton.CREATE, request);

  const {
    customer_id,
    order_type,
    order_source,
    delivery_address,
    order_items,
  } = createOrderRequest;

  // Validasi input
  if (!customer_id || !order_type || !order_source || !order_items.length) {
    return { msg: "Data tidak lengkap", data: null };
  }

  // 🔍 Ambil harga produk dari database untuk mencegah manipulasi harga
  const productIds = order_items.map((item) => item.product_id);
  const products = await prismaClient.product.findMany({
    where: { id: { in: productIds } },
  });

  // Hitung total harga berdasarkan harga dari database
  let totalPrice = 0;
  const orderDetails = order_items.map((item) => {
    const product = products.find((p) => p.id === item.product_id);
    if (!product) {
      throw new Error(`Produk dengan ID ${item.product_id} tidak ditemukan`);
    }

    const total_price = item.qty * product.price; // Harga dihitung di BE
    totalPrice += total_price;

    return {
      product_id: item.product_id,
      qty: item.qty,
      unit_price: product.price, // Gunakan harga dari DB
      total_price,
    };
  });

  const order = await prismaClient.order.create({
    data: {
      customer_id,
      order_type,
      order_source,
      delivery_address: order_type === "delivery" ? delivery_address : null,
      total: totalPrice,
      order_details: {
        create: orderDetails,
      },
    },
    include: { order_details: true },
  });

  return {
    msg: "Order added successfully",
    data: order,
  };
};

export const get = async (): Promise<OrderResponse[]> => {
  const order = await prismaClient.order.findMany({
    include: {
      order_details: {
        include: {
          product: true,
        },
      },
    },
  });
  return order;
};

export const getById = async (id: string): Promise<OrderResponse> => {
  const orderById = await prismaClient.order.findUnique({
    where: { id },
    include: {
      order_details: {
        include: {
          product: true,
        },
      },
    },
  });
  if (!orderById) {
    throw new ResponseError(404, "Order not found");
  }
  return orderById;
};

export const getOffline = async (): Promise<OrderResponse[]> => {
  const offlineOrder = await prismaClient.order.findMany({
    where: {
      order_source: "offline",
    },
    include: {
      order_details: {
        include: {
          product: true,
        },
      },
    },
  });
  return offlineOrder;
};

export const getOnline = async (): Promise<OrderResponse[]> => {
  const onlineOrder = await prismaClient.order.findMany({
    where: {
      order_source: "online",
    },
    include: {
      order_details: {
        include: {
          product: true,
        },
      },
    },
  });
  return onlineOrder;
};

export const update = async (
  id: string,
  request: UpdateOrderRequest
): Promise<MessageResponse> => {
  const updateOrderRequest = validate(OrderValidaton.UPDATE, request);
  await prismaClient.order.update({
    where: {
      id,
    },
    data: updateOrderRequest,
  });

  return { msg: "Order updated successfully" };
};

export const remove = async (id: string): Promise<MessageResponse> => {
  const removeOrder = await prismaClient.order.delete({
    where: { id },
  });

  if (removeOrder) {
    await prismaClient.orderDetail.deleteMany({
      where: { order_id: id },
    });
  } else {
    throw new ResponseError(404, "Order ID is not found");
  }
  return { msg: "Order deleted successfully" };
};
