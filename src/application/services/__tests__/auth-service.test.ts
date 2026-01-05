import { AuthService } from '../auth-service';
import { apiClient } from '../api-client';
import { AuthResponse, UserRole } from '@/domain/types';

// Mock do apiClient
jest.mock('../api-client');
const mockApiClient = apiClient as jest.Mocked<typeof apiClient>;

// Mock do localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

// Mock do document.cookie
Object.defineProperty(document, 'cookie', {
  value: '',
  writable: true,
});

describe('AuthService', () => {
  const mockAuthResponse: AuthResponse = {
    user: {
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
      role: UserRole.ADMIN,
      isActive: true,
      tenantId: 'tenant1',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    },
    accessToken: 'access-token',
    refreshToken: 'refresh-token',
    expiresIn: 3600,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    document.cookie = '';
  });

  describe('login', () => {
    it('should save user and tenantSlug to localStorage/cookie on successful login', async () => {
      const credentials = { email: 'test@example.com', password: 'password123' };
      const responseWithTenantSlug = {
        ...mockAuthResponse,
        tenantSlug: 'test-tenant-slug',
      };

      mockApiClient.post.mockResolvedValue(responseWithTenantSlug);

      const result = await AuthService.login(credentials);

      expect(mockApiClient.post).toHaveBeenCalledWith('/auth/login', credentials);
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'user',
        JSON.stringify(mockAuthResponse.user)
      );
      expect(document.cookie).toContain('tenantSlug=test-tenant-slug');
      expect(result).toEqual(responseWithTenantSlug);
    });

    it('should not save tenantSlug if not present in response', async () => {
      const credentials = { email: 'test@example.com', password: 'password123' };

      mockApiClient.post.mockResolvedValue(mockAuthResponse);

      const result = await AuthService.login(credentials);

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'user',
        JSON.stringify(mockAuthResponse.user)
      );
      expect(document.cookie).not.toContain('tenantSlug=');
      expect(result).toEqual(mockAuthResponse);
    });

    it('should handle window undefined (SSR)', async () => {
      const credentials = { email: 'test@example.com', password: 'password123' };
      const originalWindow = global.window;
      delete (global as any).window;

      mockApiClient.post.mockResolvedValue(mockAuthResponse);

      const result = await AuthService.login(credentials);

      expect(mockLocalStorage.setItem).not.toHaveBeenCalled();
      expect(document.cookie).toBe('');
      expect(result).toEqual(mockAuthResponse);

      global.window = originalWindow;
    });
  });

  describe('logout', () => {
    it('should clear localStorage and cookie on logout', async () => {
      mockApiClient.post.mockResolvedValue(undefined);

      await AuthService.logout();

      expect(mockApiClient.post).toHaveBeenCalledWith('/auth/logout');
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('user');
      expect(document.cookie).toContain('tenantSlug=;');
      expect(document.cookie).toContain('expires=Thu, 01 Jan 1970');
    });

    it('should handle logout API error gracefully', async () => {
      mockApiClient.post.mockRejectedValue(new Error('API Error'));

      await AuthService.logout();

      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('user');
      expect(document.cookie).toContain('tenantSlug=;');
    });

    it('should handle window undefined (SSR)', async () => {
      const originalWindow = global.window;
      delete (global as any).window;

      mockApiClient.post.mockResolvedValue(undefined);

      await AuthService.logout();

      expect(mockLocalStorage.removeItem).not.toHaveBeenCalled();
      expect(document.cookie).toBe('');

      global.window = originalWindow;
    });
  });

  describe('register', () => {
    it('should save user and tenantSlug on successful registration', async () => {
      const registerData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        tenantName: 'Test Tenant',
      };
      const responseWithTenantSlug = {
        ...mockAuthResponse,
        tenantSlug: 'new-tenant-slug',
      };

      mockApiClient.post.mockResolvedValue(responseWithTenantSlug);

      const result = await AuthService.register(registerData);

      expect(mockApiClient.post).toHaveBeenCalledWith('/auth/register', registerData);
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'user',
        JSON.stringify(mockAuthResponse.user)
      );
      expect(document.cookie).toContain('tenantSlug=new-tenant-slug');
      expect(result).toEqual(responseWithTenantSlug);
    });
  });

  describe('getCurrentUser', () => {
    it('should return parsed user from localStorage', () => {
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(mockAuthResponse.user));

      const result = AuthService.getCurrentUser();

      expect(mockLocalStorage.getItem).toHaveBeenCalledWith('user');
      expect(result).toEqual(mockAuthResponse.user);
    });

    it('should return null when user not found in localStorage', () => {
      mockLocalStorage.getItem.mockReturnValue(null);

      const result = AuthService.getCurrentUser();

      expect(result).toBe(null);
    });

    it('should return null on JSON parse error', () => {
      mockLocalStorage.getItem.mockReturnValue('invalid-json');
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      const result = AuthService.getCurrentUser();

      expect(result).toBe(null);
      expect(consoleSpy).toHaveBeenCalledWith(
        'Error parsing user from localStorage:',
        expect.any(Error)
      );

      consoleSpy.mockRestore();
    });

    it('should handle window undefined (SSR)', () => {
      const originalWindow = global.window;
      delete (global as any).window;

      const result = AuthService.getCurrentUser();

      expect(result).toBe(null);
      expect(mockLocalStorage.getItem).not.toHaveBeenCalled();

      global.window = originalWindow;
    });
  });

  describe('isAuthenticated', () => {
    it('should return true when user exists', () => {
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(mockAuthResponse.user));

      const result = AuthService.isAuthenticated();

      expect(result).toBe(true);
    });

    it('should return false when user does not exist', () => {
      mockLocalStorage.getItem.mockReturnValue(null);

      const result = AuthService.isAuthenticated();

      expect(result).toBe(false);
    });

    it('should handle window undefined (SSR)', () => {
      const originalWindow = global.window;
      delete (global as any).window;

      const result = AuthService.isAuthenticated();

      expect(result).toBe(false);

      global.window = originalWindow;
    });
  });

  describe('refreshTokens', () => {
    it('should update user and tenantSlug on successful refresh', async () => {
      const newAuthResponse = {
        ...mockAuthResponse,
        user: { ...mockAuthResponse.user, name: 'Updated User' },
        tenantSlug: 'updated-tenant-slug',
      };

      mockApiClient.post.mockResolvedValue(newAuthResponse);

      const result = await AuthService.refreshTokens();

      expect(mockApiClient.post).toHaveBeenCalledWith('/auth/refresh');
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'user',
        JSON.stringify(newAuthResponse.user)
      );
      expect(document.cookie).toContain('tenantSlug=updated-tenant-slug');
      expect(result).toEqual(newAuthResponse);
    });

    it('should handle refresh error and logout', async () => {
      mockApiClient.post.mockRejectedValue(new Error('Refresh failed'));
      const logoutSpy = jest.spyOn(AuthService, 'logout');

      const result = await AuthService.refreshTokens();

      expect(result).toBe(null);
      expect(logoutSpy).toHaveBeenCalled();

      logoutSpy.mockRestore();
    });

    it('should handle window undefined (SSR)', async () => {
      const originalWindow = global.window;
      delete (global as any).window;

      const result = await AuthService.refreshTokens();

      expect(result).toBe(null);
      expect(mockLocalStorage.setItem).not.toHaveBeenCalled();

      global.window = originalWindow;
    });
  });

  describe('getAccessToken', () => {
    it('should return null (tokens are HttpOnly)', () => {
      const result = AuthService.getAccessToken();
      expect(result).toBe(null);
    });

    it('should handle window undefined (SSR)', () => {
      const originalWindow = global.window;
      delete (global as any).window;

      const result = AuthService.getAccessToken();
      expect(result).toBe(null);

      global.window = originalWindow;
    });
  });
});
