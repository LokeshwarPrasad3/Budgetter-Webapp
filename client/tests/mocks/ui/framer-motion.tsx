import React from 'react';
import { vi } from 'vitest';

// Strip out animation-only props so React doesn’t complain
const filterMotionProps = (props: Record<string, any>) => {
  const {
    variants,
    initial,
    animate,
    whileInView,
    whileHover,
    whileTap,
    transition,
    exit,
    layout,
    ...rest
  } = props;
  return rest;
};

// Generic element factory for any motion tag
const createMotionElement =
  (Tag: keyof JSX.IntrinsicElements) =>
  ({ children, ...props }: React.PropsWithChildren<any>) =>
    React.createElement(Tag, filterMotionProps(props), children);

export const setupFramerMotionMock = () => {
  vi.mock('framer-motion', () => {
    return {
      motion: new Proxy(
        {},
        {
          get: (_, tag: string) =>
            createMotionElement(tag as keyof JSX.IntrinsicElements),
        }
      ),
    };
  });
};
