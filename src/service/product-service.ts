import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import {
  CreateProductRequest,
  ProductOptionValue,
  ProductResponse,
  ProductWithOptionResponse,
  UpdateProductRequest,
} from "../model/product-model";
import { ApiResponse } from "../types/globals.types";
import { ProductValidation } from "../validation/product-validation";
import { validate } from "../validation/validation";

export class ProductService {
  static async create(
    request: CreateProductRequest
  ): Promise<ApiResponse<ProductWithOptionResponse>> {
    const createProductRequest = validate(ProductValidation.CREATE, request);
    const { product_name, image, category, description, price, options } =
      createProductRequest;
    const newProduct = await prismaClient.product.create({
      data: {
        product_name,
        image,
        category,
        description,
        price,
        options: {
          create: options.map((option: any) => ({
            name: option.name,
            values: {
              create: option.values.map((value: any) => ({
                label: value.label,
                extra_price: value.extra_price ?? 0,
              })),
            },
          })),
        },
      },
      include: { options: { include: { values: true } } },
    });

    return {
      success: true,
      data: newProduct,
    };
  }

  static async get(): Promise<ApiResponse<ProductWithOptionResponse[]>> {
    const product = await prismaClient.product.findMany({
      include: {
        options: {
          include: {
            values: true,
          },
        },
      },
    });
    return {
      success: true,
      data: product,
    };
  }

  static async update(
    id: string,
    request: UpdateProductRequest
  ): Promise<ApiResponse<ProductWithOptionResponse>> {
    // ?Check ID Exist or not?
    const existingProduct = await prismaClient.product.findUnique({
      where: { id },
      include: { options: { include: { values: true } } },
    });

    if (!existingProduct) {
      throw new ResponseError(404, "Product not found");
    }

    //* Validation data request
    const updateProductRequest = validate(ProductValidation.UPDATE, request);
    const { product_name, image, category, description, price, options } =
      updateProductRequest;

    //* Update product with transaction
    const updatedProduct = await prismaClient.$transaction(async (tx) => {
      //* Update basic product fields
      const updateData: any = {};
      if (product_name !== undefined) updateData.product_name = product_name;
      if (image !== undefined) updateData.image = image;
      if (category !== undefined) updateData.category = category;
      if (description !== undefined) updateData.description = description;
      if (price !== undefined) updateData.price = price;

      if (Object.keys(updateData).length > 0) {
        await tx.product.update({
          where: { id },
          data: updateData,
        });
      }

      //* Handle options with selective update
      if (options !== undefined) {
        const existingOptionIds = existingProduct.options.map((opt) => opt.id);
        const requestOptionIds = options
          .filter((opt) => opt.id)
          .map((opt) => opt.id);

        //* Delete options that are not in the request
        const optionsToDelete = existingOptionIds.filter(
          (optId) => !requestOptionIds.includes(optId)
        );

        if (optionsToDelete.length > 0) {
          await tx.productOptionValue.deleteMany({
            where: { option_id: { in: optionsToDelete } },
          });
          await tx.productOption.deleteMany({
            where: { id: { in: optionsToDelete } },
          });
        }

        //* Process each option
        for (const option of options) {
          if (option.id) {
            //* Update existing option
            await tx.productOption.update({
              where: { id: option.id },
              data: { name: option.name },
            });

            //* Handle values
            if (option.values !== undefined) {
              const existingOption = existingProduct.options.find(
                (opt) => opt.id === option.id
              );
              if (existingOption) {
                const existingValueIds = existingOption.values.map(
                  (val) => val.id
                );
                const requestValueIds = option.values
                  .filter((val) => val.id)
                  .map((val) => val.id);

                //* Delete values yang tidak ada di request
                const valuesToDelete = existingValueIds.filter(
                  (valId) => !requestValueIds.includes(valId)
                );

                if (valuesToDelete.length > 0) {
                  await tx.productOptionValue.deleteMany({
                    where: { id: { in: valuesToDelete } },
                  });
                }

                //* Process each value
                for (const value of option.values) {
                  if (value.id) {
                    // Update existing value
                    await tx.productOptionValue.update({
                      where: { id: value.id },
                      data: {
                        label: value.label,
                        extra_price: value.extra_price || 0,
                      },
                    });
                  } else {
                    //* Create new value
                    await tx.productOptionValue.create({
                      data: {
                        option_id: option.id,
                        label: value.label,
                        extra_price: value.extra_price || 0,
                      },
                    });
                  }
                }
              }
            }
          } else {
            //* Create new option
            const createdOption = await tx.productOption.create({
              data: {
                product_id: id,
                name: option.name,
              },
            });

            if (option.values && option.values.length > 0) {
              const valuesToCreate = option.values.map((value) => ({
                option_id: createdOption.id,
                label: value.label,
                extra_price: value.extra_price || 0,
              }));

              await tx.productOptionValue.createMany({
                data: valuesToCreate,
              });
            }
          }
        }
      }

      return await tx.product.findUnique({
        where: { id },
        include: { options: { include: { values: true } } },
      });
    });

    return {
      success: true,
      data: updatedProduct!,
    };
  }

  static async remove(id: string): Promise<ApiResponse<void>> {
    const removeProduct = await prismaClient.product.delete({
      where: { id },
    });

    if (!removeProduct) {
      throw new ResponseError(404, "Product ID is not found");
    }
    return { success: true, message: "Deleted product successfully" };
  }
}
