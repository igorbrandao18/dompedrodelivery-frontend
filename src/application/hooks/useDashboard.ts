'use client';

import { useCallback, useEffect, useState } from 'react';
import { t, tError } from '@/i18n';

type DashboardOrderStatus = 'ANALYSIS' | 'PRODUCTION' | 'READY';

export interface DashboardOrder {
  id: string;
  createdAt: string;
  customerName: string;
  customerPhone?: string;
  address?: string;
  total: string;
  payment: string;
  status: DashboardOrderStatus;
}

type BackendOrderStatus =
  | 'CREATED'
  | 'CONFIRMED'
  | 'PREPARING'
  | 'OUT_FOR_DELIVERY'
  | 'READY_FOR_PICKUP'
  | 'COMPLETED'
  | 'CANCELED';

interface BackendOrder {
  id: string;
  createdAt: string;
  status: BackendOrderStatus;
  totalCents: number;
  paymentMethod?: string;
  customer?: { name?: string | null; phone?: string | null } | null;
  address?: {
    street?: string | null;
    number?: string | null;
    neighborhood?: string | null;
    city?: string | null;
    state?: string | null;
  } | null;
}

export interface TenantInfo {
  id: string;
  slug: string;
  name: string;
  plan: string;
}

const mapBackendStatus = (status: BackendOrderStatus): DashboardOrderStatus => {
  switch (status) {
    case 'CREATED':
    case 'CONFIRMED':
      return 'ANALYSIS';
    case 'PREPARING':
      return 'PRODUCTION';
    case 'OUT_FOR_DELIVERY':
    case 'READY_FOR_PICKUP':
      return 'READY';
    case 'COMPLETED':
    case 'CANCELED':
    default:
      return 'READY';
  }
};

const formatMoney = (cents: number) => {
  const value = (cents ?? 0) / 100;
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

const toDisplayId = (id: string) => {
  return id.length > 8 ? `#${id.slice(0, 6)}` : id.startsWith('#') ? id : `#${id}`;
};

const toAddressLine = (a?: BackendOrder['address']) => {
  if (!a) return undefined;
  const parts = [a.street, a.number, a.neighborhood, a.city].filter(Boolean);
  if (parts.length === 0) return undefined;
  return `Delivery: ${parts.join(', ')}`;
};

export function useDashboard() {
  const [orders, setOrders] = useState<DashboardOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [tenant, setTenant] = useState<TenantInfo | null>(null);
  const [tenantLoading, setTenantLoading] = useState(true);

  const fetchOrders = useCallback(async () => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const getCookie = (name: string) => {
      if (typeof document === 'undefined') return null;
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift() ?? null;
      return null;
    };
    const tenantSlug = getCookie('tenantSlug');

    if (!tenantSlug) {
      setIsLoading(false);
      setLoadError(t('auth.tenant_slug_missing'));
      return;
    }

    try {
      setLoadError(null);
      const response = await fetch(`${baseUrl}/admin/orders`, {
        credentials: 'include',
        headers: {
          'x-tenant-slug': tenantSlug,
        },
      });

      if (!response.ok) {
        const errorBody = (await response.json().catch(() => null)) as
          | null
          | {
              message?: string;
              errorCode?: string;
              params?: Record<string, unknown>;
            };
        throw new Error(
          tError(
            errorBody?.errorCode,
            errorBody?.message || `HTTP ${response.status}`,
            errorBody?.params as Record<string, string | number> | undefined,
          ),
        );
      }

      const data = (await response.json()) as BackendOrder[];

      const mapped: DashboardOrder[] = (data || []).map((o) => {
        const created = new Date(o.createdAt);
        const createdAt = Number.isNaN(created.getTime())
          ? ''
          : created.toLocaleTimeString('pt-BR', {
              hour: '2-digit',
              minute: '2-digit',
            });

        return {
          id: toDisplayId(o.id),
          createdAt,
          customerName: o.customer?.name || 'Cliente',
          customerPhone: o.customer?.phone || undefined,
          address: toAddressLine(o.address),
          total: formatMoney(o.totalCents),
          payment: o.paymentMethod || '—',
          status: mapBackendStatus(o.status),
        };
      });

      setOrders(mapped);
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : t('error.INTERNAL_SERVER_ERROR'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchTenant = useCallback(async () => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const getCookie = (name: string) => {
      if (typeof document === 'undefined') return null;
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift() ?? null;
      return null;
    };
    const tenantSlug = getCookie('tenantSlug');

    if (!tenantSlug) {
      setTenantLoading(false);
      return;
    }

    try {
      const response = await fetch(`${baseUrl}/tenants/me`, {
        credentials: 'include',
        headers: {
          'x-tenant-slug': tenantSlug,
        },
      });

      if (!response.ok) {
        const errorBody = (await response.json().catch(() => null)) as
          | null
          | {
              message?: string;
              errorCode?: string;
              params?: Record<string, unknown>;
            };
        throw new Error(
          tError(
            errorBody?.errorCode,
            errorBody?.message || `HTTP ${response.status}`,
            errorBody?.params as Record<string, string | number> | undefined,
          ),
        );
      }

      const data = (await response.json()) as TenantInfo;
      setTenant(data);
    } catch (err) {
      console.error('Failed to load tenant info', err);
    } finally {
      setTenantLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

    try {
      await fetch(`${baseUrl}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    } catch (err) {
      console.error('Logout API error:', err);
    }

    // Limpa tudo que é do app
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    localStorage.removeItem('tenantSlug');

    // Redireciona para login
    window.location.href = '/auth/login';
  }, []);

  useEffect(() => {
    fetchOrders();
    fetchTenant();

    const interval = setInterval(fetchOrders, 3000);
    return () => clearInterval(interval);
  }, [fetchOrders, fetchTenant]);

  return {
    orders,
    isLoading,
    loadError,
    tenant,
    tenantLoading,
    logout,
    refetchOrders: fetchOrders,
  };
}
