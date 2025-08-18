import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import {
  CreateProductRequest,
  ProductResponse,
  UpdateProductRequest,
} from "../model/product-model";
import { MessageResponse } from "../types/globals.types";
import { ProductValidaton } from "../validation/product-validation";
import { validate } from "../validation/validation";

export const create = async (
  request: CreateProductRequest
): Promise<MessageResponse> => {
  const createProductRequest = validate(ProductValidaton.CREATE, request);

  const checkProducteExist = await prismaClient.product.count({
    where: {
      product_name: request.product_name,
    },
  });

  if (checkProducteExist !== 0) {
    throw new ResponseError(400, "Product already exists");
  }

  await prismaClient.product.create({
    data: createProductRequest,
  });

  return {
    msg: "Add product successfully",
  };
};

export const get = async (): Promise<ProductResponse[]> => {
  const product = await prismaClient.product.findMany({
    include: {
      order_details: true
    }
  });
  return product;
};

export const update = async (
  id: string,
  request: UpdateProductRequest
): Promise<MessageResponse> => {
  const updateProductRequest = validate(ProductValidaton.UPDATE, request);

  await prismaClient.product.update({
    where: {
      id,
    },
    data: updateProductRequest,
  });

  return { msg: "Updated product successfully" };
};

export const remove = async (id: string): Promise<MessageResponse> => {
  const removeProduct = await prismaClient.product.delete({
    where: { id },
  });

  if (!removeProduct) {
    throw new ResponseError(404, "Product ID is not found");
  }
  return { msg: "Deleted product successfully" };
};
