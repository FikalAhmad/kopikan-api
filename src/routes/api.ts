import express from "express";
import { UserController } from "../controller/user-controller";
import { authMiddleware } from "../middleware/auth-middleware";
import { RoleController } from "../controller/role-controller";
import { ProductController } from "../controller/product-controller";
import { OrderController } from "../controller/order-controller";
import { PaymentController } from "../controller/payment-controller";
import { DashboardController } from "../controller/dashboard-controller";
import { MidtransController } from "../controller/midtrans-controller";
// import {
//   CancelOrderTransaction,
//   ConfirmPaymentTransaction,
//   CreateOrderTransaction,
// } from "../controller/transaction-controller";
import { DiscountController } from "../controller/discount-controller";
import { InventoryController } from "../controller/inventory-controller";
import {
  ProductOptionController,
  ProductOptionValueController,
  // ProductProductOptionController,
} from "../controller/product-option-controller";

export const apiRouter = express.Router();
apiRouter.use(authMiddleware);

// User API
apiRouter.get("/api/users", UserController.getUsers);
apiRouter.get("/api/users/:id", UserController.getUserById);
apiRouter.patch("/api/users/:id", UserController.updateUser);
apiRouter.delete("/api/users/:id", UserController.deleteUser);

// Role API
apiRouter.post("/api/roles", RoleController.createRole);
apiRouter.get("/api/roles", RoleController.getRoles);
apiRouter.patch("/api/roles", RoleController.updateRole);
apiRouter.delete("/api/roles", RoleController.deleteRole);

// Product API
apiRouter.get("/api/products", ProductController.getProducts);
apiRouter.post("/api/products", ProductController.createProduct);
apiRouter.patch("/api/products/:id", ProductController.updateProduct);
apiRouter.delete("/api/products/:id", ProductController.deleteProduct);

// Product Option API
apiRouter.get("/api/product/options", ProductOptionController.getProductOption);
apiRouter.post(
  "/api/product/options",
  ProductOptionController.createProductOption
);
apiRouter.patch(
  "/api/product/options/:id",
  ProductOptionController.updateProductOption
);
apiRouter.delete(
  "/api/product/options/:id",
  ProductOptionController.deleteProductOption
);

// Product Option Value API
apiRouter.get(
  "/api/product/option/values",
  ProductOptionValueController.getProductOptionValue
);
apiRouter.post(
  "/api/product/option/values",
  ProductOptionValueController.createProductOptionValue
);
apiRouter.patch(
  "/api/product/option/values/:id",
  ProductOptionValueController.updateProductOptionValue
);
apiRouter.delete(
  "/api/product/option/values/:id",
  ProductOptionValueController.deleteProductOptionValue
);

// ProductProductOption API
// apiRouter.get(
//   "/api/product/product/options",
//   ProductProductOptionController.getProductProductOption
// );
// apiRouter.post(
//   "/api/product/product/options",
//   ProductProductOptionController.createProductProductOption
// );

// Order API
apiRouter.get("/api/orders", OrderController.getOrders);
apiRouter.get("/api/orders/:id", OrderController.getOrderById);
apiRouter.post("/api/orders", OrderController.createOrder);
apiRouter.patch("/api/orders/:id", OrderController.updateOrder);
apiRouter.delete("/api/orders/:id", OrderController.deleteOrder);

apiRouter.get("/api/offline", OrderController.getOfflineOrders);
apiRouter.get("/api/online", OrderController.getOnlineOrders);

// Discount API
apiRouter.get("/api/discounts", DiscountController.getDiscount);
apiRouter.get("/api/discounts/:id", DiscountController.getDiscountbyId);
apiRouter.post("/api/discounts", DiscountController.createDiscount);
apiRouter.patch("/api/discounts/:id", DiscountController.updateDiscount);
apiRouter.delete("/api/discounts/:id", DiscountController.deleteDiscount);

// Payment API
apiRouter.get("/api/payments", PaymentController.getPayments);
apiRouter.get("/api/payments/:id", PaymentController.getPaymentById);
apiRouter.post("/api/payments", PaymentController.createPayment);
apiRouter.patch("/api/payments/:id", PaymentController.updatePayment);
apiRouter.delete("/api/payments/:id", PaymentController.deletePayment);

// Inventory API
apiRouter.get("/api/inventories", InventoryController.getInventory);
apiRouter.get("/api/inventories/:id", InventoryController.getInventorybyId);
apiRouter.post("/api/inventories", InventoryController.createInventory);
apiRouter.patch("/api/inventories/:id", InventoryController.updateInventory);
apiRouter.delete("/api/inventories/:id", InventoryController.deleteInventory);

// Filter Product API
apiRouter.post(
  "/api/products/filter/",
  DashboardController.getProductSalesPeriod
);

// Midtrans
apiRouter.post(
  "/api/payments/ewallet",
  MidtransController.createEwalletPayment
);
apiRouter.get(
  "/api/payments/status/:order_id",
  MidtransController.checkStatusOrder
);

// Dashboard Management
apiRouter.get(
  "/api/dashboard/total-summary",
  DashboardController.getTotalDashboardSummary
);
apiRouter.get(
  "/api/dashboard/order-summary",
  DashboardController.getOrderSummary
);

// Transaction API
// apiRouter.post("/api/transaction", CreateOrderTransaction);
// apiRouter.post("/api/transaction/confirm", ConfirmPaymentTransaction);
// apiRouter.post("/api/transaction/cancel", CancelOrderTransaction);
