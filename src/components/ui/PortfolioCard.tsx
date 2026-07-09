// src/components/ui/PortfolioCard.tsx
// Portfolio project card with image, title, description, tech tags, and "View Details" button
// Validates: Requirements 9.1, 9.4, 9.5

import { ExternalLink } from 'lucide-react';
import GlassCard from '../common/GlassCard';
import { portfolioImages } from '../../data/portfolioImages';
import type { PortfolioProject } from '../../types';


interface PortfolioCardProps {
  project: PortfolioProject;
  onViewDetails: (project: PortfolioProject) => void;
}

/**
 * PortfolioCard displays a project with image placeholder, title,
 * truncated description (120 chars max), tech stack tags, and a "View Details" button.
 */
export default function PortfolioCard({ project, onViewDetails }: PortfolioCardProps) {
  const truncatedDescription =
    project.shortDescription.length > 120
      ? project.shortDescription.slice(0, 117) + '...'
      : project.shortDescription;

  return (
    <GlassCard hover className="flex flex-col h-full overflow-hidden">
      {/* Project image — only rendered if an image exists in portfolioImages */}
      {portfolioImages[project.id] && (
        <div className="relative w-full h-48 overflow-hidden">
          <img
            src={portfolioImages[project.id]}
            alt={project.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      )}

      {/* Card content */}
      <div className="flex flex-col flex-1 p-6 gap-3">
        <h3 className="text-lg font-semibold text-gray-900">
          {project.title}
        </h3>

        <p className="text-sm text-gray-600 leading-relaxed flex-1">
          {truncatedDescription}
        </p>

        {/* Tech stack tags */}
        <div className="flex flex-wrap gap-2 mt-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs font-medium rounded-full bg-blue-50 text-electric-600 border border-blue-100"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* View Details button */}
        <button
          onClick={() => onViewDetails(project)}
          className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-blue-50 text-electric-500 hover:bg-blue-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-electric-500/50"
          aria-label={`View details for ${project.title}`}
        >
          View Details
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </GlassCard>
  );
}
