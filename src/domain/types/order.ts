/**
 * Tipos relacionados a pedidos
 */

export enum OrderStatus {
  CREATED = 'CREATED',
  CONFIRMED = 'CONFIRMED',
  PREPARING = 'PREPARING',
  OUT_FOR_DELIVERY = 'OUT_FOR_DELIVERY',
  READY_FOR_PICKUP = 'READY_FOR_PICKUP',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
}

export enum PaymentMethod {
  CASH = 'CASH',
  PIX = 'PIX',
  CARD = 'CARD',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  REFUNDED = 'REFUNDED',
  FAILED = 'FAILED',
}

export interface Customer {
  id: string;
  tenantId: string;
  email: string;
  name: string;
  phone?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  id: string;
  tenantId: string;
  customerId: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  tenantId: string;
  orderId: string;
  productId: string;
  quantity: number;
  unitPriceCents: number;
  totalCents: number;
  createdAt: string;
}

export interface Order {
  id: string;
  tenantId: string;
  customerId?: string;
  addressId?: string;
  deliveryAreaId?: string;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  paidAt?: string;
  cardBrand?: string;
  changeCents?: number;
  subtotalCents: number;
  deliveryFeeCents: number;
  totalCents: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  
  // Relacionamentos (opcional, para quando incluídos na resposta)
  customer?: Customer;
  address?: Address;
  items?: OrderItem[];
}

export interface CreateOrderData {
  customerId?: string;
  addressId?: string;
  items: Omit<OrderItem, 'id' | 'tenantId' | 'orderId' | 'createdAt'>[];
  notes?: string;
  paymentMethod: PaymentMethod;
}

export interface OrderFilters {
  status?: OrderStatus;
  customerId?: string;
  dateFrom?: string;
  dateTo?: string;
  paymentMethod?: PaymentMethod;
}
