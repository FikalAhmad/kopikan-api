export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: any;
  pagination?: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
}
