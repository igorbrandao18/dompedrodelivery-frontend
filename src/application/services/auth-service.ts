import { apiClient } from './api-client';
import { 
  LoginCredentials, 
  RegisterData, 
  AuthResponse, 
  User 
} from '@/domain/types';
import { API_ENDPOINTS } from '@/lib/constants';

/**
 * Serviço de autenticação
 */
export class AuthService {
  /**
   * Realiza login do usuário
   */
  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      API_ENDPOINTS.LOGIN,
      credentials
    );
    
    // Com cookies HttpOnly, o token não deve ser persistido no localStorage.
    // Mantemos apenas dados não sensíveis necessários para UX (ex: tenantSlug/user).
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(response.user));
      if ((response as unknown as { tenantSlug?: string }).tenantSlug) {
        localStorage.setItem(
          'tenantSlug',
          (response as unknown as { tenantSlug: string }).tenantSlug,
        );
      }
    }
    
    return response;
  }

  /**
   * Realiza logout do usuário
   */
  static async logout(): Promise<void> {
    try {
      await apiClient.post(API_ENDPOINTS.LOGOUT);
    } catch (error) {
      // Continua com logout mesmo se API falhar
      console.error('Logout API error:', error);
    } finally {
      // Limpa dados do localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
        localStorage.removeItem('tenantSlug');
      }
    }
  }

  /**
   * Registra novo usuário
   */
  static async register(data: RegisterData): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      API_ENDPOINTS.REGISTER,
      data
    );

    // Com cookies HttpOnly, o token não deve ser persistido no localStorage.
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(response.user));
      if ((response as unknown as { tenantSlug?: string }).tenantSlug) {
        localStorage.setItem(
          'tenantSlug',
          (response as unknown as { tenantSlug: string }).tenantSlug,
        );
      }
    }

    return response;
  }

  /**
   * Obtém usuário atual do localStorage
   */
  static getCurrentUser(): User | null {
    if (typeof window === 'undefined') return null;
    
    try {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error('Error parsing user from localStorage:', error);
      return null;
    }
  }

  /**
   * Verifica se usuário está autenticado
   */
  static isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;

    const user = this.getCurrentUser();

    // Com cookies HttpOnly, não conseguimos checar o token do lado do cliente.
    // Então consideramos autenticado se houver user (e o backend validará o cookie).
    return !!user;
  }

  /**
   * Atualiza tokens usando refresh token
   */
  static async refreshTokens(): Promise<AuthResponse | null> {
    // Refresh token via cookie HttpOnly (se existir no backend).
    if (typeof window === 'undefined') return null;

    try {
      const response = await apiClient.post<AuthResponse>(
        API_ENDPOINTS.REFRESH,
      );

      // Atualiza apenas user/tenantSlug
      localStorage.setItem('user', JSON.stringify(response.user));
      if ((response as unknown as { tenantSlug?: string }).tenantSlug) {
        localStorage.setItem(
          'tenantSlug',
          (response as unknown as { tenantSlug: string }).tenantSlug,
        );
      }
      
      return response;
    } catch (error) {
      console.error('Token refresh error:', error);
      // Limpa tokens inválidos
      this.logout();
      return null;
    }
  }

  /**
   * Obtém token de acesso
   */
  static getAccessToken(): string | null {
    if (typeof window === 'undefined') return null;
    return null;
  }
}

// Export singleton
export const authService = AuthService;
