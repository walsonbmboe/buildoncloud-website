// src/components/common/SEO.tsx
// SEO component that injects Helmet meta tags and JSON-LD structured data per page

import { Helmet } from 'react-helmet-async';
import { pageSEO } from '../../data/seo';
import { generateMetaTags, getDefaultSEO } from '../../utils/seo';
import type { SEOMetadata } from '../../types';

interface SEOProps {
  /** Key matching an entry in pageSEO data (e.g. "home", "about") */
  pageKey: string;
  /** Optional overrides for any SEO fields */
  overrides?: Partial<SEOMetadata>;
}

/**
 * SEO component that reads page-specific metadata from `src/data/seo.ts`
 * and injects title, meta description, Open Graph, Twitter Card tags,
 * and JSON-LD structured data via react-helmet-async.
 *
 * Fallback: if pageKey is not found in pageSEO, uses sensible defaults.
 */
export default function SEO({ pageKey, overrides }: SEOProps) {
  const pageData = pageSEO[pageKey];
  const defaults = getDefaultSEO();

  // Merge: page data > overrides > defaults
  const metadata: SEOMetadata = {
    title: overrides?.title || pageData?.title || defaults.title,
    description: overrides?.description || pageData?.description || defaults.description,
    ogImage: overrides?.ogImage || pageData?.ogImage || defaults.ogImage,
    ogUrl: overrides?.ogUrl || pageData?.ogUrl || defaults.ogUrl,
    keywords: overrides?.keywords || pageData?.keywords || defaults.keywords,
    structuredData: overrides?.structuredData || pageData?.structuredData,
  };

  const metaTags = generateMetaTags(metadata);

  return (
    <Helmet>
      <title>{metadata.title}</title>
      {metaTags.map((tag, index) => {
        if (tag.property) {
          return <meta key={`og-${index}`} property={tag.property} content={tag.content} />;
        }
        return <meta key={`meta-${index}`} name={tag.name} content={tag.content} />;
      })}
      <link rel="canonical" href={metadata.ogUrl} />
      {metadata.structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(metadata.structuredData)}
        </script>
      )}
    </Helmet>
  );
}
