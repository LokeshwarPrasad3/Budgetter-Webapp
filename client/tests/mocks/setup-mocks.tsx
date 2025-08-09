import { setupFramerMotionMock } from './ui/framer-motion';
import { setupFramerPropertiesMock } from './ui/framer-properties';
import { setupReactHotToastMock } from './ui/react-hot-toast';
import { setupReactQueryMock } from './data-fetching/react-query';
import { setupFormikMock } from './forms/formik';
import {
  setupLucideReactMock,
  setupUserAuthSchemaMock,
  setupAuthServicesMock,
} from './misc/misc';

/**
 * Setup all mocks at once
 */
export const setupAllMocks = () => {
  setupFramerMotionMock();
  setupFramerPropertiesMock();
  setupReactHotToastMock();
  setupReactQueryMock();
  setupFormikMock();
  setupLucideReactMock();
  setupUserAuthSchemaMock();
  setupAuthServicesMock();
};
