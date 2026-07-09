import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lightbulb, TrendingUp, Shield, Clock, Users, BookOpen } from 'lucide-react';
import Button from '../components/common/Button';
import SectionHeading from '../components/common/SectionHeading';
import GlassCard from '../components/common/GlassCard';
import SEO from '../components/common/SEO';
import FAQAccordion from '../components/ui/FAQAccordion';
import NewsletterForm from '../components/ui/NewsletterForm';
import TestimonialsSection from '../components/ui/TestimonialsSection';
import CircuitBackground from '../components/backgrounds/CircuitBackground';
import NeuralBackground from '../components/backgrounds/NeuralBackground';
import { faqItems } from '../data/faq';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { getVariants, getStaggerContainer } from '../utils/animation';
import heroImage from '../assets/hero-image.jpg';

// --- Hero Section ---
function HeroSection() {
  const reducedMotion = useReducedMotion();
  const variants = getVariants(reducedMotion);
  const containerVariants = getStaggerContainer(0.3, reducedMotion);

  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden md:min-h-screen">
      {/* Background: clean white with subtle gradient shapes */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20" />
        {/* Decorative gradient blobs */}
        <div className="absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-purple-400/20 to-pink-400/10 blur-3xl" />
        <div className="absolute -bottom-48 -left-32 h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-blue-400/15 to-cyan-400/10 blur-3xl" />
        <div className="absolute top-1/3 left-1/2 h-[300px] w-[300px] rounded-full bg-gradient-to-r from-electric-500/5 to-purple-500/5 blur-2xl" />
      </div>

      {/* Hero content: split layout */}
      <div className="relative z-10 mx-auto max-w-7xl w-full px-6 py-16 md:py-0">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Left: Text content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              className="text-4xl font-bold leading-tight text-heading text-balance md:text-5xl lg:text-6xl"
              variants={variants.fadeUp}
            >
              Empowering African Businesses Through Digital Transformation
            </motion.h1>

            <motion.p
              className="mt-6 text-lg text-body md:text-xl"
              variants={variants.fadeUp}
            >
              From Cameroon to the rest of Africa, we build intelligent technology solutions that help businesses of all sizes compete, grow, and thrive in the digital economy. Whether you're a startup, SME, or enterprise — the future is digital, and it starts here.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-col items-start gap-4 sm:flex-row"
              variants={variants.fadeUp}
            >
              <Link to="/contact">
                <Button variant="primary" size="lg" ariaLabel="Get Started - Navigate to contact page">
                  Get Started
                </Button>
              </Link>
              <Link to="/services">
                <Button
                  variant="secondary"
                  size="lg"
                  ariaLabel="View Services - Navigate to services page"
                >
                  View Services
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right: Hero image with decorative elements */}
          <motion.div
            className="relative flex items-center justify-center"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          >
            {/* Gradient accent behind image */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-electric-500/10 via-purple-500/10 to-pink-500/5 blur-xl scale-110" aria-hidden="true" />
            <img
              src={heroImage}
              alt="BuildOnCloud Technologies - Digital transformation and cloud solutions"
              className="relative z-10 w-full max-w-lg rounded-3xl shadow-card-lg object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// --- Value propositions data ---
const valuePropositions = [
  { 
    icon: Lightbulb, 
    title: 'Built for Africa', 
    description: 'We understand the African market intimately. From the unique challenges of doing business in Cameroon to scaling across the continent — we build solutions that work in your context, for your customers.' 
  },
  { 
    icon: TrendingUp, 
    title: 'Growth-Focused Solutions', 
    description: 'Every product we build is designed to scale with your business. Start small, grow big — our architecture supports your journey from startup to enterprise.' 
  },
  { 
    icon: Shield, 
    title: 'Reliable & Secure', 
    description: 'Enterprise-grade security and 99.9% uptime are non-negotiable. Your data is protected, your systems are always on, and your customers always have access.' 
  },
  { 
    icon: Clock, 
    title: 'Fast Delivery, Real Results', 
    description: 'We don\'t just build — we deliver. Our agile approach means you see working results within weeks, not months. Your time is valuable, and we respect it.' 
  },
  { 
    icon: Users, 
    title: 'Dedicated Partnership', 
    description: 'We\'re not a faceless agency. You get a dedicated team that knows your business, responds quickly, and treats your success as their own.' 
  },
  { 
    icon: BookOpen, 
    title: 'Future-Proof Technology', 
    description: 'We use the latest proven technologies — React, AWS, AI/ML — ensuring your investment stays relevant and competitive for years to come.' 
  },
];

function HomePage() {
  return (
    <div>
      <SEO pageKey="home" />
      <HeroSection />

      {/* Services overview section */}
      <section id="services" className="section-container relative">
        <CircuitBackground />
        <div className="relative z-10">
          <SectionHeading
            title="What We Build"
            subtitle="Technology solutions for businesses ready to scale"
            centered
          />
          <div className="mt-8 max-w-3xl mx-auto text-center space-y-4">
            <p className="text-body text-lg">
              We design and build websites, AI-powered chatbots, cloud infrastructure, and custom software
              for businesses across Africa. From automating your customer service with intelligent
              chatbots to building finance and accounting platforms — we bring your vision to life with
              technology that works.
            </p>
            <p className="text-body">
              No matter your industry or business stage, our team delivers solutions that are scalable,
              secure, and built for growth. Join hundreds of businesses already riding the wave of
              digital transformation.
            </p>
          </div>
          <div className="mt-8 text-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-electric-500 hover:text-electric-600 font-medium transition-colors duration-200"
            >
              Explore Our Full Range of Services &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* The Digital Revolution Section */}
      <section className="relative py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeading
            title="The Digital Revolution Is Here"
            subtitle="And Africa is leading the charge"
            centered
          />
          <div className="mt-8 space-y-6 text-body text-lg leading-relaxed">
            <p>
              Across the globe, data-driven decision making, artificial intelligence, and cloud computing
              are no longer luxuries — they are necessities. Businesses that fail to adapt risk being left
              behind. From Douala to Lagos, Nairobi to Johannesburg, companies are embracing digital
              transformation to cut costs, reach more customers, and operate smarter.
            </p>
            <p>
              Africa is experiencing a technology revolution. Mobile-first economies, a young tech-savvy
              population, and rapidly growing digital infrastructure mean the continent is leapfrogging
              traditional business models entirely. Cameroon, Nigeria, Kenya, and South Africa are
              leading this charge — and BuildOnCloud is here to ensure your business doesn't just keep
              up, but leads the way.
            </p>
            <p className="font-semibold text-heading">
              Whether you're digitising your operations, launching an online presence, or building
              AI-powered tools — the time to act is now.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="relative py-20 md:py-28 bg-surface-100">
        <NeuralBackground />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Why Choose Us"
            subtitle="What sets us apart from other technology providers"
            centered
          />

          {/* Value Propositions Grid */}
          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
            {valuePropositions.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <GlassCard hover className="p-6 text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50">
                    <item.icon className="h-7 w-7 text-electric-500" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold text-heading">{item.title}</h3>
                  <p className="mt-2 text-sm text-body">
                    {item.description}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* FAQ Section */}
      <section className="relative py-20 md:py-28 bg-surface-100">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Frequently Asked Questions"
            subtitle="Find answers to common questions about our services and process."
            centered
          />
          <div className="mt-12">
            <FAQAccordion items={faqItems} />
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="relative py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeading
            title="Stay Updated"
            subtitle="Subscribe to our newsletter for the latest insights on cloud, AI, and digital transformation."
            centered
          />
          <div className="mt-8 max-w-md mx-auto">
            <NewsletterForm />
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
