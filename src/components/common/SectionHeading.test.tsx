import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SectionHeading from './SectionHeading';

describe('SectionHeading', () => {
  it('renders the title with gradient-text class', () => {
    render(<SectionHeading title="Our Services" />);
    const heading = screen.getByRole('heading', { name: 'Our Services' });
    expect(heading).toBeInTheDocument();
    expect(heading.className).toContain('gradient-text');
  });

  it('renders subtitle when provided', () => {
    render(
      <SectionHeading title="About Us" subtitle="Learn more about our team" />
    );
    expect(screen.getByText('Learn more about our team')).toBeInTheDocument();
  });

  it('does not render subtitle when not provided', () => {
    const { container } = render(<SectionHeading title="Title Only" />);
    const paragraphs = container.querySelectorAll('p');
    expect(paragraphs).toHaveLength(0);
  });

  it('applies text-center when centered is true', () => {
    const { container } = render(
      <SectionHeading title="Centered" centered />
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain('text-center');
  });

  it('does not apply text-center when centered is false', () => {
    const { container } = render(<SectionHeading title="Left" />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).not.toContain('text-center');
  });

  it('renders subtitle with secondary text color', () => {
    render(
      <SectionHeading title="Test" subtitle="A subtitle" />
    );
    const subtitle = screen.getByText('A subtitle');
    expect(subtitle.className).toContain('text-body');
  });
});
