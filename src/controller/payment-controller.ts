// import { NextFunction, Request, Response } from "express";
// import {
//   create,
//   get,
//   getById,
//   remove,
//   update,
// } from "../service/payment-service";

// import { CreateOrderRequest, UpdateOrderRequest } from "../model/order-model";

// export const getOrders = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const response = await get();
//     res.status(200).json(response);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getOrderById = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const response = await getById(req.params.id);
//     return res.status(200).json(response);
//   } catch (error) {
//     console.error("Error in getOrderById:", error);
//     next(error);
//   }
// };

// export const getOfflineOrders = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const response = await getOffline();
//     res.status(200).json(response);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getOnlineOrders = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const response = await getOnline();
//     res.status(200).json(response);
//   } catch (error) {
//     next(error);
//   }
// };

// export const createOrder = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const request: CreateOrderRequest = req.body as CreateOrderRequest;
//     const response = await create(request);
//     res.status(200).json(response);
//   } catch (error) {
//     next(error);
//   }
// };

// export const updateOrder = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const request: UpdateOrderRequest = req.body as UpdateOrderRequest;
//     const response = await update(req.params.id, request);
//     res.status(200).json(response);
//   } catch (error) {
//     next(error);
//   }
// };

// export const deleteOrder = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const response = await remove(req.params.id);
//     return res.status(200).json(response);
//   } catch (error) {
//     next(error);
//   }
// };
