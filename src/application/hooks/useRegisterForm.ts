'use client';

import { useCallback, useState } from 'react';
import { useRegister } from '@/application/hooks/useRegister';
import { t } from '@/i18n';

interface RegisterFormData {
  name: string;
  email: string;
  tenantName: string;
  phone?: string;
}

export function useRegisterForm() {
  const { register, isLoading } = useRegister();

  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    tenantName: '',
    phone: '',
  });

  const [errors, setErrors] = useState<Partial<RegisterFormData>>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const validate = useCallback((): boolean => {
    const newErrors: Partial<RegisterFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = t('auth.name_required');
    }

    if (!formData.email.trim()) {
      newErrors.email = t('auth.email_required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('auth.email_invalid');
    }

    if (!formData.tenantName.trim()) {
      newErrors.tenantName = t('auth.tenant_name_required');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData.email, formData.name, formData.tenantName]);

  const onChange = useCallback(
    (field: keyof RegisterFormData) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        setFormData((prev) => ({ ...prev, [field]: value }));

        if (errors[field]) {
          setErrors((prev) => ({ ...prev, [field]: undefined }));
        }
      },
    [errors],
  );

  const onSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!validate()) return;

      try {
        await register({
          tenantName: formData.tenantName,
          name: formData.name,
          email: formData.email,
          phone: formData.phone || undefined,
        });
        setShowSuccess(true);
      } catch {
        setErrors((prev) => ({ ...prev, email: t('auth.register_failed') }));
      }
    },
    [formData.email, formData.name, formData.phone, formData.tenantName, register, validate],
  );

  return {
    formData,
    errors,
    showSuccess,
    isLoading,
    onChange,
    onSubmit,
  };
}