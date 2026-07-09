// src/hooks/useReducedMotion.ts
// Returns true if the user prefers reduced motion
// Validates: Requirements 19.4, 21.5

import { useState, useEffect } from 'react';

/**
 * Custom hook that detects the user's prefers-reduced-motion preference.
 * Returns true if the user has enabled reduced motion in their OS settings.
 * Listens for changes so the UI responds dynamically.
 */
export function useReducedMotion(): boolean {
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleChange = (event: MediaQueryListEvent) => {
      setReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return reducedMotion;
}
