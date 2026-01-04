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
    
    // Armazena tokens no localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      localStorage.setItem('user', JSON.stringify(response.user));
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
      // Limpa tokens do localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
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
    
    // Armazena tokens no localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      localStorage.setItem('user', JSON.stringify(response.user));
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
    
    const token = localStorage.getItem('accessToken');
    const user = this.getCurrentUser();
    
    return !!(token && user);
  }

  /**
   * Atualiza tokens usando refresh token
   */
  static async refreshTokens(): Promise<AuthResponse | null> {
    if (typeof window === 'undefined') return null;
    
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) return null;
    
    try {
      const response = await apiClient.post<AuthResponse>(
        API_ENDPOINTS.REFRESH,
        { refreshToken }
      );
      
      // Atualiza tokens
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      localStorage.setItem('user', JSON.stringify(response.user));
      
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
    return localStorage.getItem('accessToken');
  }
}

// Export singleton
export const authService = AuthService;
