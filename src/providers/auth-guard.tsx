'use client';

import type React from 'react';

import { Loader2 } from 'lucide-react';
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
    if (status === 'loading') return; // Still loading

    if (!session) {
      router.push('/account/login');
      return;
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return (
      fallback || (
        <div className="flex min-h-screen items-center justify-center">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Loading...</span>
          </div>
        </div>
      )
    );
  }

  if (!session) {
    return null; // Will redirect
  }

  return <>{children}</>;
}
