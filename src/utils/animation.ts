// src/utils/animation.ts
// Shared Framer Motion animation variants for BuildOnCloud Technologies website
// Validates: Requirements 19.2, 19.3, 19.4, 21.5

import type { Variants, Transition } from 'framer-motion';

// --- Base Transitions ---

const defaultTransition: Transition = {
  duration: 0.4,
  ease: [0.25, 0.46, 0.45, 0.94], // ease-out quad
};

const springTransition: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 24,
};

// --- Fade Variants ---

/** Fade in from opacity 0 to 1 */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

/** Fade up: opacity 0 + translateY 30px to visible */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: defaultTransition,
  },
};

/** Fade down: opacity 0 + translateY -30px to visible */
export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: defaultTransition,
  },
};

/** Fade left: opacity 0 + translateX 30px to visible */
export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: defaultTransition,
  },
};

/** Fade right: opacity 0 + translateX -30px to visible */
export const fadeRight: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: defaultTransition,
  },
};

// --- Stagger Container ---

/** Parent variant with staggerChildren timing for orchestrating child animations */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

// --- Scale Hover ---

/** Hover state with scale(1.03) for interactive cards */
export const scaleHover: Variants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.03,
    transition: springTransition,
  },
  tap: {
    scale: 0.98,
    transition: { duration: 0.1 },
  },
};

// --- Page Transition Variants ---
// Duration 200-500ms per Requirement 19.2

/** Variants for AnimatePresence page transitions */
export const pageTransition: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
};

// --- Scroll Reveal Variants ---
// Duration 300-600ms per Requirement 19.3

/** Variants for viewport-triggered scroll reveal animations */
export const scrollReveal: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// --- Reduced Motion Variants ---
// Requirement 19.4, 21.5: disable animations when prefers-reduced-motion is active

/** Instant transition for reduced motion - opacity only, no movement */
const instantTransition: Transition = {
  duration: 0,
};

/** Reduced motion variant that shows content immediately */
const reducedMotionVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: instantTransition,
  },
};

/** Reduced motion page transition - instant display */
const reducedMotionPageTransition: Variants = {
  initial: { opacity: 1 },
  animate: { opacity: 1, transition: instantTransition },
  exit: { opacity: 0, transition: instantTransition },
};

/** Reduced motion stagger container - no stagger delay */
const reducedMotionStaggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0,
      staggerChildren: 0,
      delayChildren: 0,
    },
  },
};

/** Reduced motion hover - no scale effect */
const reducedMotionScaleHover: Variants = {
  initial: { scale: 1 },
  hover: { scale: 1, transition: instantTransition },
  tap: { scale: 1, transition: instantTransition },
};

// --- Variant Collections ---

export interface AnimationVariants {
  fadeIn: Variants;
  fadeUp: Variants;
  fadeDown: Variants;
  fadeLeft: Variants;
  fadeRight: Variants;
  staggerContainer: Variants;
  scaleHover: Variants;
  pageTransition: Variants;
  scrollReveal: Variants;
}

/** Full animation variants for users without reduced motion preference */
const fullMotionVariants: AnimationVariants = {
  fadeIn,
  fadeUp,
  fadeDown,
  fadeLeft,
  fadeRight,
  staggerContainer,
  scaleHover,
  pageTransition,
  scrollReveal,
};

/** Instant/reduced variants for users with prefers-reduced-motion enabled */
const reducedMotionVariants: AnimationVariants = {
  fadeIn: reducedMotionVariant,
  fadeUp: reducedMotionVariant,
  fadeDown: reducedMotionVariant,
  fadeLeft: reducedMotionVariant,
  fadeRight: reducedMotionVariant,
  staggerContainer: reducedMotionStaggerContainer,
  scaleHover: reducedMotionScaleHover,
  pageTransition: reducedMotionPageTransition,
  scrollReveal: reducedMotionVariant,
};

/**
 * Returns animation variants based on reduced motion preference.
 * When reducedMotion is true, all variants resolve instantly with no
 * movement, respecting prefers-reduced-motion (Requirements 19.4, 21.5).
 *
 * @param reducedMotion - Whether the user prefers reduced motion
 * @returns The appropriate set of animation variants
 */
export function getVariants(reducedMotion: boolean): AnimationVariants {
  return reducedMotion ? reducedMotionVariants : fullMotionVariants;
}

/**
 * Returns a scroll reveal variant with custom direction and timing.
 * Falls back to instant transition when reducedMotion is true.
 *
 * @param direction - Direction the element animates from
 * @param duration - Animation duration in seconds (300-600ms range)
 * @param reducedMotion - Whether the user prefers reduced motion
 */
export function getScrollRevealVariant(
  direction: 'up' | 'down' | 'left' | 'right' = 'up',
  duration: number = 0.5,
  reducedMotion: boolean = false
): Variants {
  if (reducedMotion) {
    return reducedMotionVariant;
  }

  const offsets = {
    up: { x: 0, y: 40 },
    down: { x: 0, y: -40 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
  };

  const offset = offsets[direction];

  return {
    hidden: { opacity: 0, ...offset },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: Math.max(0.3, Math.min(0.6, duration)),
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };
}

/**
 * Returns a stagger container variant with custom timing.
 * Falls back to instant transition when reducedMotion is true.
 *
 * @param staggerDelay - Delay between children in seconds
 * @param reducedMotion - Whether the user prefers reduced motion
 */
export function getStaggerContainer(
  staggerDelay: number = 0.15,
  reducedMotion: boolean = false
): Variants {
  if (reducedMotion) {
    return reducedMotionStaggerContainer;
  }

  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
      },
    },
  };
}
