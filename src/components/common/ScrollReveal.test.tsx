import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ScrollReveal } from './ScrollReveal';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, animate, initial, variants, transition, ...props }: any) => (
      <div
        data-testid="motion-div"
        data-animate={animate}
        data-initial={initial}
        data-transition={transition ? JSON.stringify(transition) : undefined}
        {...props}
      >
        {children}
      </div>
    ),
  },
  useInView: vi.fn(() => false),
}));

// Mock useReducedMotion
vi.mock('../../hooks/useReducedMotion', () => ({
  useReducedMotion: vi.fn(() => false),
}));

import { useInView } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

describe('ScrollReveal', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useInView as ReturnType<typeof vi.fn>).mockReturnValue(false);
    (useReducedMotion as ReturnType<typeof vi.fn>).mockReturnValue(false);
  });

  it('renders children', () => {
    render(
      <ScrollReveal>
        <p>Hello World</p>
      </ScrollReveal>
    );
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('starts in hidden state', () => {
    render(
      <ScrollReveal>
        <p>Content</p>
      </ScrollReveal>
    );
    const motionDiv = screen.getByTestId('motion-div');
    expect(motionDiv).toHaveAttribute('data-initial', 'hidden');
    expect(motionDiv).toHaveAttribute('data-animate', 'hidden');
  });

  it('animates to visible when in view', () => {
    (useInView as ReturnType<typeof vi.fn>).mockReturnValue(true);

    render(
      <ScrollReveal>
        <p>Content</p>
      </ScrollReveal>
    );
    const motionDiv = screen.getByTestId('motion-div');
    expect(motionDiv).toHaveAttribute('data-animate', 'visible');
  });

  it('passes delay as transition when delay > 0 and not reduced motion', () => {
    (useInView as ReturnType<typeof vi.fn>).mockReturnValue(true);

    render(
      <ScrollReveal delay={0.3}>
        <p>Content</p>
      </ScrollReveal>
    );
    const motionDiv = screen.getByTestId('motion-div');
    expect(motionDiv).toHaveAttribute('data-transition', JSON.stringify({ delay: 0.3 }));
  });

  it('does not add transition delay when reducedMotion is true', () => {
    (useReducedMotion as ReturnType<typeof vi.fn>).mockReturnValue(true);
    (useInView as ReturnType<typeof vi.fn>).mockReturnValue(true);

    render(
      <ScrollReveal delay={0.3}>
        <p>Content</p>
      </ScrollReveal>
    );
    const motionDiv = screen.getByTestId('motion-div');
    expect(motionDiv).not.toHaveAttribute('data-transition');
  });

  it('uses default props when none are specified', () => {
    render(
      <ScrollReveal>
        <p>Content</p>
      </ScrollReveal>
    );
    // Should call useInView with once: true and amount matching default threshold
    expect(useInView).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ once: true, amount: 0.2 })
    );
  });

  it('passes custom threshold to useInView', () => {
    render(
      <ScrollReveal threshold={0.5}>
        <p>Content</p>
      </ScrollReveal>
    );
    expect(useInView).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ once: true, amount: 0.5 })
    );
  });
});
