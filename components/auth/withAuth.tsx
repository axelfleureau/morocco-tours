'use client';

import { ComponentType } from 'react';
import ProtectedRoute from './ProtectedRoute';

interface WithAuthOptions {
  requireAdmin?: boolean;
  redirectTo?: string;
  loadingComponent?: React.ReactNode;
}

export function withAuth<T extends object>(
  Component: ComponentType<T>,
  options: WithAuthOptions = {}
) {
  const AuthenticatedComponent = (props: T) => {
    return (
      <ProtectedRoute {...options}>
        <Component {...props} />
      </ProtectedRoute>
    );
  };

  AuthenticatedComponent.displayName = `withAuth(${Component.displayName || Component.name})`;
  
  return AuthenticatedComponent;
}

// Specific HOCs for common use cases
export const withUserAuth = <T extends object>(Component: ComponentType<T>) =>
  withAuth(Component, { requireAdmin: false });

export const withAdminAuth = <T extends object>(Component: ComponentType<T>) =>
  withAuth(Component, { requireAdmin: true });