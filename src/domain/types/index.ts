/**
 * Export central de todos os tipos de domínio
 */

export * from './auth';
export * from './subscription';
export * from './order';
export * from './product';

// Tipos comuns
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  timestamp: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiError {
  code: string;
  message: string;
  timestamp: string;
  path: string;
  method: string;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface TableColumn<T = any> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: any, record: T) => React.ReactNode;
}

export interface FilterOption {
  value: string;
  label: string;
  count?: number;
}
