// src/pages/ContactPage.tsx
// Contact page with form, contact info, WhatsApp button, and map placeholder
// Validates: Requirements 13.1, 13.2, 13.3, 13.4, 13.5, 13.6, 13.7, 13.8, 11.5

import { useSearchParams } from 'react-router-dom';
import { Mail, Phone, MapPin, MessageCircle, Linkedin, Facebook, Calendar } from 'lucide-react';
import ScrollReveal from '../components/common/ScrollReveal';
import GlassCard from '../components/common/GlassCard';
import SEO from '../components/common/SEO';
import PageHero from '../components/common/PageHero';
import ContactForm from '../components/ui/ContactForm';
import GlobalBackground from '../components/backgrounds/GlobalBackground';

function ContactPage() {
  const [searchParams] = useSearchParams();
  const tier = searchParams.get('tier');

  return (
    <div>
      <SEO pageKey="contact" />
      <PageHero
        variant="gradient"
        title="Get In Touch"
        accentText="In Touch"
        subtitle="Ready to start your project? Let's talk"
      />
      <section className="relative overflow-hidden mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <GlobalBackground />

      <div className="relative z-10 grid gap-12 lg:grid-cols-5">
        {/* Contact Form — wider column */}
        <div className="lg:col-span-3">
          <ScrollReveal direction="left" delay={0.1}>
            <GlassCard className="p-6 sm:p-8">
              <ContactForm tier={tier} />
            </GlassCard>
          </ScrollReveal>
        </div>

        {/* Contact Info — narrower column */}
        <div className="lg:col-span-2 space-y-8">
          <ScrollReveal direction="right" delay={0.2}>
            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold text-heading mb-6">Contact Information</h3>
              <ul className="space-y-5">
                <li>
                  <a
                    href="mailto:buildoncloud.awsconsult@gmail.com"
                    className="flex items-start gap-3 text-body hover:text-electric-500 transition-colors"
                  >
                    <Mail className="h-5 w-5 mt-0.5 shrink-0 text-electric-500" aria-hidden="true" />
                    <span>buildoncloud.awsconsult@gmail.com</span>
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+4407440241808"
                    className="flex items-start gap-3 text-body hover:text-electric-500 transition-colors"
                  >
                    <Phone className="h-5 w-5 mt-0.5 shrink-0 text-electric-500" aria-hidden="true" />
                    <span>+44 07440 241 808</span>
                  </a>
                </li>
                <li className="flex items-start gap-3 text-body">
                  <MapPin className="h-5 w-5 mt-0.5 shrink-0 text-electric-500" aria-hidden="true" />
                  <span>Cameroon &amp; United Kingdom</span>
                </li>
              </ul>

              {/* Social Links */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-medium text-body-muted mb-4">Follow Us</h4>
                <div className="flex gap-4">
                  <a
                    href="https://linkedin.com/company/buildoncloud"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-50 border border-gray-200 text-body-muted hover:text-electric-500 hover:border-electric-500/50 transition-colors"
                    aria-label="Visit our LinkedIn page"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a
                    href="https://facebook.com/buildoncloud"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-50 border border-gray-200 text-body-muted hover:text-electric-500 hover:border-electric-500/50 transition-colors"
                    aria-label="Visit our Facebook page"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </GlassCard>
          </ScrollReveal>

          {/* WhatsApp Button */}
          <ScrollReveal direction="right" delay={0.3}>
            <a
              href="https://wa.me/237671314091?text=Hi%20BuildOnCloud%2C%20I%27d%20like%20to%20discuss%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold rounded-2xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 focus:ring-offset-white"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              Chat on WhatsApp
            </a>
          </ScrollReveal>

          {/* Book a Meeting */}
          <ScrollReveal direction="right" delay={0.35}>
            <a
              href="https://calendly.com/buildoncloud-awsconsult/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-2xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 focus:ring-offset-white"
            >
              <Calendar className="h-5 w-5" aria-hidden="true" />
              Book a Meeting
            </a>
          </ScrollReveal>

          {/* Google Maps Placeholder */}
          <ScrollReveal direction="right" delay={0.4}>
            <div className="rounded-2xl border border-gray-200 bg-gray-50 overflow-hidden shadow-card">
              <div className="flex items-center justify-center h-48 text-body-muted">
                <div className="text-center">
                  <MapPin className="h-8 w-8 mx-auto mb-2 text-gray-400" aria-hidden="true" />
                  <p className="text-sm">Map placeholder</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
    </div>
  );
}

export default ContactPage;
