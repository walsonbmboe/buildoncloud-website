// src/pages/PortfolioPage.tsx
// Portfolio page with category filtering, AnimatePresence transitions, and project detail modal
// Validates: Requirements 9.1, 9.2, 9.3, 9.4, 9.5, 9.6

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Globe } from 'lucide-react';
import ScrollReveal from '../components/common/ScrollReveal';
import SEO from '../components/common/SEO';
import PageHero from '../components/common/PageHero';
import DataFlowBackground from '../components/backgrounds/DataFlowBackground';
import PortfolioCard from '../components/ui/PortfolioCard';
import { portfolioProjects } from '../data/portfolio';
import { portfolioImages } from '../data/portfolioImages';
import type { PortfolioProject } from '../types';

/**
 * Derive unique categories from portfolio data.
 * Returns an array with "all" as the first item, followed by unique categories.
 */
function getCategories(projects: PortfolioProject[]): string[] {
  const unique = Array.from(new Set(projects.map((p) => p.category)));
  return ['all', ...unique];
}

/**
 * Capitalize the first letter of a string.
 */
function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Animation variants for portfolio items
const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

// Modal overlay animation
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

// Modal content animation
const modalVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.9, y: 20 },
};

/**
 * Project detail modal displaying full description, tech stack, objectives, and links.
 */
function ProjectDetailModal({
  project,
  onClose,
}: {
  project: PortfolioProject;
  onClose: () => void;
}) {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.2 }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal content */}
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`Project details for ${project.title}`}
        className="relative z-10 w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl bg-white border border-gray-200 p-6 md:p-8 shadow-2xl"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-body-muted hover:text-heading hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-electric-500/50"
          aria-label="Close project details"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Project image — only rendered if an image exists in portfolioImages */}
        {portfolioImages[project.id] && (
          <div className="w-full h-48 md:h-56 rounded-xl mb-6 overflow-hidden">
            <img
              src={portfolioImages[project.id]}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Title and category */}
        <h2 className="text-2xl font-bold text-heading mb-2">
          {project.title}
        </h2>
        <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-blue-50 text-electric-600 border border-blue-100 mb-4">
          {capitalize(project.category)}
        </span>

        {/* Full description */}
        <p className="text-body leading-relaxed mb-6">
          {project.fullDescription}
        </p>

        {/* Tech stack */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-heading uppercase tracking-wider mb-3">
            Tech Stack
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 text-sm font-medium rounded-lg bg-blue-50 text-electric-600 border border-blue-100"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Objectives */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-heading uppercase tracking-wider mb-3">
            Objectives
          </h3>
          <ul className="space-y-2">
            {project.objectives.map((objective, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 text-body"
              >
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-electric-500 flex-shrink-0" />
                {objective}
              </li>
            ))}
          </ul>
        </div>

        {/* Links */}
        {(project.liveUrl || project.demoUrl) && (
          <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-electric-500 text-white hover:bg-electric-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-electric-500/50"
              >
                <Globe className="h-4 w-4" aria-hidden="true" />
                View Live Site
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-gray-100 text-heading hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-electric-500/50"
              >
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                View Demo
              </a>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

/**
 * PortfolioPage displays all portfolio projects with category filtering,
 * animated transitions, and a detail modal.
 */
export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

  const categories = getCategories(portfolioProjects);

  const filteredProjects =
    activeCategory === 'all'
      ? portfolioProjects
      : portfolioProjects.filter((p) => p.category === activeCategory);

  const handleViewDetails = useCallback((project: PortfolioProject) => {
    setSelectedProject(project);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedProject(null);
  }, []);

  return (
    <section className="relative min-h-screen">
      <SEO pageKey="portfolio" />
      <PageHero
        variant="gradient"
        title="Our Portfolio"
        accentText="Portfolio"
        subtitle="Explore our recent projects showcasing expertise across web, AI, and cloud"
      />
      <div className="relative py-20 px-4 md:px-8 lg:px-16">
      <DataFlowBackground />
      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Filter buttons */}
        <ScrollReveal delay={0.1}>
          <div className="flex flex-wrap justify-center gap-3" role="group" aria-label="Portfolio category filters">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-electric-500/50 ${
                  activeCategory === category
                    ? 'bg-electric-500 text-white shadow-lg shadow-electric-500/25'
                    : 'bg-white text-body border border-gray-200 hover:bg-gray-50 hover:text-heading'
                }`}
                aria-pressed={activeCategory === category}
              >
                {category === 'all' ? 'All' : capitalize(category)}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Portfolio grid with AnimatePresence */}
        <div className="mt-12">
          <AnimatePresence mode="wait">
            {filteredProjects.length === 0 ? (
              <motion.div
                key="no-results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-center py-16"
              >
                <p className="text-lg text-body">
                  No projects available for the selected category.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key={activeCategory}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.08 },
                  },
                  exit: { opacity: 0 },
                }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
              >
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    variants={itemVariants}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    layout
                  >
                    <PortfolioCard
                      project={project}
                      onViewDetails={handleViewDetails}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      </div>

      {/* Project detail modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailModal
            project={selectedProject}
            onClose={handleCloseModal}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
