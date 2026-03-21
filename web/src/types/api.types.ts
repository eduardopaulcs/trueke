export interface ApiResponse<T> {
  data: T;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface PaginatedData<T> {
  items: T[];
  pagination: Pagination;
}

export interface ApiError {
  error: {
    statusCode: number;
    message: string | string[];
  };
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}
