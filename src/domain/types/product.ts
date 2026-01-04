/**
 * Tipos relacionados a produtos e categorias
 */

export interface Category {
  id: string;
  tenantId: string;
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  tenantId: string;
  categoryId: string;
  name: string;
  description?: string;
  priceCents: number;
  stock: number;
  isActive: boolean;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
  
  // Relacionamentos (opcional)
  category?: Category;
}

export interface CreateProductData {
  name: string;
  description?: string;
  priceCents: number;
  stock: number;
  categoryId: string;
  imageUrl?: string;
}

export interface UpdateProductData extends Partial<CreateProductData> {
  isActive?: boolean;
}

export interface CreateCategoryData {
  name: string;
}

export interface ProductFilters {
  categoryId?: string;
  isActive?: boolean;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
}
