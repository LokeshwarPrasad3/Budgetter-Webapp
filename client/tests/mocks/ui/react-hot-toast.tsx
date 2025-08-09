import { vi } from 'vitest';

const toastFn = vi.fn();

export const reactHotToastMock = {
  __esModule: true,
  default: Object.assign(toastFn, {
    promise: vi.fn(),
    success: vi.fn(),
    error: vi.fn(),
    loading: vi.fn(),
  }),
};

export const setupReactHotToastMock = () => {
  vi.mock('react-hot-toast', () => reactHotToastMock);
};
