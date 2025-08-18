import { prismaClient } from "../application/database";

// Fungsi untuk mendapatkan tanggal filter tanpa date-fns
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

// Fungsi utama untuk fetch data product sales by category
export const getProductSales = async (request: { period: string }) => {
  const { period } = request;
  const dateFilter = getDateFilter(period);

  const data = await prismaClient.orderDetail.findMany({
    where: {
      createdAt: {
        gte: dateFilter,
      },
      order: {
        payment: {
          status: "paid", // hanya ambil order dengan payment "paid"
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
  const signature = finalArray.filter((item) => item.category === "Signature");
  const coffee = finalArray.filter((item) => item.category === "Coffee");
  const noncoffee = finalArray.filter((item) => item.category === "NonCoffee");

  return [
    {
      signature,
      coffee,
      noncoffee,
    },
  ];
};

export const getCustomerCount = async () => {
  const data = await prismaClient.user.count({
    where: {
      role_id: "6800a52eea8560606cbc4a25",
    },
  });

  return data;
};
