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
import { permissionAccess } from "../middleware/with-permission";
import { ConstRole } from "../lib/role";

export const apiRouter = express.Router();
apiRouter.use(authMiddleware);

// User API
apiRouter.get("/api/users", permissionAccess([ConstRole.ID_ADMIN]), UserController.getUsers);
apiRouter.get("/api/users/:id", permissionAccess([ConstRole.ID_ADMIN]), UserController.getUserById);
apiRouter.patch("/api/users/:id", permissionAccess([ConstRole.ID_ADMIN]), UserController.updateUser);
apiRouter.delete("/api/users/:id", permissionAccess([ConstRole.ID_ADMIN]), UserController.deleteUser);

// Role API
apiRouter.post("/api/roles", permissionAccess([ConstRole.ID_ADMIN]), RoleController.createRole);
apiRouter.get("/api/roles", RoleController.getRoles);
apiRouter.patch("/api/roles", permissionAccess([ConstRole.ID_ADMIN]), RoleController.updateRole);
apiRouter.delete("/api/roles", permissionAccess([ConstRole.ID_ADMIN]), RoleController.deleteRole);

// Product API
apiRouter.get("/api/products", ProductController.getProducts);
apiRouter.post("/api/products", permissionAccess([ConstRole.ID_ADMIN]), ProductController.createProduct);
apiRouter.patch("/api/products/:id", permissionAccess([ConstRole.ID_ADMIN]), ProductController.updateProduct);
apiRouter.delete("/api/products/:id", permissionAccess([ConstRole.ID_ADMIN]), ProductController.deleteProduct);

// Product Option API
apiRouter.get("/api/product/options", permissionAccess([ConstRole.ID_ADMIN]), ProductOptionController.getProductOption);
apiRouter.post(
  "/api/product/options",
  permissionAccess([ConstRole.ID_ADMIN]),
  ProductOptionController.createProductOption
);
apiRouter.patch(
  "/api/product/options/:id",
  permissionAccess([ConstRole.ID_ADMIN]),
  ProductOptionController.updateProductOption
);
apiRouter.delete(
  "/api/product/options/:id", permissionAccess([ConstRole.ID_ADMIN]),
  ProductOptionController.deleteProductOption
);

// Product Option Value API
apiRouter.get(
  "/api/product/option/values",
  permissionAccess([ConstRole.ID_ADMIN]),
  ProductOptionValueController.getProductOptionValue
);
apiRouter.post(
  "/api/product/option/values",
  permissionAccess([ConstRole.ID_ADMIN]),
  ProductOptionValueController.createProductOptionValue
);
apiRouter.patch(
  "/api/product/option/values/:id",
  permissionAccess([ConstRole.ID_ADMIN]),
  ProductOptionValueController.updateProductOptionValue
);
apiRouter.delete(
  "/api/product/option/values/:id",
  permissionAccess([ConstRole.ID_ADMIN]),
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
apiRouter.get("/api/orders", permissionAccess([ConstRole.ID_ADMIN]), OrderController.getOrders);
apiRouter.get("/api/orders/:id", permissionAccess([ConstRole.ID_ADMIN]), OrderController.getOrderById);
apiRouter.post("/api/orders", permissionAccess([ConstRole.ID_ADMIN]), OrderController.createOrder);
apiRouter.patch("/api/orders/:id", permissionAccess([ConstRole.ID_ADMIN]), OrderController.updateOrder);
apiRouter.delete("/api/orders/:id", permissionAccess([ConstRole.ID_ADMIN]), OrderController.deleteOrder);

apiRouter.get("/api/offline", permissionAccess([ConstRole.ID_ADMIN]), OrderController.getOfflineOrders);
apiRouter.get("/api/online", permissionAccess([ConstRole.ID_ADMIN]), OrderController.getOnlineOrders);

// Discount API
apiRouter.get("/api/discounts", permissionAccess([ConstRole.ID_ADMIN]), DiscountController.getDiscount);
apiRouter.get("/api/discounts/:id", permissionAccess([ConstRole.ID_ADMIN]), DiscountController.getDiscountbyId);
apiRouter.post("/api/discounts", permissionAccess([ConstRole.ID_ADMIN]), DiscountController.createDiscount);
apiRouter.patch("/api/discounts/:id", permissionAccess([ConstRole.ID_ADMIN]), DiscountController.updateDiscount);
apiRouter.delete("/api/discounts/:id", permissionAccess([ConstRole.ID_ADMIN]), DiscountController.deleteDiscount);

// Payment API
apiRouter.get("/api/payments", permissionAccess([ConstRole.ID_ADMIN]), PaymentController.getPayments);
apiRouter.get("/api/payments/:id", permissionAccess([ConstRole.ID_ADMIN]), PaymentController.getPaymentById);
apiRouter.post("/api/payments", permissionAccess([ConstRole.ID_ADMIN]), PaymentController.createPayment);
apiRouter.patch("/api/payments/:id", permissionAccess([ConstRole.ID_ADMIN]), PaymentController.updatePayment);
apiRouter.delete("/api/payments/:id", permissionAccess([ConstRole.ID_ADMIN]), PaymentController.deletePayment);

// Inventory API
apiRouter.get("/api/inventories", permissionAccess([ConstRole.ID_ADMIN]), InventoryController.getInventory);
apiRouter.get("/api/inventories/:id", permissionAccess([ConstRole.ID_ADMIN]), InventoryController.getInventorybyId);
apiRouter.post("/api/inventories", permissionAccess([ConstRole.ID_ADMIN]), InventoryController.createInventory);
apiRouter.patch("/api/inventories/:id", permissionAccess([ConstRole.ID_ADMIN]), InventoryController.updateInventory);
apiRouter.delete("/api/inventories/:id", permissionAccess([ConstRole.ID_ADMIN]), InventoryController.deleteInventory);

// Filter Product API
apiRouter.post(
  "/api/products/filter/",
  permissionAccess([ConstRole.ID_ADMIN]),
  DashboardController.getProductSalesPeriod
);

// Midtrans
apiRouter.post(
  "/api/payments/ewallet",
  permissionAccess([ConstRole.ID_ADMIN]),
  MidtransController.createEwalletPayment
);
apiRouter.get(
  "/api/payments/status/:orderId",
  permissionAccess([ConstRole.ID_ADMIN]),
  MidtransController.checkStatusOrder
);

// Dashboard Management
apiRouter.get(
  "/api/dashboard/total-summary",
  permissionAccess([ConstRole.ID_ADMIN]),
  DashboardController.getTotalDashboardSummary
);
apiRouter.get(
  "/api/dashboard/order-summary",
  permissionAccess([ConstRole.ID_ADMIN]),
  DashboardController.getOrderSummary
);

// Transaction API
// apiRouter.post("/api/transaction", CreateOrderTransaction);
// apiRouter.post("/api/transaction/confirm", ConfirmPaymentTransaction);
// apiRouter.post("/api/transaction/cancel", CancelOrderTransaction);
