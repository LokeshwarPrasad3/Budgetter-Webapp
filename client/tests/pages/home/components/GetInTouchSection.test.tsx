import { render, screen } from '../../../wrapper';
import GetInTouchSection from '../../../../src/components/home/GetInTouchSection';
import { it, describe, expect } from 'vitest';

describe('GetInTouchSection', () => {
  it('should render the heading and description', () => {
    render(<GetInTouchSection />);
    expect(
      screen.getByRole('heading', { name: /get in touch/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/hear from you/i)).toBeInTheDocument();
  });
});
