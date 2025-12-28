import { RouterProvider } from 'react-router';
import { AppRouter } from './app.router';
import { ThemeProvider } from '@/components/theme-provider';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={AppRouter} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
export default App;
