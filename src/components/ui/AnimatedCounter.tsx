// src/components/ui/AnimatedCounter.tsx
// Animated counter that counts from 0 to target when scrolled into view.
// Validates: Requirements 8.3, 8.4, 8.5

import { useCounterAnimation } from '../../hooks/useCounterAnimation';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface AnimatedCounterProps {
  target: number;
  label: string;
  suffix?: string;
  duration?: number;
}

/**
 * Displays an animated numeric counter that animates from 0 to target
 * when the element scrolls into the viewport. Triggers only once.
 */
export default function AnimatedCounter({
  target,
  label,
  suffix = '',
  duration = 2000,
}: AnimatedCounterProps) {
  const { ref, isInView } = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });
  const value = useCounterAnimation(target, duration, isInView);

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="text-center">
      <span className="gradient-text text-4xl font-bold md:text-5xl">
        {value}
        {suffix}
      </span>
      <p className="mt-2 text-sm text-body md:text-base">
        {label}
      </p>
    </div>
  );
}
