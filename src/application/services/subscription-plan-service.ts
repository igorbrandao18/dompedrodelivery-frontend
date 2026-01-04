import { apiClient } from './api-client';
import { SubscriptionPlan } from '@/domain/types';
import { API_ENDPOINTS } from '@/lib/constants';

/**
 * Serviço de planos de assinatura
 */
export class SubscriptionPlanService {
  /**
   * Obtém todos os planos de assinatura ativos
   */
  static async getAll(): Promise<SubscriptionPlan[]> {
    return apiClient.get<SubscriptionPlan[]>(API_ENDPOINTS.SUBSCRIPTION_PLANS);
  }

  /**
   * Obtém plano pelo slug
   */
  static async getBySlug(slug: string): Promise<SubscriptionPlan | null> {
    try {
      return await apiClient.get<SubscriptionPlan>(`${API_ENDPOINTS.SUBSCRIPTION_PLANS}/${slug}`);
    } catch (error) {
      console.error(`Error fetching plan ${slug}:`, error);
      return null;
    }
  }

  /**
   * Obtém planos para landing page (ordenados)
   */
  static async getLandingPlans(): Promise<SubscriptionPlan[]> {
    const plans = await this.getAll();
    return plans.sort((a, b) => a.sortOrder - b.sortOrder);
  }

  /**
   * Formata preço para exibição
   */
  static formatPrice(priceCents: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(priceCents / 100);
  }

  /**
   * Formata preço anual para exibição
   */
  static formatAnnualPrice(annualPriceCents: number): string {
    const monthlyPrice = annualPriceCents / 12 / 100;
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(monthlyPrice);
  }

  /**
   * Verifica se plano é gratuito
   */
  static isFree(plan: SubscriptionPlan): boolean {
    return plan.priceCents === 0;
  }

  /**
   * Verifica se plano tem preço anual
   */
  static hasAnnualPrice(plan: SubscriptionPlan): boolean {
    return !!plan.annualPriceCents && plan.annualPriceCents > 0;
  }

  /**
   * Calcula economia do plano anual
   */
  static calculateAnnualSavings(plan: SubscriptionPlan): number {
    if (!this.hasAnnualPrice(plan)) return 0;
    
    const monthlyTotal = plan.priceCents * 12;
    const annualPrice = plan.annualPriceCents!;
    
    return monthlyTotal - annualPrice;
  }
}

// Export singleton
export const subscriptionPlanService = SubscriptionPlanService;
