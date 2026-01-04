/**
 * Tipos relacionados a planos de assinatura
 */

export interface SubscriptionPlan {
  id: string;
  name: string;
  slug: string;
  description: string;
  priceCents: number;
  annualPriceCents?: number;
  features: string[];
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface Tenant {
  id: string;
  slug: string;
  name: string;
  operationType: 'DELIVERY' | 'PICKUP' | 'BOTH';
  plan: 'FREE' | 'BASIC' | 'PREMIUM';
  createdAt: string;
  updatedAt: string;
}

export interface PlanLimits {
  maxProducts: number;
  maxCategories: number;
  maxOrdersPerMonth: number;
  maxDeliveryAreas: number;
  hasStripeIntegration: boolean;
  hasCustomDomain: boolean;
  hasAdvancedReports: boolean;
  hasCoupons: boolean;
}
