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
import { GoogleOAuthProvider } from '@react-oauth/google';
const GoogleClientID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={GoogleClientID}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <App />
          <ReactQueryDevtools />
        </Provider>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
