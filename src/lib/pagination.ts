import { ApplyPaginationParams, CalculatePageSizeParams } from "./types";

/**
 * Calculate page size
 */
function calculatePageSize({ pageSize, limit = 100 }: CalculatePageSizeParams) {
  const min = 10;
  const parsePageSize = Number(pageSize);

  // Berguna agar limit selalu <= 100
  if (!isNaN(parsePageSize) && parsePageSize > 0) {
    return Math.min(parsePageSize, limit);
  }

  return min;
}

/**
 * Apply pagination to query
 */
export function applyPagination({
  page,
  pageSize,
  limit = 100,
}: ApplyPaginationParams) {
  const parsedPage = Number(page) > 0 ? Number(page) : 1;
  const parsedPageSize = calculatePageSize({ pageSize, limit });

  /**
   * Page	Skip	Take	Data yang diambil
      1	(1-1)*10 = 0	10	Data 1–10
      2	(2-1)*10 = 10	10	Data 11–20
      3	(3-1)*10 = 20	10	Data 21–30
      4	(4-1)*10 = 30	10	Data 31–35 (karena data habis)
   */
  const skip = (parsedPage - 1) * parsedPageSize;
  const take = parsedPageSize;

  return { skip, take };
}

// ?page=1&pageSize=10&sorts=[{"sort":"name","order":"asc"}]
