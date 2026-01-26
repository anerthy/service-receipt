import { useAuth } from '@/hooks/use-auth';
import type { PropsWithChildren } from 'react';
import { Navigate } from 'react-router';

export const AuthenticatedRoute = ({ children }: PropsWithChildren) => {
  const { user } = useAuth();

  const status = user ? 'authenticated' : 'not-authenticated';

  // if (status === 'checking') return null;

  if (status === 'not-authenticated') return <Navigate to="/auth/login" />;

  return children;
};

export const NotAuthenticatedRoute = ({ children }: PropsWithChildren) => {
  const { user } = useAuth();

  const status = user ? 'authenticated' : 'not-authenticated';

  // if (status === 'checking') return null;

  if (status === 'authenticated') return <Navigate to="/dashboard" />;

  return children;
};

// AdminRoute
// export const RoleBasedRoute = ({ children }: PropsWithChildren) => {
//   return children;
// };
