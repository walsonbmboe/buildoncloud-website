// src/components/common/GlassCard.tsx
// Reusable card component with light theme styling
// Validates: Requirements 2.3, 7.2

import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean; // enable hover scale + glow
}

const hoverVariants = {
  initial: { scale: 1, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(0, 0, 0, 0.06)' },
  hover: {
    scale: 1.03,
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12), 0 16px 48px rgba(0, 0, 0, 0.08)',
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
  tap: {
    scale: 0.98,
    transition: { duration: 0.1 },
  },
};

/**
 * A reusable card with white background, visible border, and clear shadow.
 * Supports optional hover animation (scale + elevated shadow).
 */
export default function GlassCard({ children, className = '', hover = false }: GlassCardProps) {
  const baseClasses =
    'bg-white border border-gray-200 rounded-2xl shadow-md';

  if (hover) {
    return (
      <motion.div
        className={`${baseClasses} hover:shadow-xl hover:border-blue-200 transition-all duration-300 ${className}`}
        variants={hoverVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={`${baseClasses} ${className}`}>
      {children}
    </div>
  );
}
