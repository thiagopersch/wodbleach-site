'use client';

import type React from 'react';

import Loading from '@/app/loading';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function AuthGuard({ children, fallback }: AuthGuardProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;

    if (!session) {
      router.push('/account/login');
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return fallback || <Loading />;
  }

  if (!session) {
    return null;
  }

  return <>{children}</>;
}
