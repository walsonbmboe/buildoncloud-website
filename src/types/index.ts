// src/types/index.ts
// Shared TypeScript interfaces for BuildOnCloud Technologies website

export interface Service {
  id: string;
  icon: string; // Lucide icon name
  title: string;
  description: string;
  detailedDescription: string;
  features: string[];
  useCases: string[];
  category: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  shortDescription: string; // max 120 chars
  fullDescription: string;
  image: string;
  category: string;
  techStack: string[];
  objectives: string[];
  liveUrl?: string;
  demoUrl?: string;
}

export interface PricingTier {
  id: string;
  name: string;
  price: number;
  currency: string;
  period: string;
  features: string[];
  ctaLabel: string;
  isRecommended: boolean;
}

export interface BlogArticle {
  id: string;
  slug: string;
  title: string; // max 100 chars
  excerpt: string; // max 150 chars
  content: string; // full article markdown/HTML
  category: string;
  keywords: string[];
  featuredImage: string;
  featuredImageAlt: string;
  publishedDate: string; // ISO 8601
  author: string;
}

export interface Testimonial {
  id: string;
  clientName: string; // max 60 chars
  company: string; // max 80 chars
  text: string; // max 300 chars
  avatar: string;
  rating?: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface ContactFormData {
  name: string; // max 100 chars
  email: string; // max 254 chars
  phone: string; // optional, max 20 chars
  subject: string; // max 150 chars
  message: string; // min 10, max 2000 chars
  tier?: string; // pre-filled from pricing
}

export interface ValueProposition {
  id: string;
  icon: string;
  label: string;
  description: string; // max 150 chars
}

export interface StatCounter {
  id: string;
  target: number;
  label: string;
  suffix?: string;
}

export interface NavLink {
  label: string;
  path: string;
  isSection?: boolean;
}

export interface SEOMetadata {
  title: string; // 30-60 chars
  description: string; // 50-160 chars
  ogImage?: string;
  ogUrl: string;
  keywords?: string[];
  structuredData?: Record<string, unknown>;
}
