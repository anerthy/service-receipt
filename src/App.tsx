import { RouterProvider } from 'react-router';
import { AppRouter } from './app.router';
import { ThemeProvider } from '@/components/theme-provider';

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={AppRouter} />
    </ThemeProvider>
  );
}
export default App;
