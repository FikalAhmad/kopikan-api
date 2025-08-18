const paginate = <T>(
  data: T[],
  page?: number,
  limit?: number,
  offset?: number
): T[] => {
  if (page) {
    const startIndex = (page - 1) * (limit || data.length);
    return data.slice(startIndex, startIndex + (limit || data.length));
  }
  if (offset !== undefined) {
    return data.slice(offset, offset + (limit || data.length));
  }
  return data;
};
