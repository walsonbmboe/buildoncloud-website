import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Navbar } from './Navbar';

// Mock useScrollPosition hook
vi.mock('../../hooks/useScrollPosition', () => ({
  useScrollPosition: vi.fn(() => 0),
}));

// Mock framer-motion to avoid animation timing issues in tests
vi.mock('framer-motion', () => ({
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  motion: {
    div: ({ children, ...props }: any) => {
      const { initial, animate, exit, transition, ...rest } = props;
      return <div {...rest}>{children}</div>;
    },
    nav: ({ children, ...props }: any) => {
      const { initial, animate, exit, transition, ...rest } = props;
      return <nav {...rest}>{children}</nav>;
    },
  },
}));

import { useScrollPosition } from '../../hooks/useScrollPosition';
const mockUseScrollPosition = vi.mocked(useScrollPosition);

function renderNavbar(initialRoute = '/') {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <Navbar />
    </MemoryRouter>
  );
}

describe('Navbar', () => {
  beforeEach(() => {
    mockUseScrollPosition.mockReturnValue(0);
  });

  describe('Structure and Layout', () => {
    it('renders a sticky header with z-50', () => {
      renderNavbar();
      const header = screen.getByRole('banner');
      expect(header.className).toContain('sticky');
      expect(header.className).toContain('top-0');
      expect(header.className).toContain('z-50');
    });

    it('has max-height of 80px', () => {
      renderNavbar();
      const header = screen.getByRole('banner');
      expect(header.style.maxHeight).toBe('80px');
    });

    it('renders logo as a link to home', () => {
      renderNavbar();
      const logoLink = screen.getByLabelText(/BuildOnCloud Technologies - Home/i);
      expect(logoLink).toBeInTheDocument();
      expect(logoLink).toHaveAttribute('href', '/');
    });

    it('renders all navigation links on desktop', () => {
      renderNavbar();
      const links = ['Home', 'Portfolio', 'About', 'Pricing', 'Blog', 'Contact'];
      links.forEach((label) => {
        expect(screen.getAllByText(label).length).toBeGreaterThanOrEqual(1);
      });
    });

    it('has correct navigation aria label', () => {
      renderNavbar();
      expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument();
    });
  });

  describe('Gradient Header Scroll Effect', () => {
    it('renders gradient background when not scrolled', () => {
      mockUseScrollPosition.mockReturnValue(0);
      renderNavbar();
      const header = screen.getByRole('banner');
      expect(header.className).toContain('bg-gradient-to-r');
      expect(header.className).toContain('from-blue-600');
      expect(header.className).not.toContain('shadow-lg');
    });

    it('adds shadow when scrolled past threshold', () => {
      mockUseScrollPosition.mockReturnValue(150);
      renderNavbar();
      const header = screen.getByRole('banner');
      expect(header.className).toContain('bg-gradient-to-r');
      expect(header.className).toContain('shadow-lg');
    });
  });

  describe('Active Link Styling', () => {
    it('highlights Home link when on home page', () => {
      renderNavbar('/');
      const nav = screen.getByRole('navigation', { name: 'Main navigation' });
      const list = nav.querySelector('ul');
      const homeLink = list?.querySelector('a[href="/"]');
      expect(homeLink?.className).toContain('text-white');
      expect(homeLink?.className).toContain('border-white');
    });

    it('highlights About link when on about page', () => {
      renderNavbar('/about');
      const nav = screen.getByRole('navigation', { name: 'Main navigation' });
      const aboutLink = nav.querySelector('a[href="/about"]');
      expect(aboutLink?.className).toContain('text-white');
    });

    it('sets aria-current=page on active link', () => {
      renderNavbar('/pricing');
      const nav = screen.getByRole('navigation', { name: 'Main navigation' });
      const pricingLink = nav.querySelector('a[href="/pricing"]');
      expect(pricingLink).toHaveAttribute('aria-current', 'page');
    });

    it('does not set aria-current on inactive links', () => {
      renderNavbar('/');
      const nav = screen.getByRole('navigation', { name: 'Main navigation' });
      const aboutLink = nav.querySelector('a[href="/about"]');
      expect(aboutLink).not.toHaveAttribute('aria-current');
    });
  });

  describe('Mobile Menu', () => {
    it('renders hamburger button visible on mobile', () => {
      renderNavbar();
      const hamburger = screen.getByLabelText('Open navigation menu');
      expect(hamburger).toBeInTheDocument();
    });

    it('opens mobile menu on hamburger click', () => {
      renderNavbar();
      const hamburger = screen.getByLabelText('Open navigation menu');
      fireEvent.click(hamburger);
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('closes mobile menu on close button click', () => {
      renderNavbar();
      const hamburger = screen.getByLabelText('Open navigation menu');
      fireEvent.click(hamburger);
      const closeButton = screen.getByLabelText('Close navigation menu');
      fireEvent.click(closeButton);
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('hamburger has correct aria-expanded state', () => {
      renderNavbar();
      const hamburger = screen.getByLabelText('Open navigation menu');
      expect(hamburger).toHaveAttribute('aria-expanded', 'false');
      fireEvent.click(hamburger);
      const closeBtn = screen.getByLabelText('Close navigation menu');
      expect(closeBtn).toHaveAttribute('aria-expanded', 'true');
    });

    it('hamburger has aria-controls pointing to mobile menu', () => {
      renderNavbar();
      const hamburger = screen.getByLabelText('Open navigation menu');
      expect(hamburger).toHaveAttribute('aria-controls', 'mobile-menu');
    });
  });

  describe('Keyboard Accessibility', () => {
    it('closes mobile menu on Escape key', () => {
      renderNavbar();
      const hamburger = screen.getByLabelText('Open navigation menu');
      fireEvent.click(hamburger);
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      fireEvent.keyDown(document, { key: 'Escape' });
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('logo link has visible focus ring classes', () => {
      renderNavbar();
      const logoLink = screen.getByLabelText(/BuildOnCloud Technologies - Home/i);
      expect(logoLink.className).toContain('focus-visible:ring-2');
    });

    it('hamburger button has visible focus ring classes', () => {
      renderNavbar();
      const hamburger = screen.getByLabelText('Open navigation menu');
      expect(hamburger.className).toContain('focus-visible:ring-2');
    });
  });
});
