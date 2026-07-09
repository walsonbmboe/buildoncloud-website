// src/components/ui/TestimonialCard.tsx
// Displays a single testimonial with client name, company, text, and avatar
// Validates: Requirements 14.1

import { Star } from 'lucide-react';
import type { Testimonial } from '../../types';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

/**
 * Renders a testimonial card with avatar (or initials fallback),
 * client name, company, testimonial text, and optional star rating.
 */
export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const { clientName, company, text, avatar, rating } = testimonial;

  // Generate initials from client name as avatar fallback
  const initials = clientName
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex flex-col items-center text-center px-6 py-8">
      {/* Avatar */}
      <div className="mb-6 h-16 w-16 overflow-hidden rounded-full border-2 border-electric-500/20 bg-blue-50 flex items-center justify-center">
        <img
          src={avatar}
          alt={`${clientName} profile photo`}
          width={64}
          height={64}
          loading="lazy"
          className="h-full w-full object-cover"
          onError={(e) => {
            // Hide the broken image and show initials fallback
            const target = e.currentTarget;
            target.style.display = 'none';
            const fallback = target.nextElementSibling as HTMLElement | null;
            if (fallback) fallback.style.display = 'flex';
          }}
        />
        <span
          className="hidden h-full w-full items-center justify-center text-lg font-semibold text-electric-500"
          aria-hidden="true"
        >
          {initials}
        </span>
      </div>

      {/* Rating stars */}
      {rating && rating > 0 && (
        <div className="mb-4 flex gap-1" aria-label={`Rating: ${rating} out of 5 stars`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
              }`}
              aria-hidden="true"
            />
          ))}
        </div>
      )}

      {/* Testimonial text */}
      <blockquote className="text-base leading-relaxed text-gray-700 md:text-lg max-w-xl">
        &ldquo;{text}&rdquo;
      </blockquote>

      {/* Client info */}
      <div className="mt-6">
        <p className="text-sm font-semibold text-gray-900">{clientName}</p>
        <p className="text-xs text-gray-500">{company}</p>
      </div>
    </div>
  );
}
