'use client';

import { useEffect } from 'react';
import { useAuthStore } from '../stores/auth-store';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return <>{children}</>;
} 