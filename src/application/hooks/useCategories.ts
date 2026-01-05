'use client';

import { useCallback, useState } from 'react';
import { t, tError } from '@/i18n';

export interface Category {
  id: string;
  name: string;
  imageUrl?: string;
  isActive: boolean;
  openingHours?: string;
}

export interface CreateCategoryInput {
  name: string;
  image?: File;
  openingHours?: string;
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAuthHeaders = useCallback(() => {
    const getCookie = (name: string) => {
      if (typeof document === 'undefined') return null;
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift() ?? null;
      return null;
    };
    const tenantSlug = getCookie('tenantSlug');
    if (!tenantSlug) throw new Error('tenantSlug missing');
    return {
      'Content-Type': 'application/json',
      'x-tenant-slug': tenantSlug,
      credentials: 'include' as RequestCredentials,
    };
  }, []);

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

  const listCategories = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const headers = getAuthHeaders();
      const res = await fetch(`${baseUrl}/admin/catalog/categories`, {
        headers,
        credentials: 'include',
      });

      if (!res.ok) {
        const errBody = (await res.json().catch(() => null)) as
          | { errorCode?: string; message?: string; params?: Record<string, unknown> }
          | null;
        throw new Error(
          tError(
            errBody?.errorCode,
            errBody?.message || `HTTP ${res.status}`,
            errBody?.params as Record<string, string | number> | undefined,
          ),
        );
      }

      const data = (await res.json()) as Category[];
      setCategories(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : t('error.INTERNAL_SERVER_ERROR'));
    } finally {
      setIsLoading(false);
    }
  }, [baseUrl, getAuthHeaders]);

  const createCategory = useCallback(
    async (input: CreateCategoryInput) => {
      setError(null);
      try {
        const formData = new FormData();
        formData.append('name', input.name);
        if (input.image) {
          formData.append('image', input.image);
        }
        if (input.openingHours) {
          formData.append('openingHours', input.openingHours);
        }

        const tenantSlug = localStorage.getItem('tenantSlug');
        if (!tenantSlug) throw new Error('tenantSlug missing');

        const res = await fetch(`${baseUrl}/admin/catalog/categories`, {
          method: 'POST',
          headers: {
            'x-tenant-slug': tenantSlug,
          },
          credentials: 'include',
          body: formData,
        });

        if (!res.ok) {
          const errBody = (await res.json().catch(() => null)) as
            | { errorCode?: string; message?: string; params?: Record<string, unknown> }
            | null;
          throw new Error(
            tError(
              errBody?.errorCode,
              errBody?.message || `HTTP ${res.status}`,
              errBody?.params as Record<string, string | number> | undefined,
            ),
          );
        }

        const created = (await res.json()) as Category;
        setCategories((prev) => [...prev, created]);
        return created;
      } catch (err) {
        const msg = err instanceof Error ? err.message : t('error.INTERNAL_SERVER_ERROR');
        setError(msg);
        throw new Error(msg);
      }
    },
    [baseUrl],
  );

  const toggleCategoryActive = useCallback(
    async (categoryId: string, isActive: boolean) => {
      setError(null);
      try {
        const tenantSlug = localStorage.getItem('tenantSlug');
        if (!tenantSlug) throw new Error('tenantSlug missing');

        const res = await fetch(`${baseUrl}/admin/catalog/categories/${categoryId}/active`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'x-tenant-slug': tenantSlug,
          },
          credentials: 'include',
          body: JSON.stringify({ isActive }),
        });

        if (!res.ok) {
          const errBody = (await res.json().catch(() => null)) as
            | { errorCode?: string; message?: string; params?: Record<string, unknown> }
            | null;
          throw new Error(
            tError(
              errBody?.errorCode,
              errBody?.message || `HTTP ${res.status}`,
              errBody?.params as Record<string, string | number> | undefined,
            ),
          );
        }

        const updated = (await res.json()) as Category;
        setCategories((prev) =>
          prev.map((c) => (c.id === categoryId ? updated : c)),
        );
        return updated;
      } catch (err) {
        const msg = err instanceof Error ? err.message : t('error.INTERNAL_SERVER_ERROR');
        setError(msg);
        throw new Error(msg);
      }
    },
    [baseUrl],
  );

  return {
    categories,
    isLoading,
    error,
    listCategories,
    createCategory,
    toggleCategoryActive,
  };
}
