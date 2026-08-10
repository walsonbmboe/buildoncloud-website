import type { SEOMetadata } from '../types';

export const pageSEO: Record<string, SEOMetadata> = {
  home: {
    title: 'BuildOnCloud | Cloud, AI & Transformation',
    description:
      'Empowering businesses through cloud engineering, AI solutions, and digital transformation. Professional websites, automation, and AWS training. Proudly serving clients across Africa, Europe, and beyond.',
    ogUrl: 'https://buildoncloud.co.uk/',
    keywords: ['cloud engineering', 'AI solutions', 'digital transformation', 'web development', 'AWS training'],
    structuredData: {
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
    },
  },
  portfolio: {
    title: 'Our Work | BuildOnCloud Portfolio',
    description:
      'Explore our portfolio of websites, AI solutions, and cloud projects. See how we help businesses succeed with modern technology.',
    ogUrl: 'https://buildoncloud.co.uk/portfolio',
    keywords: ['portfolio', 'web development projects', 'AI projects', 'case studies'],
  },
  about: {
    title: 'About Us | BuildOnCloud Technologies',
    description:
      'Learn about our mission to empower businesses through cloud, AI, and digital transformation. Headquartered in Cameroon, serving clients globally.',
    ogUrl: 'https://buildoncloud.co.uk/about',
    keywords: ['about', 'team', 'mission', 'cloud company', 'technology partner'],
  },
  pricing: {
    title: 'Pricing Plans | BuildOnCloud Services',
    description:
      'Transparent pricing for websites, AI solutions, and cloud services. Starter, Professional, and Enterprise packages to fit your budget.',
    ogUrl: 'https://buildoncloud.co.uk/pricing',
    keywords: ['pricing', 'web development cost', 'service packages', 'affordable websites'],
  },
  blog: {
    title: 'Blog | BuildOnCloud Insights & Guides',
    description:
      'Expert articles on web development, AI, cloud computing, and business automation. Stay informed with BuildOnCloud Technologies.',
    ogUrl: 'https://buildoncloud.co.uk/blog',
    keywords: ['blog', 'tech articles', 'cloud computing', 'AI insights', 'web development tips'],
  },
  contact: {
    title: 'Contact Us | Get in Touch with BuildOnCloud',
    description:
      'Ready to start your project? Contact BuildOnCloud Technologies for a free consultation on websites, AI, cloud, or automation services.',
    ogUrl: 'https://buildoncloud.co.uk/contact',
    keywords: ['contact', 'get in touch', 'free consultation', 'project enquiry'],
  },
  services: {
    title: 'Our Services | BuildOnCloud Technologies',
    description:
      'Explore our full range of services including website development, AI solutions, cloud engineering, business automation, custom software, and AWS training.',
    ogUrl: 'https://buildoncloud.co.uk/services',
    keywords: ['services', 'web development', 'AI chatbots', 'cloud engineering', 'business automation', 'AWS training', 'custom software'],
  },
};
