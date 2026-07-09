// src/components/ui/ServiceCard.tsx
// Individual service card with white background, Lucide icon, hover effects, and scroll reveal
// Validates: Requirements 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7, 7.8

import { Globe, Brain, Cloud, Cog, Code, GraduationCap, Database, type LucideIcon } from 'lucide-react';
import GlassCard from '../common/GlassCard';
import ScrollReveal from '../common/ScrollReveal';
import type { Service } from '../../types';

const iconMap: Record<string, LucideIcon> = {
  Globe,
  Brain,
  Cloud,
  Cog,
  Code,
  GraduationCap,
  Database,
};

interface ServiceCardProps {
  service: Service;
  index: number;
}

/**
 * ServiceCard renders a single service item inside a card with hover effects.
 * Uses ScrollReveal for staggered entrance animation based on the card index.
 * The Lucide icon is dynamically resolved from the service icon name string.
 */
export default function ServiceCard({ service, index }: ServiceCardProps) {
  const Icon = iconMap[service.icon];

  return (
    <ScrollReveal direction="up" delay={index * 0.15}>
      <GlassCard hover className="p-6 h-full flex flex-col items-start gap-4">
        {Icon && (
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50">
            <Icon
              className="h-6 w-6 text-electric-500"
              aria-hidden="true"
            />
          </div>
        )}
        <h3 className="text-lg font-semibold text-gray-900">
          {service.title}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          {service.description}
        </p>
      </GlassCard>
    </ScrollReveal>
  );
}
