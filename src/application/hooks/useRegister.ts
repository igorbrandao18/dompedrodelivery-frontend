'use client';

import { useCallback, useState } from 'react';
import { publicRegisterService } from '@/application/services/public-register-service';
import { ApiClientError } from '@/application/services/api-client';
import { t, tError } from '@/i18n';

export function useRegister() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = useCallback(
    async (input: {
      tenantName: string;
      name: string;
      email: string;
      phone?: string;
    }) => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await publicRegisterService.register(input);
        if (data?.tenant?.slug) {
          localStorage.setItem('tenantSlug', data.tenant.slug);
        }
        return data;
      } catch (err) {
        if (err instanceof ApiClientError) {
          setError(tError(err.errorCode, err.message, err.params as Record<string, string | number>));
        } else {
          setError(err instanceof Error ? err.message : t('error.INTERNAL_SERVER_ERROR'));
        }
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  return { register, isLoading, error };
}
