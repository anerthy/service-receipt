import type { PropsWithChildren } from 'react';

export const AuthenticatedRoute = ({ children }: PropsWithChildren) => {
  return children;
};

export const NotAuthenticatedRoute = ({ children }: PropsWithChildren) => {
  return children;
};

// AdminRoute
// export const RoleBasedRoute = ({ children }: PropsWithChildren) => {
//   return children;
// };
