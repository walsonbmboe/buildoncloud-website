// src/hooks/useCounterAnimation.ts
// Animates a number from 0 to target with ease-out easing over a given duration.
// Uses requestAnimationFrame for smooth animation.
// Validates: Requirements 8.4, 19.4

import { useState, useEffect, useRef } from 'react';

/**
 * Ease-out function: decelerating towards the end.
 * t is normalized progress (0 to 1).
 */
function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * Custom hook that animates a numeric value from 0 to target
 * over the specified duration using requestAnimationFrame.
 *
 * @param target - The final value to animate to
 * @param duration - Duration in milliseconds
 * @param shouldAnimate - Whether the animation should run
 * @returns The current animated value (integer)
 */
export function useCounterAnimation(
  target: number,
  duration: number,
  shouldAnimate: boolean
): number {
  const [value, setValue] = useState(0);
  const rafId = useRef<number | null>(null);
  const startTime = useRef<number | null>(null);

  useEffect(() => {
    if (!shouldAnimate) {
      setValue(0);
      return;
    }

    if (target === 0) {
      setValue(0);
      return;
    }

    startTime.current = null;

    const animate = (timestamp: number) => {
      if (startTime.current === null) {
        startTime.current = timestamp;
      }

      const elapsed = timestamp - startTime.current;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOut(progress);
      const currentValue = Math.round(easedProgress * target);

      setValue(currentValue);

      if (progress < 1) {
        rafId.current = requestAnimationFrame(animate);
      }
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [target, duration, shouldAnimate]);

  return value;
}
