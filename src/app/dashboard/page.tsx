'use client';

import { useMemo, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type OrderStatus = 'ANALYSIS' | 'PRODUCTION' | 'READY';

interface Order {
  id: string;
  createdAt: string;
  customerName: string;
  customerPhone?: string;
  address?: string;
  total: string;
  payment: string;
  status: OrderStatus;
}

const statusMeta: Record<
  OrderStatus,
  {
    title: string;
    headerClassName: string;
    columnClassName: string;
    actionLabel: string;
  }
> = {
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

export default function DashboardPage() {
  const [search, setSearch] = useState('');
  const [orderNumber, setOrderNumber] = useState('');

  const orders = useMemo<Order[]>(
    () => [
      {
        id: '#880',
        createdAt: '15:15',
        customerName: 'Ana',
        customerPhone: '(53) 98888-8888',
        address: 'Delivery: Av. Pinheiro Machado',
        total: 'R$ 35,00',
        payment: 'Dinheiro - Troco',
        status: 'ANALYSIS',
      },
      {
        id: '#879',
        createdAt: '15:12',
        customerName: 'Ailton',
        customerPhone: '(53) 99999-9999',
        address: 'Delivery: Avenida Duque de Caxias',
        total: 'R$ 27,00',
        payment: 'Cartão',
        status: 'PRODUCTION',
      },
    ],
    [],
  );

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
  }, [orderNumber, orders, search]);

  const grouped = useMemo(() => {
    return {
      ANALYSIS: filteredOrders.filter((o) => o.status === 'ANALYSIS'),
      PRODUCTION: filteredOrders.filter((o) => o.status === 'PRODUCTION'),
      READY: filteredOrders.filter((o) => o.status === 'READY'),
    } satisfies Record<OrderStatus, Order[]>;
  }, [filteredOrders]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3">
        <h1 className="text-xl font-bold text-gray-900">Meus Pedidos</h1>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Nº Pedido</label>
            <input
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              className="h-9 w-32 rounded-md border border-gray-300 bg-white px-3 text-sm outline-none focus:border-orange-500"
              placeholder="#880"
            />
          </div>

          <div className="flex items-center gap-2 flex-1">
            <div className="relative flex-1">
              <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 103.5 10.5a7.5 7.5 0 0013.15 6.15z" />
                </svg>
              </div>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-9 w-full rounded-md border border-gray-300 bg-white pl-9 pr-3 text-sm outline-none focus:border-orange-500"
                placeholder="Buscar pelo cliente"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {(Object.keys(statusMeta) as OrderStatus[]).map((status) => {
          const meta = statusMeta[status];
          const items = grouped[status];

          return (
            <section key={status} className={`rounded-lg ${meta.columnClassName} p-3`}>
              <div className={`flex items-center justify-between rounded-md px-3 py-2 ${meta.headerClassName}`}>
                <span className="text-sm font-semibold">{meta.title}</span>
                <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-white/20 px-2 text-xs font-bold">
                  {items.length}
                </span>
              </div>

              <div className="mt-3 space-y-3">
                {items.length === 0 ? (
                  <div className="rounded-md bg-white/70 p-4 text-center text-sm text-gray-700">
                    Nenhum pedido no momento.
                    <div className="mt-1 text-xs text-gray-600">
                      Receba pedidos e visualize os prontos para entrega aqui.
                    </div>
                  </div>
                ) : (
                  items.map((order) => (
                    <Card key={order.id} className="border-0 shadow-sm">
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-bold text-gray-900">Pedido {order.id}</div>
                          <div className="inline-flex items-center gap-1 rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-700">
                            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                            </svg>
                            {order.createdAt}
                          </div>
                        </div>

                        <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-gray-700">
                          <div>
                            <div className="text-gray-500">Cliente</div>
                            <div className="font-medium">{order.customerName}</div>
                            {order.customerPhone && (
                              <div className="text-gray-600">{order.customerPhone}</div>
                            )}
                          </div>

                          <div>
                            <div className="text-gray-500">Total</div>
                            <div className="font-bold">{order.total}</div>
                            <div className="text-gray-600">{order.payment}</div>
                          </div>
                        </div>

                        {order.address && (
                          <div className="mt-2 text-xs text-gray-700">
                            <div className="text-gray-500">Entrega</div>
                            <div className="font-medium">{order.address}</div>
                          </div>
                        )}

                        <div className="mt-3 flex items-center justify-end">
                          <Button className="h-8 px-3 text-xs">
                            {meta.actionLabel}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
