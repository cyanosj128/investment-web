import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import FileRoutes from './routes';
/**
 * 수정 금지
 */

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <FileRoutes />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
