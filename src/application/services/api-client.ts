/**
 * Cliente base para chamadas de API
 */
export class ApiClientError extends Error {
  status: number;
  errorCode?: string;
  params?: Record<string, unknown>;

  constructor(input: {
    message: string;
    status: number;
    errorCode?: string;
    params?: Record<string, unknown>;
  }) {
    super(input.message);
    this.name = 'ApiClientError';
    this.status = input.status;
    this.errorCode = input.errorCode;
    this.params = input.params;
  }
}

class ApiClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  /**
   * Obtém os headers do tenant (multi-tenant)
   */
  private getTenantHeaders(): Record<string, string> {
    if (typeof window === 'undefined') return {};

    const tenantSlug = localStorage.getItem('tenantSlug');
    return tenantSlug ? { 'x-tenant-slug': tenantSlug } : {};
  }

  /**
   * Realiza uma requisição HTTP
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const headers = {
      ...this.defaultHeaders,
      ...this.getTenantHeaders(),
      ...options.headers,
    };

    try {
      const response = await fetch(url, {
        ...options,
        credentials: 'include',
        headers,
      });

      // Handle 204 No Content
      if (response.status === 204) {
        return null as T;
      }

      const data = (await response.json().catch(() => null)) as
        | null
        | {
            message?: string;
            errorCode?: string;
            params?: Record<string, unknown>;
          };

      if (!response.ok) {
        throw new ApiClientError({
          message: data?.message || `HTTP ${response.status}`,
          status: response.status,
          errorCode: data?.errorCode,
          params: data?.params,
        });
      }

      return data as T;
    } catch (error) {
      if (error instanceof ApiClientError) {
        throw error;
      }
      if (error instanceof Error) {
        throw new Error(`API Error: ${error.message}`);
      }
      throw new Error('Unknown API error');
    }
  }

  /**
   * GET request
   */
  async get<T>(
    endpoint: string,
    params?: Record<string, string | number | boolean>
  ): Promise<T> {
    const url = params
      ? `${endpoint}?${new URLSearchParams(
          Object.entries(params).map(([key, value]) => [key, String(value)])
        )}`
      : endpoint;
    return this.request<T>(url);
  }

  /**
   * POST request
   */
  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * PUT request
   */
  async put<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * PATCH request
   */
  async patch<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * DELETE request
   */
  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    });
  }

  /**
   * Upload de arquivo
   */
  async upload<T>(
    endpoint: string,
    file: File,
    additionalData?: Record<string, string | number | boolean>
  ): Promise<T> {
    const formData = new FormData();
    formData.append('file', file);
    
    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        formData.append(key, String(value));
      });
    }

    return this.request<T>(endpoint, {
      method: 'POST',
      body: formData,
      headers: {}, // Remove Content-Type para multipart/form-data
    });
  }
}

// Singleton instance
export const apiClient = new ApiClient();
