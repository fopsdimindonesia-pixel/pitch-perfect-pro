import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from '@/components/ui/badge';

describe('Badge Component', () => {
  it('should render badge with text', () => {
    render(<Badge>Test Badge</Badge>);
    const badge = screen.getByText('Test Badge');
    expect(badge).toBeTruthy();
  });

  it('should render with default variant', () => {
    const { container } = render(<Badge>Default</Badge>);
    const badge = container.querySelector('div');
    expect(badge).toBeTruthy();
  });

  it('should support variant prop', () => {
    const { container } = render(<Badge variant="secondary">Secondary</Badge>);
    const badge = container.querySelector('div');
    expect(badge).toBeTruthy();
    expect(screen.getByText('Secondary')).toBeTruthy();
  });

  it('should support additional className', () => {
    const { container } = render(
      <Badge className="custom-class">Custom</Badge>
    );
    const badge = container.querySelector('.custom-class');
    expect(badge).toBeTruthy();
  });
});
