import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import 'remixicon/fonts/remixicon.css';
import '../src/styles/global.css';
import { store } from '@/app/store.ts';
import { Provider } from 'react-redux';
import 'react-tooltip/dist/react-tooltip.css';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <App />
        <ReactQueryDevtools />
      </Provider>
    </QueryClientProvider>
  </StrictMode>
);
