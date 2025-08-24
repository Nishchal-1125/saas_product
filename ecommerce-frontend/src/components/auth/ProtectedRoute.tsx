'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  roles?: string[];
  permissions?: string[];
  fallbackPath?: string;
  requireAuth?: boolean;
}

export default function ProtectedRoute({
  children,
  roles = [],
  permissions = [],
  fallbackPath = '/auth/login',
  requireAuth = true,
}: ProtectedRouteProps) {
  const { user, isLoading, isAuthenticated, hasRole, hasPermission } = useAuth();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Wait for auth to finish loading
    if (isLoading) return;

    // Check authentication requirement
    if (requireAuth && !isAuthenticated) {
      router.push(fallbackPath);
      return;
    }

    // If no specific roles or permissions required, user is authorized
    if (roles.length === 0 && permissions.length === 0) {
      setIsAuthorized(true);
      return;
    }

    // Check role-based authorization
    if (roles.length > 0) {
      const hasRequiredRole = hasRole(roles);
      if (!hasRequiredRole) {
        router.push('/unauthorized');
        return;
      }
    }

    // Check permission-based authorization
    if (permissions.length > 0) {
      const hasRequiredPermission = permissions.some(permission => hasPermission(permission));
      if (!hasRequiredPermission) {
        router.push('/unauthorized');
        return;
      }
    }

    setIsAuthorized(true);
  }, [user, isLoading, isAuthenticated, roles, permissions, router, fallbackPath, requireAuth, hasRole, hasPermission]);

  // Show loading spinner while checking authorization
  if (isLoading || !isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return <>{children}</>;
}

// Higher-order component for easier usage
export function withProtectedRoute<T extends object>(
  Component: React.ComponentType<T>,
  options?: Omit<ProtectedRouteProps, 'children'>
) {
  return function ProtectedComponent(props: T) {
    return (
      <ProtectedRoute {...options}>
        <Component {...props} />
      </ProtectedRoute>
    );
  };
}
