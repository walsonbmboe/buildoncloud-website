// src/utils/seo.test.ts
import { describe, it, expect } from 'vitest';
import {
  generateMetaTags,
  generateOrganizationJsonLd,
  generateServiceJsonLd,
  getDefaultSEO,
} from './seo';
import type { SEOMetadata } from '../types';

describe('generateMetaTags', () => {
  it('generates correct meta tags from full metadata', () => {
    const metadata: SEOMetadata = {
      title: 'Test Page | BuildOnCloud',
      description: 'A test description for the page.',
      ogImage: 'https://buildoncloud.co.uk/images/test.png',
      ogUrl: 'https://buildoncloud.co.uk/test',
      keywords: ['test', 'seo', 'meta'],
    };

    const tags = generateMetaTags(metadata);

    expect(tags).toContainEqual({ name: 'description', content: metadata.description });
    expect(tags).toContainEqual({ property: 'og:title', content: metadata.title });
    expect(tags).toContainEqual({ property: 'og:description', content: metadata.description });
    expect(tags).toContainEqual({ property: 'og:url', content: metadata.ogUrl });
    expect(tags).toContainEqual({ property: 'og:image', content: metadata.ogImage });
    expect(tags).toContainEqual({ property: 'og:type', content: 'website' });
    expect(tags).toContainEqual({ name: 'twitter:card', content: 'summary_large_image' });
    expect(tags).toContainEqual({ name: 'twitter:title', content: metadata.title });
    expect(tags).toContainEqual({ name: 'twitter:description', content: metadata.description });
    expect(tags).toContainEqual({ name: 'keywords', content: 'test, seo, meta' });
  });

  it('uses defaults when fields are missing', () => {
    const metadata: SEOMetadata = {
      title: '',
      description: '',
      ogUrl: '',
    };

    const tags = generateMetaTags(metadata);

    // Falls back to defaults
    const ogTitle = tags.find((t) => t.property === 'og:title');
    expect(ogTitle?.content).toBe('BuildOnCloud Technologies');

    const desc = tags.find((t) => t.name === 'description');
    expect(desc?.content).toContain('Empowering businesses');
  });

  it('omits keywords tag when keywords array is empty', () => {
    const metadata: SEOMetadata = {
      title: 'Test',
      description: 'Desc',
      ogUrl: 'https://buildoncloud.co.uk',
      keywords: [],
    };

    const tags = generateMetaTags(metadata);
    const keywordsTag = tags.find((t) => t.name === 'keywords');
    expect(keywordsTag).toBeUndefined();
  });
});

describe('generateOrganizationJsonLd', () => {
  it('returns valid Organization schema', () => {
    const schema = generateOrganizationJsonLd();

    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('Organization');
    expect(schema.name).toBe('BuildOnCloud Technologies');
    expect(schema.url).toBe('https://buildoncloud.co.uk');
    expect(schema.logo).toBeDefined();
    expect(schema.contactPoint).toBeDefined();
    expect(schema.sameAs).toBeInstanceOf(Array);
  });
});

describe('generateServiceJsonLd', () => {
  it('returns valid Service schema', () => {
    const schema = generateServiceJsonLd();

    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('Service');
    expect(schema.serviceType).toBe('Technology Consulting');
    expect(schema.provider).toBeDefined();
    expect(schema.hasOfferCatalog).toBeDefined();
  });

  it('includes service offerings in the catalog', () => {
    const schema = generateServiceJsonLd();
    const catalog = schema.hasOfferCatalog as Record<string, unknown>;
    const items = catalog.itemListElement as Array<Record<string, unknown>>;

    expect(items.length).toBeGreaterThanOrEqual(3);
    items.forEach((item) => {
      expect(item['@type']).toBe('Offer');
      expect(item.itemOffered).toBeDefined();
    });
  });
});

describe('getDefaultSEO', () => {
  it('returns sensible default metadata', () => {
    const defaults = getDefaultSEO();

    expect(defaults.title).toBe('BuildOnCloud Technologies');
    expect(defaults.description).toContain('Empowering businesses');
    expect(defaults.ogUrl).toBe('https://buildoncloud.co.uk');
  });
});
