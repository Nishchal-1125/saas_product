'use client';

import React, { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

interface PublicRouteProps {
  children: ReactNode;
  redirectPath?: string;
}

export default function PublicRoute({
  children,
  redirectPath = '/',
}: PublicRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Wait for auth to finish loading
    if (isLoading) return;

    // If user is authenticated, redirect to specified path
    if (isAuthenticated) {
      router.push(redirectPath);
      return;
    }
  }, [isAuthenticated, isLoading, router, redirectPath]);

  // Show loading spinner while checking authorization
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Don't render children if user is authenticated (they'll be redirected)
  if (isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}

// Higher-order component for easier usage
export function withPublicRoute<T extends object>(
  Component: React.ComponentType<T>,
  options?: Omit<PublicRouteProps, 'children'>
) {
  return function PublicComponent(props: T) {
    return (
      <PublicRoute {...options}>
        <Component {...props} />
      </PublicRoute>
    );
  };
}
