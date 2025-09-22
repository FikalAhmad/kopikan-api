import { prismaClient } from "../application/database";
import { ApiResponse } from "../types/globals.types";

const getDateFilter = (period: string) => {
  const now = new Date();
  if (period === "7d") {
    now.setDate(now.getDate() - 7);
  } else if (period === "1m") {
    now.setMonth(now.getMonth() - 1);
  } else if (period === "1y") {
    now.setFullYear(now.getFullYear() - 1);
  }
  return now;
};

type ProductSalesProps = {
  name: string;
  category: string;
  sellingProduct: number;
};

export class DashboardService {
  static async getProductSales(request: {
    period: string;
  }): Promise<ApiResponse<any>> {
    const { period } = request;
    const dateFilter = getDateFilter(period);

    const data = await prismaClient.orderDetail.findMany({
      where: {
        createdAt: {
          gte: dateFilter,
        },
        order: {
          payment: {
            status: "COMPLETED",
          },
        },
      },
      include: {
        product: {
          select: {
            product_name: true,
            category: true,
          },
        },
      },
    });

    // Map data awal menjadi { name, category, sellingProduct }
    const mapped = data.map((d) => ({
      name: d.product.product_name,
      category: d.product.category,
      sellingProduct: d.qty,
    }));

    // Gabungkan qty berdasarkan name dan category
    const merged = new Map<
      string,
      { name: string; category: string; sellingProduct: number }
    >();

    for (const item of mapped) {
      const key = `${item.category}-${item.name}`;
      if (merged.has(key)) {
        const existing = merged.get(key)!;
        existing.sellingProduct += item.sellingProduct;
        merged.set(key, existing);
      } else {
        merged.set(key, {
          name: item.name,
          category: item.category,
          sellingProduct: item.sellingProduct,
        });
      }
    }

    // Convert Map menjadi array
    const finalArray = Array.from(merged.values());

    // Pisahkan berdasarkan kategori: Signature, Coffee, NonCoffee
    const signature = finalArray.filter(
      (item) => item.category === "Signature"
    );
    const coffee = finalArray.filter((item) => item.category === "Coffee");
    const noncoffee = finalArray.filter(
      (item) => item.category === "NonCoffee"
    );

    return {
      success: true,
      data: [
        {
          signature,
          coffee,
          noncoffee,
        },
      ],
    };
  }

  static async totalDashboardSummary(): Promise<
    ApiResponse<{
      totalCustomer: number;
      totalRevenue: number;
      totalOrder: number;
      totalOrderOffline: number;
      totalOrderOnline: number;
    }>
  > {
    const [totalCustomer, totalRevenue, totalOrder, totalOffline, totalOnline] =
      await Promise.all([
        prismaClient.user.aggregate({
          where: {
            role_id: "6800a52eea8560606cbc4a25",
          },
          _count: {
            role_id: true,
          },
        }),

        prismaClient.payment.aggregate({
          _sum: { amount: true },
        }),

        prismaClient.payment.aggregate({
          where: { status: "COMPLETED" },
          _count: { order_id: true },
        }),

        prismaClient.payment.aggregate({
          _count: { id: true },
          where: {
            status: "COMPLETED",
            order: {
              order_source: "OFFLINE",
            },
          },
        }),

        prismaClient.payment.aggregate({
          _count: { id: true },
          where: {
            status: "COMPLETED",
            order: {
              order_source: "ONLINE",
            },
          },
        }),
      ]);

    return {
      success: true,
      data: {
        totalCustomer: totalCustomer._count.role_id,
        totalRevenue: totalRevenue._sum.amount ?? 0,
        totalOrder: totalOrder._count.order_id,
        totalOrderOffline: totalOffline._count.id,
        totalOrderOnline: totalOnline._count.id,
      },
    };
  }

  static async orderSummary(
    startDate?: Date,
    endDate?: Date
  ): Promise<ApiResponse<any>> {
    const grouped = await prismaClient.orderDetail.groupBy({
      by: ["product_id"],
      _sum: {
        qty: true,
        total_price: true,
      },
      _count: {
        order_id: true,
      },
      where: {
        order: {
          payment: {
            status: "COMPLETED",
            ...(startDate && endDate
              ? {
                  payment_date: {
                    gte: startDate,
                    lte: endDate,
                  },
                }
              : {}),
          },
        },
      },
    });

    const products = await prismaClient.product.findMany({
      where: {
        id: { in: grouped.map((g) => g.product_id) },
      },
      select: {
        id: true,
        product_name: true,
        image: true,
      },
    });

    return {
      success: true,
      data: grouped.map((item) => {
        const product = products.find((p) => p.id === item.product_id);
        return {
          product_id: item.product_id,
          product_name: product?.product_name ?? "",
          product_image: product?.image ?? "",
          total_qty: item._sum.qty ?? 0,
          total_sales: item._sum.total_price ?? 0,
          total_orders: item._count.order_id ?? 0,
        };
      }),
    };
  }
}
