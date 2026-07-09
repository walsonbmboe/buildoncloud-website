import { Link } from 'react-router-dom';
import {
  Globe,
  Brain,
  Cloud,
  Cog,
  Code,
  GraduationCap,
  Database,
  CheckCircle2,
} from 'lucide-react';
import GlassCard from '../components/common/GlassCard';
import ScrollReveal from '../components/common/ScrollReveal';
import Button from '../components/common/Button';
import SEO from '../components/common/SEO';
import PageHero from '../components/common/PageHero';
import CircuitBackground from '../components/backgrounds/CircuitBackground';
import { services } from '../data/services';
import type { LucideIcon } from 'lucide-react';

// Map icon string names to actual Lucide components
const iconMap: Record<string, LucideIcon> = {
  Globe,
  Brain,
  Cloud,
  Cog,
  Code,
  GraduationCap,
  Database,
};

function ServicesPage() {
  return (
    <div>
      <SEO pageKey="services" />

      {/* Hero Section */}
      <PageHero
        variant="image"
        overlayColor="blue"
        title="Our Services"
        subtitle="Comprehensive technology solutions to power your business growth"
      />

      {/* Services Grid */}
      <section className="relative pb-20 md:pb-28">
        <CircuitBackground />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {services.map((service, index) => {
              const IconComponent = iconMap[service.icon] || Globe;

              return (
                <ScrollReveal
                  key={service.id}
                  direction="up"
                  delay={index * 0.1}
                >
                  <GlassCard className="p-8 h-full flex flex-col">
                    {/* Icon + Title */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-blue-50">
                        <IconComponent
                          className="h-7 w-7 text-electric-500"
                          aria-hidden="true"
                        />
                      </div>
                      <h2 className="text-xl font-bold text-heading">
                        {service.title}
                      </h2>
                    </div>

                    {/* Detailed Description */}
                    <p className="text-body leading-relaxed mb-6">
                      {service.detailedDescription}
                    </p>

                    {/* Features List */}
                    <div className="mb-6">
                      <h3 className="text-sm font-semibold text-body-muted uppercase tracking-wider mb-3">
                        What we deliver
                      </h3>
                      <ul className="space-y-2">
                        {service.features.map((feature) => (
                          <li
                            key={feature}
                            className="flex items-start gap-2 text-sm text-body"
                          >
                            <CheckCircle2
                              className="h-4 w-4 mt-0.5 flex-shrink-0 text-green-500"
                              aria-hidden="true"
                            />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Use Cases */}
                    <div className="mb-6">
                      <h3 className="text-sm font-semibold text-body-muted uppercase tracking-wider mb-3">
                        Use cases
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {service.useCases.map((useCase) => (
                          <span
                            key={useCase}
                            className="inline-block rounded-full bg-blue-50 border border-blue-100 px-3 py-1 text-xs font-medium text-electric-600"
                          >
                            {useCase}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="mt-auto pt-4">
                      <Link to={`/contact?service=${service.id}`}>
                        <Button
                          variant="primary"
                          size="md"
                          ariaLabel={`Get started with ${service.title}`}
                        >
                          Get Started
                        </Button>
                      </Link>
                    </div>
                  </GlassCard>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ServicesPage;
