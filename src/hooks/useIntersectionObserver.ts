// src/hooks/useIntersectionObserver.ts
// Returns a ref and isInView boolean using IntersectionObserver API.
// Supports threshold and triggerOnce options.
// Validates: Requirements 8.5, 19.4

import { useState, useEffect, useRef } from 'react';

export interface UseIntersectionOptions {
  threshold?: number;
  triggerOnce?: boolean;
}

/**
 * Custom hook that observes an element's visibility in the viewport
 * using the IntersectionObserver API.
 *
 * @param options.threshold - Visibility threshold (0-1), default 0.1
 * @param options.triggerOnce - If true, stops observing after first intersection
 * @returns Object with ref to attach to element and isInView boolean
 */
export function useIntersectionObserver(options: UseIntersectionOptions = {}): {
  ref: React.RefObject<HTMLElement | null>;
  isInView: boolean;
} {
  const { threshold = 0.1, triggerOnce = false } = options;
  const ref = useRef<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(false);
  const hasTriggered = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // If triggerOnce and already triggered, keep isInView true
    if (triggerOnce && hasTriggered.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        const intersecting = entry.isIntersecting;

        if (intersecting) {
          setIsInView(true);
          if (triggerOnce) {
            hasTriggered.current = true;
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, triggerOnce]);

  return { ref, isInView };
}
