// src/components/common/SEO.test.tsx
import { render, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { HelmetProvider } from 'react-helmet-async';
import SEO from './SEO';

function renderSEO(pageKey: string, overrides?: Parameters<typeof SEO>[0]['overrides']) {
  return render(
    <HelmetProvider>
      <SEO pageKey={pageKey} overrides={overrides} />
    </HelmetProvider>
  );
}

describe('SEO Component', () => {
  it('sets the document title for a known page key', async () => {
    renderSEO('home');
    await waitFor(() => {
      expect(document.title).toContain('BuildOnCloud');
    });
  });

  it('sets the document title for about page', async () => {
    renderSEO('about');
    await waitFor(() => {
      expect(document.title).toContain('About Us');
    });
  });

  it('falls back to default for unknown page key', async () => {
    renderSEO('nonexistent-page');
    await waitFor(() => {
      expect(document.title).toContain('BuildOnCloud Technologies');
    });
  });

  it('applies overrides over page data', async () => {
    renderSEO('home', { title: 'Custom Override Title' });
    await waitFor(() => {
      expect(document.title).toBe('Custom Override Title');
    });
  });

  it('renders without errors for all known page keys', () => {
    const keys = ['home', 'portfolio', 'about', 'pricing', 'blog', 'contact'];
    keys.forEach((key) => {
      expect(() => renderSEO(key)).not.toThrow();
    });
  });

  it('injects meta description tag', async () => {
    renderSEO('home');
    await waitFor(() => {
      const metaDesc = document.querySelector('meta[name="description"]');
      expect(metaDesc).not.toBeNull();
      expect(metaDesc?.getAttribute('content')).toContain('Empowering businesses');
    });
  });

  it('injects Open Graph tags', async () => {
    renderSEO('portfolio');
    await waitFor(() => {
      const ogTitle = document.querySelector('meta[property="og:title"]');
      expect(ogTitle).not.toBeNull();
      expect(ogTitle?.getAttribute('content')).toContain('Portfolio');
    });
  });

  it('injects canonical link', async () => {
    renderSEO('contact');
    await waitFor(() => {
      const canonical = document.querySelector('link[rel="canonical"]');
      expect(canonical).not.toBeNull();
      expect(canonical?.getAttribute('href')).toContain('buildoncloud.co.uk/contact');
    });
  });

  it('injects JSON-LD structured data for home page', async () => {
    renderSEO('home');
    await waitFor(() => {
      const script = document.querySelector('script[type="application/ld+json"]');
      expect(script).not.toBeNull();
      const data = JSON.parse(script?.textContent || '{}');
      expect(data['@type']).toBe('Organization');
    });
  });
});
