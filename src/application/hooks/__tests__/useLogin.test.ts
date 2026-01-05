import { renderHook, act } from '@testing-library/react';
import { useLogin } from '../useLogin';
import { useRouter } from 'next/navigation';
import { authService } from '@/application/services/auth-service';
import { AuthResponse, UserRole } from '@/domain/types';

// Mock do useRouter
jest.mock('next/navigation');
const mockPush = jest.fn();
const mockRouter = {
  push: mockPush,
} as any;

// Mock do authService
jest.mock('@/application/services/auth-service');
const mockAuthService = authService as jest.Mocked<typeof authService>;

describe('useLogin', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  describe('login success', () => {
    it('should call authService.login and redirect to dashboard', async () => {
      const credentials = { email: 'test@example.com', password: 'password123' };
      const mockAuthResponse: AuthResponse = {
        user: { 
          id: '1', 
          email: 'test@example.com', 
          name: 'Test User', 
          tenantId: 'tenant1', 
          role: UserRole.ADMIN,
          isActive: true,
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z'
        },
        accessToken: 'token123',
        refreshToken: 'refresh123',
        expiresIn: 3600
      };
      mockAuthService.login.mockResolvedValue(mockAuthResponse);

      const { result } = renderHook(() => useLogin());

      await act(async () => {
        await result.current.login(credentials);
      });

      expect(mockAuthService.login).toHaveBeenCalledWith(credentials);
      expect(mockPush).toHaveBeenCalledWith('/dashboard');
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBe(null);
    });
  });

  describe('login error', () => {
    it('should handle ApiClientError', async () => {
      const credentials = { email: 'test@example.com', password: 'wrongpassword' };
      const error = new Error('Invalid credentials');
      error.name = 'ApiClientError';
      (error as any).errorCode = 'INVALID_CREDENTIALS';
      (error as any).message = 'Invalid credentials';
      (error as any).params = {};

      mockAuthService.login.mockRejectedValue(error);

      const { result } = renderHook(() => useLogin());

      await act(async () => {
        try {
          await result.current.login(credentials);
        } catch (err) {
          // Expected to throw
        }
      });

      expect(mockAuthService.login).toHaveBeenCalledWith(credentials);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeTruthy();
    });

    it('should handle generic Error', async () => {
      const credentials = { email: 'test@example.com', password: 'password123' };
      const error = new Error('Network error');
      mockAuthService.login.mockRejectedValue(error);

      const { result } = renderHook(() => useLogin());

      await act(async () => {
        try {
          await result.current.login(credentials);
        } catch (err) {
          // Expected to throw
        }
      });

      expect(mockAuthService.login).toHaveBeenCalledWith(credentials);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBe('Network error');
    });
  });

  describe('loading state', () => {
    it('should set loading to true during login', async () => {
      const credentials = { email: 'test@example.com', password: 'password123' };
      const mockAuthResponse: AuthResponse = {
        user: { 
          id: '1', 
          email: 'test@example.com', 
          name: 'Test User', 
          tenantId: 'tenant1', 
          role: UserRole.ADMIN,
          isActive: true,
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z'
        },
        accessToken: 'token123',
        refreshToken: 'refresh123',
        expiresIn: 3600
      };
      let resolvePromise: (value: AuthResponse) => void;
      const promise = new Promise<AuthResponse>((resolve) => {
        resolvePromise = resolve;
      });
      mockAuthService.login.mockReturnValue(promise);

      const { result } = renderHook(() => useLogin());

      act(() => {
        result.current.login(credentials);
      });

      expect(result.current.isLoading).toBe(true);

      await act(async () => {
        resolvePromise!(mockAuthResponse);
      });

      expect(result.current.isLoading).toBe(false);
    });
  });

  describe('initial state', () => {
    it('should return initial state', () => {
      const { result } = renderHook(() => useLogin());

      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBe(null);
    });
  });
});
