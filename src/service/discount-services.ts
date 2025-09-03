import { prismaClient } from "../application/database";
import {
  CreateDiscountRequest,
  DiscountResponse,
  UpdateDiscountRequest,
} from "../model/discount-model";
import { DiscountValidaton } from "../validation/discount-validation";
import { validate } from "../validation/validation";

export const get = async (): Promise<DiscountResponse[]> => {
  const allDiscount = await prismaClient.discount.findMany();
  return allDiscount;
};

export const getById = async (id: string): Promise<DiscountResponse | null> => {
  const discountById = await prismaClient.discount.findUnique({
    where: { id },
  });
  return discountById;
};

export const create = async (request: CreateDiscountRequest) => {
  const createDiscountValidation = validate(DiscountValidaton.CREATE, request);

  await prismaClient.discount.create({
    data: createDiscountValidation,
  });

  return {
    msg: "Discount created successfully",
  };
};

export const update = async (id: string, request: UpdateDiscountRequest) => {
  const updateDiscountValidation = validate(DiscountValidaton.UPDATE, request);

  await prismaClient.discount.update({
    where: { id },
    data: updateDiscountValidation,
  });

  return {
    msg: "Discount updated successfully",
  };
};

export const remove = async (id: string) => {
  await prismaClient.discount.delete({
    where: { id },
  });
  return { msg: "Discount deleted successfully" };
};
