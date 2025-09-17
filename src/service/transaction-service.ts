// import { prismaClient } from "../application/database";
// import {
//   AfterOrderResponse,
//   CreateOrderTransactionRequest,
// } from "../model/transaction-model";

// export const create = async (
//   request: CreateOrderTransactionRequest
// ): Promise<AfterOrderResponse> => {
//   return await prismaClient.$transaction(async (tx) => {
//     const {
//       customer_id,
//       order_type,
//       order_source,
//       delivery_address,
//       order_items,
//       payment_method,
//     } = request;

//     if (!customer_id || !order_type || !order_source || !order_items.length) {
//       return { msg: "Data tidak lengkap", data: null };
//     }

//     let totalPrice = 0;
//     for (const item of order_items) {
//       const updated = await tx.product.updateMany({
//         where: {
//           id: item.product_id,
//           stock: { gte: item.qty },
//         },
//         data: {
//           stock: { decrement: item.qty },
//         },
//       });

//       if (updated.count === 0) {
//         throw new Error(`Stok tidak cukup untuk produk ${item.product_id}`);
//       }
//       const product = await tx.product.findUnique({
//         where: { id: item.product_id },
//         select: { price: true },
//       });

//       if (!product) throw new Error("Produk tidak ditemukan");

//       totalPrice += product.price * item.qty;
//     }

//     const order = await tx.order.create({
//       data: {
//         customer_id: customer_id,
//         order_type,
//         order_source,
//         delivery_address,
//         total: totalPrice,
//         status: "pending",
//       },
//     });

//     await tx.orderDetail.createMany({
//       data: await Promise.all(
//         order_items.map(async (item: { product_id: string; qty: number }) => {
//           const product = await tx.product.findUnique({
//             where: { id: item.product_id },
//             select: { price: true },
//           });

//           return {
//             order_id: order.id,
//             product_id: item.product_id,
//             qty: item.qty,
//             unit_price: product?.price || 0,
//             total_price: (product?.price || 0) * item.qty,
//           };
//         })
//       ),
//     });

//     await tx.payment.create({
//       data: {
//         order_id: order.id,
//         amount: totalPrice,
//         status: "pending",
//         payment_method,
//       },
//     });

//     return {
//       msg: "Order added successfully",
//       data: order,
//     };
//   });
// };

// export const confirm = async (orderId: string, success: boolean) => {
//   return await prismaClient.$transaction(async (tx) => {
//     if (success) {
//       await tx.payment.updateMany({
//         where: { order_id: orderId },
//         data: { status: "paid" },
//       });

//       await tx.order.update({
//         where: { id: orderId },
//         data: { status: "paid" },
//       });

//       return { msg: "Payment berhasil" };
//     } else {
//       await tx.payment.updateMany({
//         where: { order_id: orderId },
//         data: { status: "failed" },
//       });

//       await tx.order.update({
//         where: { id: orderId },
//         data: { status: "failed" },
//       });

//       return { msg: "Payment gagal" };
//     }
//   });
// };

// export const cancel = async (orderId: string) => {
//   return await prismaClient.$transaction(async (tx) => {
//     const details = await tx.orderDetail.findMany({
//       where: { order_id: orderId },
//     });

//     for (const d of details) {
//       await tx.product.update({
//         where: { id: d.product_id },
//         data: { stock: { increment: d.qty } },
//       });
//     }

//     await tx.order.update({
//       where: { id: orderId },
//       data: { status: "cancelled" },
//     });

//     await tx.payment.updateMany({
//       where: { order_id: orderId },
//       data: { status: "failed" },
//     });

//     return { msg: "Order dibatalkan & stok dikembalikan" };
//   });
// };
