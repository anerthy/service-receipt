import { createBrowserRouter, Navigate } from 'react-router';
import { lazy } from 'react';
import { ServiceReceiptPage } from './receipt/pages/ServiceReceiptPage';
import { NewServiceReceiptPage } from './receipt/pages/NewServiceReceiptPage';
import {
  AuthenticatedRoute,
  NotAuthenticatedRoute,
} from './components/routes/ProtectedRoutes';
import AuthLayout from './auth/layouts/AuthLayout';
import { LoginPage } from './auth/pages/login/LoginPage';
import { RegisterPage } from './auth/pages/register/RegisterPage';
import { DashboardLayout } from './dasboard/layouts/DashboardLayout';

const MainLayout = lazy(() => import('./receipt/layouts/MainLayout'));

export const AppRouter = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <ServiceReceiptPage />,
      },
      {
        path: 'new-service-receipt',
        element: <NewServiceReceiptPage />,
      },
    ],
  },
  {
    path: '/auth',
    element: (
      <NotAuthenticatedRoute>
        <AuthLayout />
      </NotAuthenticatedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/auth/login" />, // protecting the /auth route
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: '/dashboard',
    element: (
      <AuthenticatedRoute>
        <DashboardLayout />
      </AuthenticatedRoute>
    ),
  },
  {
    path: '*',
    element: <div>404 Not Found</div>,
  },
]);
