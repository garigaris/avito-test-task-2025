import { RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { router } from './routing/router';
import { queryClient } from '../shared/api/config/query-client';
import { AppProvider } from './context/AppContext';
import { ThemeProvider } from './context/ThemeContext'; // <-- исправлено

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AppProvider>
          <RouterProvider router={router} />
        </AppProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
