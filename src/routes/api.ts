import express from "express";
import {
  deleteUser,
  getUsers,
  getUserById,
  Logout,
  updateUser,
} from "../controller/user-controller";
import { authMiddleware } from "../middleware/auth-middleware";
import {
  deleteRole,
  getRoles,
  updateRole,
} from "../controller/role-controller";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../controller/product-controller";
import {
  createOrder,
  deleteOrder,
  getOfflineOrders,
  getOnlineOrders,
  getOrderById,
  getOrders,
  updateOrder,
} from "../controller/order-controller";
import {
  createPayment,
  deletePayment,
  getPaymentById,
  getPayments,
  updatePayment,
} from "../controller/payment-controller";
import {
  getOrderSummary,
  getProductSalesPeriod,
  getTotalDashboardSummary,
} from "../controller/dashboard-controller";
import { createEwalletPayment } from "../controller/midtrans-controller";
import { totalDashboardSummary } from "../service/dashboard-services";

export const apiRouter = express.Router();
apiRouter.use(authMiddleware);

// User API
apiRouter.get("/api/users", getUsers);
apiRouter.get("/api/users/:id", getUserById);
apiRouter.patch("/api/users/:id", updateUser);
apiRouter.delete("/api/users/:id", deleteUser);
apiRouter.patch("/api/logout", Logout);

// Role API
apiRouter.get("/api/roles", getRoles);
apiRouter.patch("/api/roles", updateRole);
apiRouter.delete("/api/roles", deleteRole);

// Product API
apiRouter.get("/api/products", getProducts);
apiRouter.post("/api/products", createProduct);
apiRouter.patch("/api/products/:id", updateProduct);
apiRouter.delete("/api/products/:id", deleteProduct);

// Order API
apiRouter.get("/api/orders", getOrders);
apiRouter.get("/api/orders/:id", getOrderById);
apiRouter.post("/api/orders", createOrder);
apiRouter.patch("/api/orders/:id", updateOrder);
apiRouter.delete("/api/orders/:id", deleteOrder);

apiRouter.get("/api/offline", getOfflineOrders);
apiRouter.get("/api/online", getOnlineOrders);

// Payment API
apiRouter.get("/api/payments", getPayments);
apiRouter.get("/api/payments/:id", getPaymentById);
apiRouter.post("/api/payments", createPayment);
apiRouter.patch("/api/payments/:id", updatePayment);
apiRouter.delete("/api/payments/:id", deletePayment);

// Filter Product API
apiRouter.post("/api/products/filter/", getProductSalesPeriod);

// Dashboard Management
apiRouter.post("/api/payments/ewallet", createEwalletPayment);

apiRouter.get("/api/dashboard/total-summary", getTotalDashboardSummary);
apiRouter.get("/api/dashboard/order-summary", getOrderSummary);
