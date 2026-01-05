import { renderHook, act, waitFor } from '@testing-library/react';
import { useCategories } from '../useCategories';
import { Category, CreateCategoryInput } from '../useCategories';

// Mock do fetch global
const mockFetch = jest.fn();
global.fetch = mockFetch;

// Mock do localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

// Mock do document.cookie
Object.defineProperty(document, 'cookie', {
  value: '',
  writable: true,
});

describe('useCategories', () => {
  const mockCategories: Category[] = [
    {
      id: '1',
      name: 'Pizza',
      imageUrl: 'http://localhost:9000/dompedro-assets/tenants/tenant1/categories/pizza.svg',
      isActive: true,
      openingHours: '{"monday":{"open":"18:00","close":"23:00"}}',
    },
    {
      id: '2',
      name: 'Bebidas',
      imageUrl: 'http://localhost:9000/dompedro-assets/tenants/tenant1/categories/bebidas.svg',
      isActive: true,
      openingHours: null,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock do cookie tenantSlug
    document.cookie = 'tenantSlug=test-tenant-slug';
  });

  describe('listCategories', () => {
    it('should fetch categories successfully', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockCategories,
      });

      const { result } = renderHook(() => useCategories());

      act(() => {
        result.current.listCategories();
      });

      await waitFor(() => {
        expect(result.current.categories).toEqual(mockCategories);
        expect(result.current.isLoading).toBe(false);
        expect(result.current.error).toBe(null);
      });

      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:3000/admin/catalog/categories',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-tenant-slug': 'test-tenant-slug',
          },
          credentials: 'include',
        }
      );
    });

    it('should handle fetch error', async () => {
      const mockError = { errorCode: 'TENANT_NOT_FOUND', message: 'Tenant not found' };
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: async () => mockError,
        status: 404,
      });

      const { result } = renderHook(() => useCategories());

      act(() => {
        result.current.listCategories();
      });

      await waitFor(() => {
        expect(result.current.categories).toEqual([]);
        expect(result.current.isLoading).toBe(false);
        expect(result.current.error).toBeTruthy();
      });
    });

    it('should handle network error', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      const { result } = renderHook(() => useCategories());

      act(() => {
        result.current.listCategories();
      });

      await waitFor(() => {
        expect(result.current.categories).toEqual([]);
        expect(result.current.isLoading).toBe(false);
        expect(result.current.error).toBeTruthy();
      });
    });

    it('should throw error when tenantSlug is missing', () => {
      document.cookie = '';

      const { result } = renderHook(() => useCategories());

      expect(() => result.current.listCategories()).toThrow('tenantSlug missing');
    });
  });

  describe('createCategory', () => {
    const mockCategory: Category = {
      id: '3',
      name: 'Sobremesas',
      imageUrl: 'http://localhost:9000/dompedro-assets/tenants/tenant1/categories/sobremesas.svg',
      isActive: true,
      openingHours: null,
    };

    it('should create category with image successfully', async () => {
      const formData = new FormData();
      formData.append('name', 'Sobremesas');
      const imageFile = new File(['test'], 'test.svg', { type: 'image/svg+xml' });
      formData.append('image', imageFile);
      formData.append('openingHours', '{"monday":{"open":"18:00","close":"22:00"}}');

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockCategory,
      });

      const { result } = renderHook(() => useCategories());

      const input: CreateCategoryInput = {
        name: 'Sobremesas',
        image: imageFile,
        openingHours: '{"monday":{"open":"18:00","close":"22:00"}}',
      };

      await act(async () => {
        await result.current.createCategory(input);
      });

      expect(result.current.categories).toEqual([mockCategory]);
      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:3000/admin/catalog/categories',
        {
          method: 'POST',
          headers: {
            'x-tenant-slug': 'test-tenant-slug',
          },
          credentials: 'include',
          body: expect.any(FormData),
        }
      );
    });

    it('should create category without image successfully', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockCategory,
      });

      const { result } = renderHook(() => useCategories());

      const input: CreateCategoryInput = {
        name: 'Sobremesas',
        openingHours: '{"monday":{"open":"18:00","close":"22:00"}}',
      };

      await act(async () => {
        await result.current.createCategory(input);
      });

      expect(result.current.categories).toEqual([mockCategory]);
    });

    it('should handle create category error', async () => {
      const mockError = { errorCode: 'CATEGORY_ALREADY_EXISTS', message: 'Category already exists' };
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: async () => mockError,
        status: 409,
      });

      const { result } = renderHook(() => useCategories());

      const input: CreateCategoryInput = {
        name: 'Pizza',
      };

      await act(async () => {
        await expect(result.current.createCategory(input)).rejects.toThrow();
      });
    });
  });

  describe('toggleCategoryActive', () => {
    it('should toggle category active status successfully', async () => {
      const updatedCategory = { ...mockCategories[0], isActive: false };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => updatedCategory,
      });

      const { result } = renderHook(() => useCategories());

      await act(async () => {
        await result.current.toggleCategoryActive('1', false);
      });

      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:3000/admin/catalog/categories/1/active',
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'x-tenant-slug': 'test-tenant-slug',
          },
          credentials: 'include',
          body: JSON.stringify({ isActive: false }),
        }
      );
    });

    it('should handle toggle category error', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({ message: 'Category not found' }),
        status: 404,
      });

      const { result } = renderHook(() => useCategories());

      await act(async () => {
        await expect(result.current.toggleCategoryActive('invalid-id', true)).rejects.toThrow();
      });
    });
  });

  describe('initial state', () => {
    it('should return initial state', () => {
      const { result } = renderHook(() => useCategories());

      expect(result.current.categories).toEqual([]);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBe(null);
    });
  });
});
