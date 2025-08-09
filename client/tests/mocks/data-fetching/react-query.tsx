// mocks/data-fetching/react-query.ts
import React from 'react';
import { vi } from 'vitest';

export const reactQueryMock = {
  useMutation: vi.fn(() => ({
    mutate: vi.fn(),
    mutateAsync: vi.fn(),
    isPending: false,
    isSuccess: false,
    isError: false,
    data: null,
    error: null,
  })),
  useQuery: vi.fn(() => ({
    data: null,
    error: null,
    isLoading: false,
    isFetching: false,
    refetch: vi.fn(),
  })),
  QueryClient: vi.fn(), // dummy class
  QueryClientProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
};

export const setupReactQueryMock = () => {
  vi.mock('@tanstack/react-query', () => ({
    __esModule: true,
    ...reactQueryMock,
  }));
};
