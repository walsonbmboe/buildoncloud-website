// src/hooks/useScrollPosition.ts
// Returns current window.scrollY, throttled to 16ms (60fps).
// Used by Navbar and BackToTopButton.
// Validates: Requirements 8.4, 18.1

import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook that returns the current vertical scroll position,
 * throttled to ~60fps (16ms) to avoid excessive re-renders.
 */
export function useScrollPosition(): number {
  const [scrollY, setScrollY] = useState(0);
  const lastUpdate = useRef(0);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const now = Date.now();
      if (now - lastUpdate.current >= 16) {
        lastUpdate.current = now;
        setScrollY(window.scrollY);
      } else if (!rafId.current) {
        rafId.current = requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          lastUpdate.current = Date.now();
          rafId.current = null;
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return scrollY;
}
