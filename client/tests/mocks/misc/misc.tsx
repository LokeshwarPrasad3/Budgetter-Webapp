import React from 'react';
import { vi } from 'vitest';

// Mock implementation for lucide-react
export const lucideReactMock = {
  Loader2: () => <div data-testid="loader-icon">Loading...</div>,
};

// Setup the mock for lucide-react
export const setupLucideReactMock = () => {
  vi.mock('lucide-react', () => lucideReactMock);
};

// Mock implementation for schemas
export const userAuthSchemaMock = {
  contactFormSchema: {},
};

// Setup the mock for schemas
export const setupUserAuthSchemaMock = () => {
  vi.mock('@/schemas/userAuth', () => userAuthSchemaMock);
};

// Mock implementation for services
export const authServicesMock = {
  submitContactForm: vi.fn(),
};

// Setup the mock for services
export const setupAuthServicesMock = () => {
  vi.mock('@/services/auth', () => authServicesMock);
};
