'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/application/services/auth-service';

export function useLogout() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const logout = useCallback(async () => {
    setIsLoggingOut(true);
    try {
      await authService.logout();
    } finally {
      setIsLoggingOut(false);
      router.replace('/auth/login');
    }
  }, [router]);

  return { logout, isLoggingOut };
}
