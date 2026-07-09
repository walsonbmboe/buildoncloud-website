// src/pages/BlogPage.tsx
// Blog listing page with search and category filtering
// Validates: Requirements 12.1, 12.2, 12.3, 12.4, 12.5, 12.6, 12.7

import { useState, useMemo, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search } from 'lucide-react';
import SEO from '../components/common/SEO';
import PageHero from '../components/common/PageHero';
import BlogCard from '../components/ui/BlogCard';
import DataFlowBackground from '../components/backgrounds/DataFlowBackground';
import { blogArticles } from '../data/blog';

function BlogPage() {
  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounce search input (1 second delay)
  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    debounceTimer.current = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, 1000);

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [searchInput]);

  // Derive unique categories from blog data
  const categories = useMemo(() => {
    const cats = Array.from(new Set(blogArticles.map((a) => a.category)));
    return ['all', ...cats.sort()];
  }, []);

  // Combined filtering: search (title + keywords) intersected with category
  const filteredArticles = useMemo(() => {
    let results = blogArticles;

    // Category filter
    if (selectedCategory !== 'all') {
      results = results.filter((a) => a.category === selectedCategory);
    }

    // Search filter (title + keywords, case-insensitive)
    if (debouncedSearch.trim()) {
      const query = debouncedSearch.toLowerCase().trim();
      results = results.filter((a) => {
        const titleMatch = a.title.toLowerCase().includes(query);
        const keywordMatch = a.keywords.some((k) =>
          k.toLowerCase().includes(query)
        );
        return titleMatch || keywordMatch;
      });
    }

    return results;
  }, [debouncedSearch, selectedCategory]);

  return (
    <div>
      <SEO pageKey="blog" />
      <PageHero
        variant="gradient"
        title="Blog & Insights"
        accentText="Insights"
        subtitle="Expert articles on cloud, AI, and digital transformation"
      />
      <section className="relative overflow-hidden min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <DataFlowBackground />
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Search and Filters */}
        <div className="mb-10 space-y-6">
          {/* Search Input */}
          <div className="relative max-w-xl mx-auto">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-body-muted"
              aria-hidden="true"
            />
            <input
              type="search"
              placeholder="Search articles by title or keywords..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              aria-label="Search blog articles"
              className="w-full min-w-[30ch] pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-heading placeholder-gray-400 shadow-card focus:outline-none focus:ring-2 focus:ring-electric-500/50 focus:border-electric-500 transition-all"
            />
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3" role="group" aria-label="Blog category filters">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                aria-pressed={selectedCategory === cat}
                className={`px-4 py-2 text-sm font-medium rounded-lg capitalize transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-electric-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${
                  selectedCategory === cat
                    ? 'bg-electric-500 text-white shadow-lg shadow-electric-500/25'
                    : 'bg-white text-body border border-gray-200 hover:bg-gray-50 hover:text-heading'
                }`}
              >
                {cat === 'all' ? 'All' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <AnimatePresence mode="wait">
          {filteredArticles.length > 0 ? (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredArticles.map((article) => (
                <motion.div
                  key={article.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <BlogCard article={article} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="no-results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="text-center py-16"
            >
              <p className="text-xl text-body">
                No articles found matching your search.
              </p>
              <p className="mt-2 text-sm text-body-muted">
                Try adjusting your search terms or clearing the category filter.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
    </div>
  );
}

export default BlogPage;
