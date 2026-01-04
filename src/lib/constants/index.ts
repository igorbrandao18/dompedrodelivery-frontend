/**
 * URLs e Endpoints da API
 */
export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  REFRESH: '/auth/refresh',
  
  // Subscription Plans
  SUBSCRIPTION_PLANS: '/subscription-plans',
  
  // Tenants
  TENANTS: '/tenants',
  CURRENT_TENANT: '/tenants/current',
  
  // Products
  PRODUCTS: '/products',
  CATEGORIES: '/categories',
  
  // Orders
  ORDERS: '/orders',
  ORDER_STATUS: '/orders/status',
  
  // Customers
  CUSTOMERS: '/customers',
  
  // Users
  USERS: '/users',
  PROFILE: '/users/profile',
} as const;

/**
 * URLs externas
 */
export const EXTERNAL_URLS = {
  GITHUB: 'https://github.com',
  LINKEDIN: 'https://linkedin.com',
  SUPPORT_EMAIL: 'mailto:suporte@dompedrodelivery.com',
  WHATSAPP: 'https://wa.me/5585999999999',
} as const;

/**
 * Configurações da aplicação
 */
export const APP_CONFIG = {
  NAME: 'Dom Pedro Delivery',
  DESCRIPTION: 'Tecnologia para restaurantes',
  VERSION: '1.0.0',
  
  // Paginação
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
  
  // Uploads
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  
  // Cache
  CACHE_TTL: 5 * 60, // 5 minutos
  
  // Timeouts
  REQUEST_TIMEOUT: 30000, // 30 segundos
} as const;

/**
 * Cores do tema
 */
export const THEME_COLORS = {
  primary: {
    50: '#fff7ed',
    100: '#ffedd5',
    200: '#fed7aa',
    300: '#fdba74',
    400: '#fb923c',
    500: '#f97316',
    600: '#ea580c',
    700: '#c2410c',
    800: '#9a3412',
    900: '#7c2d12',
    950: '#431407',
  },
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
    950: '#030712',
  },
} as const;

/**
 * Status de pedidos
 */
export const ORDER_STATUS = {
  CREATED: { value: 'CREATED', label: 'Pendente', color: 'gray' },
  CONFIRMED: { value: 'CONFIRMED', label: 'Confirmado', color: 'blue' },
  PREPARING: { value: 'PREPARING', label: 'Preparando', color: 'orange' },
  OUT_FOR_DELIVERY: { value: 'OUT_FOR_DELIVERY', label: 'Saiu para Entrega', color: 'purple' },
  READY_FOR_PICKUP: { value: 'READY_FOR_PICKUP', label: 'Pronto para Retirada', color: 'green' },
  COMPLETED: { value: 'COMPLETED', label: 'Entregue', color: 'green' },
  CANCELED: { value: 'CANCELED', label: 'Cancelado', color: 'red' },
} as const;

/**
 * Métodos de pagamento
 */
export const PAYMENT_METHODS = {
  CASH: { value: 'CASH', label: 'Dinheiro', icon: '💵' },
  PIX: { value: 'PIX', label: 'PIX', icon: '📱' },
  CARD: { value: 'CARD', label: 'Cartão', icon: '💳' },
} as const;

/**
 * Tipos de operação
 */
export const OPERATION_TYPES = {
  DELIVERY: { value: 'DELIVERY', label: 'Delivery' },
  PICKUP: { value: 'PICKUP', label: 'Retirada' },
  BOTH: { value: 'BOTH', label: 'Delivery e Retirada' },
} as const;
