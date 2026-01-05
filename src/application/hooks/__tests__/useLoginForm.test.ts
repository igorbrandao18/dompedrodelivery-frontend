import { renderHook, act } from '@testing-library/react';
import { useLoginForm } from '../useLoginForm';
import { useLogin } from '../useLogin';

// Mock do useLogin
jest.mock('../useLogin');
const mockUseLogin = useLogin as jest.MockedFunction<typeof useLogin>;

describe('useLoginForm', () => {
  const mockLogin = jest.fn();
  const mockIsLoading = false;
  const mockError = null;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseLogin.mockReturnValue({
      login: mockLogin,
      isLoading: mockIsLoading,
      error: mockError,
    });
  });

  describe('initial state', () => {
    it('should return initial form state', () => {
      const { result } = renderHook(() => useLoginForm());

      expect(result.current.formData).toEqual({
        email: '',
        password: '',
      });
      expect(result.current.isLoading).toBe(mockIsLoading);
      expect(result.current.error).toBe(mockError);
    });
  });

  describe('handleInputChange', () => {
    it('should update email field', () => {
      const { result } = renderHook(() => useLoginForm());

      act(() => {
        result.current.handleInputChange('email')('test@example.com');
      });

      expect(result.current.formData.email).toBe('test@example.com');
      expect(result.current.formData.password).toBe('');
    });

    it('should update password field', () => {
      const { result } = renderHook(() => useLoginForm());

      act(() => {
        result.current.handleInputChange('password')('password123');
      });

      expect(result.current.formData.email).toBe('');
      expect(result.current.formData.password).toBe('password123');
    });
  });

  describe('handleSubmit', () => {
    it('should call login with form data when valid', async () => {
      const { result } = renderHook(() => useLoginForm());

      // Set form data
      act(() => {
        result.current.handleInputChange('email')('test@example.com');
        result.current.handleInputChange('password')('password123');
      });

      const mockEvent = {
        preventDefault: jest.fn(),
      } as any;

      await act(async () => {
        await result.current.handleSubmit(mockEvent);
      });

      expect(mockEvent.preventDefault).toHaveBeenCalled();
      expect(mockLogin).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });

    it('should not call login when email is empty', async () => {
      const { result } = renderHook(() => useLoginForm());

      const mockEvent = {
        preventDefault: jest.fn(),
      } as any;

      await act(async () => {
        await result.current.handleSubmit(mockEvent);
      });

      expect(mockEvent.preventDefault).toHaveBeenCalled();
      expect(mockLogin).not.toHaveBeenCalled();
    });

    it('should not call login when password is empty', async () => {
      const { result } = renderHook(() => useLoginForm());

      // Set only email
      act(() => {
        result.current.handleInputChange('email')('test@example.com');
      });

      const mockEvent = {
        preventDefault: jest.fn(),
      } as any;

      await act(async () => {
        await result.current.handleSubmit(mockEvent);
      });

      expect(mockEvent.preventDefault).toHaveBeenCalled();
      expect(mockLogin).not.toHaveBeenCalled();
    });

    it('should handle login error gracefully', async () => {
      const loginError = new Error('Invalid credentials');
      mockLogin.mockRejectedValue(loginError);

      const { result } = renderHook(() => useLoginForm());

      // Set form data
      act(() => {
        result.current.handleInputChange('email')('test@example.com');
        result.current.handleInputChange('password')('wrongpassword');
      });

      const mockEvent = {
        preventDefault: jest.fn(),
      } as any;

      await act(async () => {
        try {
          await result.current.handleSubmit(mockEvent);
        } catch (error) {
          // Expected to throw
        }
      });

      expect(mockEvent.preventDefault).toHaveBeenCalled();
      expect(mockLogin).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'wrongpassword',
      });
    });
  });

  describe('loading and error propagation', () => {
    it('should propagate loading state from useLogin', () => {
      mockUseLogin.mockReturnValue({
        login: mockLogin,
        isLoading: true,
        error: null,
      });

      const { result } = renderHook(() => useLoginForm());

      expect(result.current.isLoading).toBe(true);
    });

    it('should propagate error from useLogin', () => {
      const errorMessage = 'Login failed';
      mockUseLogin.mockReturnValue({
        login: mockLogin,
        isLoading: false,
        error: errorMessage,
      });

      const { result } = renderHook(() => useLoginForm());

      expect(result.current.error).toBe(errorMessage);
    });
  });
});
