import { prismaClient } from "../application/database";
import {
  CreateInventoryRequest,
  InventoryResponse,
} from "../model/inventory-models";
import { InventoryValidaton } from "../validation/inventory-validation";
import { validate } from "../validation/validation";

export const get = async (): Promise<InventoryResponse[]> => {
  const allInventory = await prismaClient.inventoryTransaction.findMany();

  return allInventory;
};

export const getById = async (
  id: string
): Promise<InventoryResponse | null> => {
  const allInventory = await prismaClient.inventoryTransaction.findUnique({
    where: { id },
  });

  return allInventory;
};

export const create = async (request: CreateInventoryRequest) => {
  const inventoryValidation = validate(InventoryValidaton.CREATE, request);

  await prismaClient.inventoryTransaction.create({
    data: inventoryValidation,
  });

  return { msg: "Product Inventory created successfully" };
};
