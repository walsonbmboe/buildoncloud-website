// src/components/ui/TestimonialsSection.tsx
// Auto-rotating testimonial carousel with navigation controls
// Validates: Requirements 14.1, 14.2, 14.3, 14.4, 14.5

import { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import TestimonialCard from './TestimonialCard';
import SectionHeading from '../common/SectionHeading';
import { testimonials } from '../../data/testimonials';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const AUTO_ROTATE_INTERVAL = 5000; // 5 seconds
const RESUME_DELAY = 10000; // 10 seconds after interaction
const TRANSITION_DURATION = 0.4; // 400ms

/**
 * Testimonials carousel section with:
 * - Auto-rotation every 5s (Req 14.2)
 * - Pause on interaction, resume after 10s idle (Req 14.3, 14.4)
 * - Wrap from last→first and first→last (Req 14.2)
 * - Fade/slide transition at 400ms (Req 14.5)
 * - Navigation dots and arrow controls (Req 14.3)
 */
export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const [isPaused, setIsPaused] = useState(false);
  const reducedMotion = useReducedMotion();

  const autoRotateRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const totalItems = testimonials.length;

  // Clear auto-rotation interval
  const clearAutoRotate = useCallback(() => {
    if (autoRotateRef.current) {
      clearInterval(autoRotateRef.current);
      autoRotateRef.current = null;
    }
  }, []);

  // Clear resume timer
  const clearResumeTimer = useCallback(() => {
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }
  }, []);

  // Start auto-rotation
  const startAutoRotate = useCallback(() => {
    clearAutoRotate();
    autoRotateRef.current = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % totalItems);
    }, AUTO_ROTATE_INTERVAL);
  }, [clearAutoRotate, totalItems]);

  // Pause auto-rotation and set a timer to resume
  const pauseAndScheduleResume = useCallback(() => {
    setIsPaused(true);
    clearAutoRotate();
    clearResumeTimer();

    resumeTimerRef.current = setTimeout(() => {
      setIsPaused(false);
      startAutoRotate();
    }, RESUME_DELAY);
  }, [clearAutoRotate, clearResumeTimer, startAutoRotate]);

  // Navigate to a specific index (user-initiated)
  const goToIndex = useCallback(
    (index: number) => {
      setDirection(index > activeIndex ? 1 : -1);
      setActiveIndex(index);
      pauseAndScheduleResume();
    },
    [activeIndex, pauseAndScheduleResume]
  );

  // Navigate next
  const goNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % totalItems);
    pauseAndScheduleResume();
  }, [totalItems, pauseAndScheduleResume]);

  // Navigate previous
  const goPrev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + totalItems) % totalItems);
    pauseAndScheduleResume();
  }, [totalItems, pauseAndScheduleResume]);

  // Start auto-rotation on mount
  useEffect(() => {
    if (!isPaused) {
      startAutoRotate();
    }
    return () => {
      clearAutoRotate();
      clearResumeTimer();
    };
  }, [isPaused, startAutoRotate, clearAutoRotate, clearResumeTimer]);

  // Animation variants for the slide/fade transition
  const slideVariants = {
    enter: (dir: number) => ({
      x: reducedMotion ? 0 : dir * 60,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: reducedMotion ? 0 : dir * -60,
      opacity: 0,
    }),
  };

  return (
    <section
      className="relative py-20 md:py-28"
      aria-roledescription="carousel"
      aria-label="Client testimonials"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="What Our Clients Say"
          subtitle="Real feedback from businesses we've helped grow."
          centered
        />

        {/* Carousel container */}
        <div className="relative mt-12 min-h-[320px] flex items-center justify-center">
          {/* Previous arrow */}
          <button
            onClick={goPrev}
            className="absolute left-0 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white border border-gray-200 shadow-card text-gray-500 hover:text-gray-900 hover:shadow-card-hover transition-all focus:outline-none focus:ring-2 focus:ring-electric-500"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Testimonial content with AnimatePresence */}
          <div className="w-full overflow-hidden px-12">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: reducedMotion ? 0 : TRANSITION_DURATION,
                  ease: 'easeInOut',
                }}
                aria-live="polite"
                aria-atomic="true"
                role="group"
                aria-roledescription="slide"
                aria-label={`Testimonial ${activeIndex + 1} of ${totalItems}`}
              >
                <TestimonialCard testimonial={testimonials[activeIndex]!} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Next arrow */}
          <button
            onClick={goNext}
            className="absolute right-0 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white border border-gray-200 shadow-card text-gray-500 hover:text-gray-900 hover:shadow-card-hover transition-all focus:outline-none focus:ring-2 focus:ring-electric-500"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation dots */}
        <div className="mt-8 flex items-center justify-center gap-3" role="tablist" aria-label="Testimonial navigation">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToIndex(index)}
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={`Go to testimonial ${index + 1}`}
              className={`h-2.5 w-2.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-electric-500 focus:ring-offset-2 focus:ring-offset-white ${
                index === activeIndex
                  ? 'bg-electric-500 w-6'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
