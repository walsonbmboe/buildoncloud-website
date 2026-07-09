// src/utils/seo.ts
// Helper functions for generating meta tags, Open Graph, Twitter Card, and JSON-LD structured data

import type { SEOMetadata } from '../types';

/**
 * Default SEO values used as fallbacks when page-specific metadata is not available.
 */
const defaults = {
  title: 'BuildOnCloud Technologies',
  description:
    'Empowering businesses through cloud engineering, AI solutions, and digital transformation.',
  ogImage: 'https://buildoncloud.co.uk/images/og-default.png',
  ogUrl: 'https://buildoncloud.co.uk',
};

export interface MetaTag {
  name?: string;
  property?: string;
  content: string;
}

/**
 * Generates an array of meta tag objects from SEO metadata.
 * Includes standard meta, Open Graph, and Twitter Card tags.
 */
export function generateMetaTags(metadata: SEOMetadata): MetaTag[] {
  const title = metadata.title || defaults.title;
  const description = metadata.description || defaults.description;
  const ogImage = metadata.ogImage || defaults.ogImage;
  const ogUrl = metadata.ogUrl || defaults.ogUrl;

  const tags: MetaTag[] = [
    // Standard meta
    { name: 'description', content: description },
    // Open Graph
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: ogUrl },
    { property: 'og:image', content: ogImage },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'BuildOnCloud Technologies' },
    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: ogImage },
  ];

  // Add keywords if present
  if (metadata.keywords && metadata.keywords.length > 0) {
    tags.push({ name: 'keywords', content: metadata.keywords.join(', ') });
  }

  return tags;
}

/**
 * Generates Organization JSON-LD structured data.
 */
export function generateOrganizationJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'BuildOnCloud Technologies',
    url: 'https://buildoncloud.co.uk',
    logo: 'https://buildoncloud.co.uk/images/logo.png',
    description: 'Empowering businesses through Cloud, AI & Digital Transformation',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+44-7000-000000',
      contactType: 'customer service',
    },
    sameAs: [
      'https://www.linkedin.com/company/buildoncloud',
      'https://www.facebook.com/buildoncloud',
    ],
  };
}

/**
 * Generates Service JSON-LD structured data for BuildOnCloud's offerings.
 */
export function generateServiceJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Technology Consulting',
    provider: {
      '@type': 'Organization',
      name: 'BuildOnCloud Technologies',
      url: 'https://buildoncloud.co.uk',
    },
    areaServed: {
      '@type': 'Country',
      name: 'United Kingdom',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Cloud & AI Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Cloud Engineering',
            description: 'AWS cloud infrastructure design, migration, and management.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'AI Solutions',
            description: 'Custom AI and machine learning solutions for business automation.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Web Development',
            description: 'Professional, responsive websites and web applications.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Digital Transformation',
            description: 'End-to-end digital strategy and process automation.',
          },
        },
      ],
    },
  };
}

/**
 * Returns default SEO metadata values for fallback use.
 */
export function getDefaultSEO(): SEOMetadata {
  return {
    title: defaults.title,
    description: defaults.description,
    ogImage: defaults.ogImage,
    ogUrl: defaults.ogUrl,
  };
}
