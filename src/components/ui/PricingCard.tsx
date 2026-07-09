// src/components/ui/PricingCard.tsx
// Pricing tier card with hover animation, CTA navigation, and recommended badge
// Validates: Requirements 11.1, 11.2, 11.3, 11.4, 11.5, 11.7

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { PricingTier } from '../../types';

interface PricingCardProps {
  tier: PricingTier;
}

export default function PricingCard({ tier }: PricingCardProps) {
  const navigate = useNavigate();

  const handleCtaClick = () => {
    navigate(`/contact?tier=${tier.name}`);
  };

  const baseClasses =
    'relative flex flex-1 flex-col rounded-2xl border p-8';

  const cardClasses = tier.isRecommended
    ? `${baseClasses} border-electric-500 bg-white shadow-lg ring-1 ring-electric-500/20`
    : `${baseClasses} border-gray-200 bg-white shadow-card`;

  return (
    <motion.div
      className={cardClasses}
      whileHover={{
        scale: 1.03,
        boxShadow: tier.isRecommended
          ? '0 4px 24px rgba(59, 130, 246, 0.15), 0 12px 48px rgba(59, 130, 246, 0.08)'
          : '0 4px 12px rgba(0, 0, 0, 0.08), 0 8px 24px rgba(0, 0, 0, 0.06)',
        transition: { duration: 0.3 },
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Recommended badge */}
      {tier.isRecommended && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-electric-500 px-4 py-1 text-xs font-semibold text-white">
          Recommended
        </span>
      )}

      {/* Tier name */}
      <h3 className="text-xl font-bold text-gray-900">{tier.name}</h3>

      {/* Price */}
      <div className="mt-4 flex items-baseline gap-1">
        <span className="text-4xl font-extrabold text-gray-900">
          {tier.currency}{tier.price.toLocaleString()}
        </span>
        <span className="text-sm text-gray-500">
          /{tier.period}
        </span>
      </div>

      {/* Feature list */}
      <ul className="mt-8 flex-grow space-y-3" role="list">
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm text-gray-700">
            <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-electric-500" aria-hidden="true" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA button */}
      <button
        onClick={handleCtaClick}
        className={`mt-8 w-full rounded-lg px-6 py-3 font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-electric-500 focus:ring-offset-2 focus:ring-offset-white ${
          tier.isRecommended
            ? 'bg-electric-500 text-white hover:bg-electric-600'
            : 'border border-electric-500 bg-transparent text-electric-500 hover:bg-blue-50'
        }`}
        aria-label={`${tier.ctaLabel} - ${tier.name} tier at ${tier.currency}${tier.price} per ${tier.period}`}
      >
        {tier.ctaLabel}
      </button>
    </motion.div>
  );
}
