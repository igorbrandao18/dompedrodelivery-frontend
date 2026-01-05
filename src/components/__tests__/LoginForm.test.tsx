import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from '../auth/login/_components/LoginForm';
import { useLoginForm } from '@/application/hooks/useLoginForm';

// Mock do hook useLoginForm
jest.mock('@/application/hooks/useLoginForm');
const mockUseLoginForm = useLoginForm as jest.MockedFunction<typeof useLoginForm>;

// Mock do next/link
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

// Mock do next/image
jest.mock('next/image', () => {
  return ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  );
});

describe('LoginForm', () => {
  const mockHandleSubmit = jest.fn();
  const mockHandleInputChange = jest.fn();
  const mockFormData = {
    email: '',
    password: '',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseLoginForm.mockReturnValue({
      formData: mockFormData,
      isLoading: false,
      error: null,
      handleInputChange: mockHandleInputChange,
      handleSubmit: mockHandleSubmit,
    });
  });

  describe('rendering', () => {
    it('should render all form elements', () => {
      render(<LoginForm />);

      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
      expect(screen.getByText(/não tem uma conta\?/i)).toBeInTheDocument();
      expect(screen.getByText(/esqueceu a senha\?/i)).toBeInTheDocument();
    });

    it('should display logo', () => {
      render(<LoginForm />);
      expect(screen.getByAltText(/logo/i)).toBeInTheDocument();
    });

    it('should show loading state', () => {
      mockUseLoginForm.mockReturnValue({
        formData: mockFormData,
        isLoading: true,
        error: null,
        handleInputChange: mockHandleInputChange,
        handleSubmit: mockHandleSubmit,
      });

      render(<LoginForm />);

      const submitButton = screen.getByRole('button', { name: /processando/i });
      expect(submitButton).toBeDisabled();
      expect(screen.getByText(/processando/i)).toBeInTheDocument();
    });

    it('should display error message', () => {
      const errorMessage = 'Credenciais inválidas';
      mockUseLoginForm.mockReturnValue({
        formData: mockFormData,
        isLoading: false,
        error: errorMessage,
        handleInputChange: mockHandleInputChange,
        handleSubmit: mockHandleSubmit,
      });

      render(<LoginForm />);

      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  describe('form interactions', () => {
    it('should call handleInputChange when email field changes', async () => {
      const user = userEvent.setup();
      render(<LoginForm />);

      const emailInput = screen.getByLabelText(/email/i);
      await user.type(emailInput, 'test@example.com');

      expect(mockHandleInputChange).toHaveBeenCalledWith('email', 'test@example.com');
    });

    it('should call handleInputChange when password field changes', async () => {
      const user = userEvent.setup();
      render(<LoginForm />);

      const passwordInput = screen.getByLabelText(/password/i);
      await user.type(passwordInput, 'password123');

      expect(mockHandleInputChange).toHaveBeenCalledWith('password', 'password123');
    });

    it('should call handleSubmit when form is submitted', async () => {
      const user = userEvent.setup();
      render(<LoginForm />);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: /entrar/i });

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      await user.click(submitButton);

      expect(mockHandleSubmit).toHaveBeenCalled();
    });

    it('should call handleSubmit when Enter key is pressed in password field', async () => {
      const user = userEvent.setup();
      render(<LoginForm />);

      const passwordInput = screen.getByLabelText(/password/i);
      await user.type(passwordInput, 'password123');
      await user.keyboard('{Enter}');

      expect(mockHandleSubmit).toHaveBeenCalled();
    });
  });

  describe('form validation', () => {
    it('should show email validation error', async () => {
      const user = userEvent.setup();
      render(<LoginForm />);

      const emailInput = screen.getByLabelText(/email/i);
      const submitButton = screen.getByRole('button', { name: /entrar/i });

      await user.type(emailInput, 'invalid-email');
      await user.click(submitButton);

      // HTML5 validation should prevent form submission
      expect(mockHandleSubmit).not.toHaveBeenCalled();
    });

    it('should show required field validation', async () => {
      const user = userEvent.setup();
      render(<LoginForm />);

      const submitButton = screen.getByRole('button', { name: /entrar/i });
      await user.click(submitButton);

      // HTML5 validation should prevent form submission
      expect(mockHandleSubmit).not.toHaveBeenCalled();
    });
  });

  describe('accessibility', () => {
    it('should have proper form structure', () => {
      render(<LoginForm />);

      const form = screen.getByRole('form');
      expect(form).toBeInTheDocument();

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: /entrar/i });

      expect(emailInput).toHaveAttribute('type', 'email');
      expect(emailInput).toHaveAttribute('required');
      expect(passwordInput).toHaveAttribute('type', 'password');
      expect(passwordInput).toHaveAttribute('required');
      expect(submitButton).toHaveAttribute('type', 'submit');
    });

    it('should have proper ARIA labels', () => {
      render(<LoginForm />);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);

      expect(emailInput).toHaveAttribute('aria-label', expect.stringContaining(/email/i));
      expect(passwordInput).toHaveAttribute('aria-label', expect.stringContaining(/password/i));
    });

    it('should be keyboard navigable', async () => {
      const user = userEvent.setup();
      render(<LoginForm />);

      const emailInput = screen.getByLabelText(/email/i);
      emailInput.focus();

      await user.tab();
      expect(screen.getByLabelText(/password/i)).toHaveFocus();

      await user.tab();
      expect(screen.getByRole('button', { name: /entrar/i })).toHaveFocus();
    });
  });

  describe('links', () => {
    it('should render register link', () => {
      render(<LoginForm />);

      const registerLink = screen.getByText(/registrar/i);
      expect(registerLink.closest('a')).toHaveAttribute('href', '/auth/register');
    });

    it('should render forgot password link', () => {
      render(<LoginForm />);

      const forgotPasswordLink = screen.getByText(/esqueceu a senha\?/i);
      expect(forgotPasswordLink.closest('a')).toHaveAttribute('href', '#');
    });

    it('should render help link', () => {
      render(<LoginForm />);

      const helpLink = screen.getByText(/precisa de ajuda\?/i);
      expect(helpLink.closest('a')).toHaveAttribute('href', '#');
    });
  });
});
