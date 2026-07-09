// src/components/common/ScrollReveal.tsx
// Reusable scroll-triggered animation wrapper using Framer Motion
// Validates: Requirements 19.3, 19.4, 21.5

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { getScrollRevealVariant } from '../../utils/animation';

export interface ScrollRevealProps {
  children: React.ReactNode;
  /** Direction the element animates from */
  direction?: 'up' | 'down' | 'left' | 'right';
  /** Delay before animation starts (in seconds) */
  delay?: number;
  /** Animation duration in seconds (clamped to 300-600ms range) */
  duration?: number;
  /** Viewport intersection ratio to trigger animation (0-1) */
  threshold?: number;
}

/**
 * ScrollReveal wraps children in a motion.div that animates into view
 * when the element enters the viewport. Respects prefers-reduced-motion
 * by falling back to instant opacity transition.
 */
export function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.5,
  threshold = 0.2,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const isInView = useInView(ref, {
    once: true,
    amount: threshold,
  });

  const variants = getScrollRevealVariant(direction, duration, reducedMotion);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      transition={delay > 0 && !reducedMotion ? { delay } : undefined}
    >
      {children}
    </motion.div>
  );
}

export default ScrollReveal;
