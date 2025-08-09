import { vi } from 'vitest';

// Mock implementation for framer animation properties
export const framerPropertiesMock = {
  ANIMATE_WORDS_VARIENT: {},
  FADE_UP_DESCRIPTION: {},
  FOOTER_ANIMATION: {},
  UPWARD_WAVE_SCALE_HEADING_ANIMATION: {},
};

// Setup the mock for vitest
export const setupFramerPropertiesMock = () => {
  vi.mock('@/utils/framer/properties', () => framerPropertiesMock);
};
