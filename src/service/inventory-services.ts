import { prismaClient } from "../application/database";
import {
  CreateInventoryRequest,
  InventoryResponse,
  UpdateInventoryRequest,
} from "../model/inventory-models";
import { ApiResponse } from "../types/globals.types";
import { InventoryValidaton } from "../validation/inventory-validation";
import { validate } from "../validation/validation";

export class InventoryService {
  static async get(): Promise<ApiResponse<InventoryResponse[]>> {
    const allInventory = await prismaClient.inventoryTransaction.findMany();

    return { success: true, data: allInventory };
  }

  static async getById(id: string): Promise<ApiResponse<InventoryResponse>> {
    const inventoryById = await prismaClient.inventoryTransaction.findUnique({
      where: { id },
    });

    if (!inventoryById) {
      return { success: false, message: "ID not found" };
    }

    return { success: true, data: inventoryById };
  }

  static async create(
    request: CreateInventoryRequest
  ): Promise<ApiResponse<void>> {
    const inventoryValidation = validate(InventoryValidaton.CREATE, request);

    await prismaClient.inventoryTransaction.create({
      data: inventoryValidation,
    });

    return { success: true, message: "Product Inventory created successfully" };
  }

  static async update(
    id: string,
    request: UpdateInventoryRequest
  ): Promise<ApiResponse<void>> {
    const updateInventoryValidation = validate(
      InventoryValidaton.UPDATE,
      request
    );
    await prismaClient.inventoryTransaction.update({
      where: { id },
      data: updateInventoryValidation,
    });

    return { success: true, message: "Product Inventory updated successfully" };
  }

  static async remove(id: string): Promise<ApiResponse<void>> {
    const deleteInventory = await prismaClient.inventoryTransaction.delete({
      where: { id },
    });

    if (!deleteInventory) {
      return { success: false, message: "Product Inventory not found" };
    }

    return { success: true, message: "Product Inventory deleted successfully" };
  }
}
