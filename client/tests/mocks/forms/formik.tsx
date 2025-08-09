// mocks/forms/formik.ts
import { vi } from 'vitest';

export const formikMock = {
  useFormik: () => ({
    values: { name: '', email: '', message: '' },
    errors: {},
    touched: {},
    handleBlur: vi.fn(),
    handleChange: vi.fn(),
    handleSubmit: vi.fn((e?: any) => e && e.preventDefault()),
    setFieldValue: vi.fn(),
    resetForm: vi.fn(),
  }),
};

export const setupFormikMock = () => {
  vi.mock('formik', () => ({
    __esModule: true,
    ...formikMock,
  }));
};
