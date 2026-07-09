// src/pages/BlogArticlePage.tsx
// Full blog article page with slug-based lookup
// Validates: Requirements 12.6

import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ScrollReveal from '../components/common/ScrollReveal';
import { blogArticles } from '../data/blog';

function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Renders markdown-like content to React elements.
 * Handles ## headings, ### headings, **bold**, bullet lists, and paragraphs.
 */
function renderContent(content: string): React.ReactNode[] {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let currentList: string[] = [];

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`list-${elements.length}`} className="list-disc list-inside space-y-2 text-body leading-relaxed mb-6 ml-2">
          {currentList.map((item, i) => (
            <li key={i}>{renderInlineMarkdown(item)}</li>
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i] as string;

    // Skip empty lines
    if (!line.trim()) {
      flushList();
      continue;
    }

    // ### H3 headings
    if (line.startsWith('### ')) {
      flushList();
      elements.push(
        <h3 key={`h3-${i}`} className="text-xl font-semibold text-heading mt-8 mb-4">
          {line.slice(4)}
        </h3>
      );
      continue;
    }

    // ## H2 headings
    if (line.startsWith('## ')) {
      flushList();
      elements.push(
        <h2 key={`h2-${i}`} className="text-2xl font-bold text-heading mt-10 mb-4">
          {line.slice(3)}
        </h2>
      );
      continue;
    }

    // Bullet list items
    if (line.trimStart().startsWith('- ')) {
      const text = line.trimStart().slice(2);
      currentList.push(text);
      continue;
    }

    // Regular paragraph
    flushList();
    elements.push(
      <p key={`p-${i}`} className="text-body leading-relaxed mb-4">
        {renderInlineMarkdown(line)}
      </p>
    );
  }

  flushList();
  return elements;
}

/**
 * Renders inline markdown (**bold**) within text.
 */
function renderInlineMarkdown(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  if (parts.length === 1) return text;

  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="text-heading font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

function BlogArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const article = blogArticles.find((a) => a.slug === slug);

  // Article not found
  if (!article) {
    return (
      <section className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-heading mb-4">Article not found</h1>
          <p className="text-body mb-8">
            The article you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-electric-500 text-white font-medium rounded-xl hover:bg-electric-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal direction="up">
          {/* Back Navigation */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-body hover:text-heading transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Blog</span>
          </Link>

          {/* Article Header */}
          <header className="mb-8">
            {/* Category Badge */}
            <span className="inline-block px-3 py-1 text-xs font-medium uppercase tracking-wider rounded-full bg-blue-50 text-electric-600 border border-blue-100 mb-4">
              {article.category}
            </span>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-heading mb-4 leading-tight">
              {article.title}
            </h1>

            {/* Meta: Author + Date */}
            <div className="flex items-center gap-4 text-body-muted">
              <span className="font-medium text-heading">{article.author}</span>
              <span className="w-1 h-1 rounded-full bg-gray-300" aria-hidden="true" />
              <time dateTime={article.publishedDate}>
                {formatDate(article.publishedDate)}
              </time>
            </div>
          </header>

          {/* Article Content */}
          <article className="prose-custom">
            {renderContent(article.content)}
          </article>

          {/* Bottom Back Navigation */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-electric-500 hover:text-electric-600 transition-colors font-medium group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to Blog</span>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export default BlogArticlePage;
