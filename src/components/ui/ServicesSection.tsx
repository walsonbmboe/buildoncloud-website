// src/components/ui/ServicesSection.tsx
// Services section with animated grid of service cards
// Validates: Requirements 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7, 7.8

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionHeading from '../common/SectionHeading';
import ServiceCard from './ServiceCard';
import { services } from '../../data/services';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { getStaggerContainer, fadeUp } from '../../utils/animation';

/**
 * ServicesSection displays the company's core service offerings in a responsive grid.
 * Uses stagger container animation to orchestrate child card entrances.
 */
export default function ServicesSection() {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const containerVariants = getStaggerContainer(0.15, reducedMotion);

  return (
    <section
      ref={ref}
      id="services"
      className="py-20 px-4 sm:px-6 lg:px-8"
      aria-labelledby="services-heading"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          title="Our Services"
          subtitle="Empowering your business through cloud, AI, and digital transformation solutions"
          centered
        />

        <motion.div
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {services.map((service, index) => (
            <motion.div key={service.id} variants={fadeUp}>
              <ServiceCard service={service} index={index} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
