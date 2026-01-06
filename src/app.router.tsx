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
import { DasboardPage } from './dasboard/pages/DasboardPage';
import { MechanicsPage } from './mechanics/pages/MechanicsPage';
import { AuthCallbackPage } from './auth/pages/callback/callback';
import { ServicesPage } from './services/pages/ServicesPage';
import { CustomersPage } from './customers/pages/customers/CustomersPage';
import { VehiclesPage } from './vehicles/pages/VehiclesPage';
import { CustomerPage } from './customers/pages/customer/CustomerPage';
import { LandingPage } from './components/custom/LandingPage';

const MainLayout = lazy(() => import('./receipt/layouts/MainLayout'));

export const AppRouter = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
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
      {
        path: 'callback',
        element: <AuthCallbackPage />,
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
    children: [
      {
        index: true,
        element: <DasboardPage />,
      },
      {
        path: 'mechanics',
        element: <MechanicsPage />,
      },
      {
        path: 'service-receipts',
        element: <ServiceReceiptPage />,
      },
      {
        path: 'services',
        element: <ServicesPage />,
      },
      {
        path: 'customers',
        element: <CustomersPage />,
      },
      {
        path: 'customers/:id',
        element: <CustomerPage />,
      },
      {
        path: 'vehicles',
        element: <VehiclesPage />,
      },
    ],
  },
  {
    path: '*',
    element: <div>404 Not Found</div>,
  },
]);
