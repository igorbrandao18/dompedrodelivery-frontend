import { useState } from 'react';
import { useLogin } from '@/application/hooks/useLogin';

export interface LoginFormData {
  email: string;
  password: string;
}

export interface UseLoginFormReturn {
  formData: LoginFormData;
  isLoading: boolean;
  error: string | null;
  handleInputChange: (field: keyof LoginFormData) => (value: string) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

export function useLoginForm(): UseLoginFormReturn {
  const { login, isLoading, error } = useLogin();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });

  const handleInputChange = (field: keyof LoginFormData) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      return;
    }

    try {
      await login({ email: formData.email, password: formData.password });
    } catch (err) {
      // Error is handled by useLogin hook
    }
  };

  return {
    formData,
    isLoading,
    error,
    handleInputChange,
    handleSubmit,
  };
}