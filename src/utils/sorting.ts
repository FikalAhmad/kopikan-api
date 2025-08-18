export const sortData = <T>(
  data: T[],
  sortFields: string[],
  sortOrders: string[]
): T[] => {
  return [...data].sort((a, b) => {
    for (let i = 0; i < sortFields.length; i++) {
      const field = sortFields[i] as keyof T;
      const order = (sortOrders[i] || "asc").toLowerCase();

      if (a[field] < b[field]) return order === "desc" ? 1 : -1;
      if (a[field] > b[field]) return order === "desc" ? -1 : 1;
    }
    return 0;
  });
};
