'use client';

import Navbar from '@/components/Navbar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as React from 'react';
import { Toaster } from 'sonner';
import { AuthProvider } from './auth-provider';
import { ThemeProvider } from './theme-provider';

interface RootProviderProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

export function RootProvider({ children }: RootProviderProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <Navbar />
          {children}
          <Toaster position="top-right" richColors />
        </QueryClientProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
