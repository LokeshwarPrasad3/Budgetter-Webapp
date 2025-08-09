// src/tests/utils/test-utils.tsx
import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { setupStore } from '../../src/app/store';

// Mock Google Client ID for tests
const GoogleClientID = 'test-google-client-id';

// Create a fresh QueryClient per test to avoid cache leakage
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false }, // disables retries to speed up tests
    },
  });

function AllProviders({ children }: { children: React.ReactNode }) {
  const queryClient = createTestQueryClient();
  const testStore = setupStore(); // fresh Redux store per test
  return (
    <GoogleOAuthProvider clientId={GoogleClientID}>
      <QueryClientProvider client={queryClient}>
        <Provider store={testStore}>{children}</Provider>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
}

// Custom render that wraps in all providers
const customRender = (ui: React.ReactElement, options = {}) =>
  render(ui, { wrapper: AllProviders, ...options });

// Re-export everything from testing libraries
export * from '@testing-library/react';
export * from '@testing-library/jest-dom/vitest';
export { customRender as render };
