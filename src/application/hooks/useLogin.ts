'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/application/services/auth-service';
import { ApiClientError } from '@/application/services/api-client';
import { t, tError } from '@/i18n';

export function useLogin() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(
    async (input: { email: string; password: string }) => {
      setIsLoading(true);
      setError(null);
      try {
        const tenantSlug = localStorage.getItem('tenantSlug');
        if (!tenantSlug) {
          throw new Error(t('auth.tenant_slug_missing'));
        }

        await authService.login({ email: input.email, password: input.password });
        router.push('/dashboard');
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
    [router],
  );

  return { login, isLoading, error };
}
