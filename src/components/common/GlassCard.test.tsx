import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import GlassCard from './GlassCard';

describe('GlassCard', () => {
  it('renders children content', () => {
    render(<GlassCard><p>Test content</p></GlassCard>);
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('applies glassmorphism base classes', () => {
    const { container } = render(<GlassCard><span>Card</span></GlassCard>);
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain('bg-white');
    expect(card.className).toContain('border-gray-200');
    expect(card.className).toContain('rounded-2xl');
    expect(card.className).toContain('shadow-md');
  });

  it('accepts and applies custom className', () => {
    const { container } = render(
      <GlassCard className="p-6 mt-4"><span>Card</span></GlassCard>
    );
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain('p-6');
    expect(card.className).toContain('mt-4');
  });

  it('renders a static div when hover is false', () => {
    const { container } = render(<GlassCard><span>Static</span></GlassCard>);
    const card = container.firstChild as HTMLElement;
    expect(card.tagName).toBe('DIV');
  });

  it('renders a motion div when hover is true', () => {
    const { container } = render(
      <GlassCard hover><span>Animated</span></GlassCard>
    );
    const card = container.firstChild as HTMLElement;
    // Framer Motion renders a div with motion styles
    expect(card.tagName).toBe('DIV');
    expect(card.className).toContain('bg-white');
  });
});
