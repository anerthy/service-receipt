import { createBrowserRouter } from 'react-router';
import { ServiceReceiptPage } from './features/receipt/pages/ServiceReceiptPage';
import { NewServiceReceiptPage } from './features/receipt/pages/NewServiceReceiptPage';
import { lazy } from 'react';

const MainLayout = lazy(() => import('./features/receipt/layouts/MainLayout'));

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
    path: '*',
    element: <div>404 Not Found</div>,
  },
]);
