// API Response Wrappers
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}

// Query Parameters
export interface PaginationParams {
  limit?: number;
  offset?: number;
}

export interface SortingParams {
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface FilterParams {
  [key: string]: string | number | boolean | undefined;
}

// Standardized Frontend API Error Object
export interface ApiErrorDetail {
  field?: string;
  message: string;
}

export interface ApiError {
  status: number;
  message: string;
  code: string;
  details?: ApiErrorDetail[];
  isNetworkError?: boolean;
}
