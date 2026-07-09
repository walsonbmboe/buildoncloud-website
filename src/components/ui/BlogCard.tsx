// src/components/ui/BlogCard.tsx
// Blog article card with title, date, category, and excerpt
// Validates: Requirements 12.1, 12.2, 12.6

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { BlogArticle } from '../../types';

interface BlogCardProps {
  article: BlogArticle;
}

function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '\u2026';
}

export default function BlogCard({ article }: BlogCardProps) {
  return (
    <Link
      to={`/blog/${article.slug}`}
      className="block group rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-electric-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
      aria-label={`Read article: ${article.title}`}
    >
      <motion.article
        className="bg-white border border-gray-200 rounded-2xl overflow-hidden h-full flex flex-col shadow-md transition-all hover:border-electric-500/30 hover:shadow-xl"
        whileHover={{ scale: 1.02, y: -4 }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      >
        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          {/* Category Tag + Date */}
          <div className="flex items-center justify-between mb-3">
            <span className="inline-block px-3 py-1 text-xs font-medium uppercase tracking-wider rounded-full bg-blue-50 text-electric-600 border border-blue-100">
              {article.category}
            </span>
            <time
              dateTime={article.publishedDate}
              className="text-sm text-body-muted"
            >
              {formatDate(article.publishedDate)}
            </time>
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-electric-500 transition-colors">
            {truncate(article.title, 100)}
          </h3>

          {/* Excerpt */}
          <p className="text-gray-600 text-sm leading-relaxed flex-1">
            {truncate(article.excerpt, 150)}
          </p>

          {/* Read More indicator */}
          <span className="mt-4 inline-flex items-center text-sm font-medium text-electric-500 group-hover:text-electric-600 transition-colors">
            Read more
            <svg
              className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </motion.article>
    </Link>
  );
}
