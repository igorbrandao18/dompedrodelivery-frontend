import { useMemo, useState } from 'react';
import { useDashboard, type DashboardOrder } from '@/application/hooks/useDashboard';

interface StatusMeta {
  title: string;
  headerClassName: string;
  columnClassName: string;
  actionLabel: string;
}

const statusMeta: Record<DashboardOrder['status'], StatusMeta> = {
  ANALYSIS: {
    title: 'Em análise',
    headerClassName: 'bg-orange-600 text-white',
    columnClassName: 'bg-orange-500/20',
    actionLabel: 'Aceitar pedido',
  },
  PRODUCTION: {
    title: 'Em produção',
    headerClassName: 'bg-orange-500 text-white',
    columnClassName: 'bg-orange-400/20',
    actionLabel: 'Avançar pedido',
  },
  READY: {
    title: 'Prontos para entrega',
    headerClassName: 'bg-green-700 text-white',
    columnClassName: 'bg-green-600/20',
    actionLabel: 'Escolher entregador',
  },
};

interface UseDashboardPageReturn {
  orders: DashboardOrder[];
  isLoading: boolean;
  loadError: string | null;
  tenant: any;
  tenantLoading: boolean;
  search: string;
  orderNumber: string;
  setSearch: (search: string) => void;
  setOrderNumber: (orderNumber: string) => void;
  filteredOrders: DashboardOrder[];
  statusMeta: typeof statusMeta;
}

export function useDashboardPage(): UseDashboardPageReturn {
  const { orders, isLoading, loadError, tenant, tenantLoading } = useDashboard();
  const [search, setSearch] = useState('');
  const [orderNumber, setOrderNumber] = useState('');

  const filteredOrders = useMemo(() => {
    const s = search.trim().toLowerCase();
    const n = orderNumber.trim().toLowerCase();
    return orders.filter((o) => {
      const matchesNumber = !n || o.id.toLowerCase().includes(n);
      const matchesSearch =
        !s ||
        o.customerName.toLowerCase().includes(s) ||
        (o.customerPhone?.toLowerCase().includes(s) ?? false);
      return matchesNumber && matchesSearch;
    });
  }, [orders, search, orderNumber]);

  return {
    orders,
    isLoading,
    loadError,
    tenant,
    tenantLoading,
    search,
    orderNumber,
    setSearch,
    setOrderNumber,
    filteredOrders,
    statusMeta,
  };
}
