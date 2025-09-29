import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import {
  CreateOrderRequest,
  OrderResponse,
  OrderTypeResponse,
  UpdateOrderRequest,
} from "../model/order-model";
import { ApiResponse } from "../types/globals.types";
import { OrderValidaton } from "../validation/order-validation";
import { validate } from "../validation/validation";

export class OrderService {
  static async create(
    request: CreateOrderRequest
  ): Promise<ApiResponse<OrderResponse>> {
    // const createOrderRequest = validate(OrderValidaton.CREATE, request);

    const { customer_id, order_source, delivery_address, order_items } =
      request;

    const result = await prismaClient.$transaction(async (tx) => {
      let subtotal = 0;

      const orderDetailsData = [];

      for (const item of order_items) {
        // Ambil produk
        const product = await tx.product.findUnique({
          where: { id: item.product_id },
        });
        if (!product) throw new Error("Product not found");

        // Ambil opsi yang dipilih
        const optionValueIds = item.options.map((opt) => opt.values.id);
        const optionValues = await tx.productOptionValue.findMany({
          where: { id: { in: optionValueIds || [] } },
        });

        // Hitung extra price total dari semua option
        const extraPrice = optionValues.reduce(
          (sum, opt) => sum + opt.extra_price,
          0
        );

        // Final harga unit = base product price + total extra price
        const finalUnitPrice = product.price + extraPrice;

        // Hitung total untuk qty
        const totalPrice = finalUnitPrice * item.qty;

        subtotal += totalPrice;

        // Simpan untuk insert ke prisma
        orderDetailsData.push({
          qty: item.qty,
          unit_price: finalUnitPrice,
          total_price: totalPrice,
          product: {
            connect: { id: product.id },
          },
          options: {
            create: item.options.map((opt) => ({
              optionValue: {
                connect: { id: opt.values.id },
              },
            })),
          },
        });
      }

      const order = await tx.order.create({
        data: {
          customer_id,
          order_source,
          delivery_address,
          total: subtotal,
          order_details: {
            create: orderDetailsData,
          },
        },
        include: {
          order_details: { include: { options: true } },
        },
      });

      return order;
    });

    return {
      success: true,
      message: "Order added successfully",
      data: result,
    };
  }

  static async get(): Promise<ApiResponse<OrderResponse[]>> {
    const order = await prismaClient.order.findMany({
      include: {
        order_details: {
          include: {
            product: true,
            options: true,
          },
        },
      },
    });
    return { success: true, data: order };
  }

  static async getById(id: string): Promise<ApiResponse<OrderResponse>> {
    const orderById = await prismaClient.order.findUnique({
      where: { id },
      include: {
        order_details: {
          include: {
            product: true,
            options: true,
          },
        },
      },
    });
    if (!orderById) {
      throw new ResponseError(404, "Order not found");
    }
    return { success: true, data: orderById };
  }

  static async getOffline(): Promise<ApiResponse<OrderTypeResponse[]>> {
    const offlineOrder = await prismaClient.order.findMany({
      where: {
        order_source: "OFFLINE",
      },
      include: {
        order_details: {
          include: {
            product: true,
            options: {
              include: { optionValue: { include: { option: true } } },
            },
          },
        },
      },
    });
    return { success: true, data: offlineOrder };
  }

  static async getOnline(): Promise<ApiResponse<OrderTypeResponse[]>> {
    const onlineOrder = await prismaClient.order.findMany({
      where: {
        order_source: "ONLINE",
      },
      include: {
        order_details: {
          include: {
            product: true,
            options: {
              include: { optionValue: { include: { option: true } } },
            },
          },
        },
      },
    });
    return { success: true, data: onlineOrder };
  }

  static async update(
    id: string,
    request: UpdateOrderRequest
  ): Promise<ApiResponse<void>> {
    const updateOrderRequest = validate(OrderValidaton.UPDATE, request);
    await prismaClient.order.update({
      where: {
        id,
      },
      data: updateOrderRequest,
    });

    return { success: true, message: "Order updated successfully" };
  }

  static async remove(id: string): Promise<ApiResponse<void>> {
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
    return { success: true, message: "Order deleted successfully" };
  }
}
