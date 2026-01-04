/**
 * Export central de todos os tipos de domínio
 */

import type { ReactNode } from 'react';

export * from './auth';
export * from './subscription';
export * from './order';
export * from './product';

// Tipos comuns
export interface ApiResponse<T = unknown> {
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

export interface TableColumn<T = unknown> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: unknown, record: T) => ReactNode;
}

export interface FilterOption {
  value: string;
  label: string;
  count?: number;
}
