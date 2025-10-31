export type CalculatePageSizeParams = {
  pageSize: number;
  limit: number;
};

export type ApplyPaginationParams = {
  page: number;
  pageSize: number;
  limit?: number;
};

export type QuerySorts = {
  sort: string;
  order: "asc" | "desc";
};

export interface ApplySortParams {
  sorts?: QuerySorts[] | string;
  orderKey?: string;
}
