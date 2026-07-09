import { Link } from 'react-router-dom';
import { Check, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/common/SEO';
import PageHero from '../components/common/PageHero';
import ScrollReveal from '../components/common/ScrollReveal';
import ScalabilityBackground from '../components/backgrounds/ScalabilityBackground';

function PricingPage() {
  return (
    <div>
      <SEO pageKey="pricing" />
      <PageHero
        variant="gradient"
        title="Pricing Plans"
        accentText="Plans"
        subtitle="Simple, transparent pricing for every stage of your business"
      />

      <section className="relative overflow-hidden py-20 md:py-28">
        <ScalabilityBackground />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 items-stretch">

            {/* Launch Package */}
            <ScrollReveal direction="up" delay={0}>
              <div className="h-full flex flex-col bg-white rounded-2xl border border-gray-200 shadow-md p-8">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Launch</h3>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900">$299</span>
                  </div>
                  <p className="mt-3 text-sm text-gray-600">
                    Perfect for startups, churches, NGOs, schools, personal brands and small businesses.
                  </p>
                </div>
                <ul className="flex-1 space-y-3 mb-8">
                  {[
                    'Up to 5 Pages',
                    'Mobile Responsive Design',
                    'Contact Form',
                    'WhatsApp Integration',
                    'Google Maps Integration',
                    'Basic SEO Setup',
                    'Social Media Integration',
                    '30 Days Support',
                  ].map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-gray-700">
                      <Check className="h-4 w-4 mt-0.5 flex-shrink-0 text-green-500" aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/contact?tier=Launch" className="mt-auto">
                  <button className="w-full py-3 px-6 rounded-xl bg-gray-900 text-white font-semibold hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2">
                    Get Started
                  </button>
                </Link>
              </div>
            </ScrollReveal>

            {/* Growth Package — Recommended */}
            <ScrollReveal direction="up" delay={0.1}>
              <div className="h-full flex flex-col bg-white rounded-2xl border-2 border-electric-500 shadow-xl shadow-electric-500/10 p-8 relative md:scale-105">
                {/* Badge */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-block bg-electric-500 text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-lg">
                    Most Popular
                  </span>
                </div>
                <div className="mb-6 mt-2">
                  <h3 className="text-lg font-semibold text-gray-900">Growth</h3>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900">$699</span>
                  </div>
                  <p className="mt-3 text-sm text-gray-600">
                    Ideal for growing SMEs and established businesses looking to expand digitally.
                  </p>
                </div>
                <ul className="flex-1 space-y-3 mb-8">
                  {[
                    'Everything in Launch, plus:',
                    'Up to 10 Pages',
                    'Custom UI/UX Design',
                    'CMS Integration',
                    'Blog Setup',
                    'Advanced SEO',
                    'Google Analytics',
                    'Performance Optimization',
                    'AI Chatbot Integration',
                    'Social Media Integration',
                    '60 Days Support',
                  ].map((feature, i) => (
                    <li key={feature} className={`flex items-start gap-3 text-sm ${i === 0 ? 'font-semibold text-electric-600' : 'text-gray-700'}`}>
                      {i === 0 ? null : <Check className="h-4 w-4 mt-0.5 flex-shrink-0 text-green-500" aria-hidden="true" />}
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/contact?tier=Growth" className="mt-auto">
                  <button className="w-full py-3 px-6 rounded-xl bg-electric-500 text-white font-semibold hover:bg-electric-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-electric-500 focus:ring-offset-2">
                    Choose Growth
                  </button>
                </Link>
              </div>
            </ScrollReveal>

            {/* Enterprise Package */}
            <ScrollReveal direction="up" delay={0.2}>
              <div className="h-full flex flex-col bg-white rounded-2xl border border-gray-200 shadow-md p-8">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Enterprise</h3>
                  <div className="mt-4">
                    <span className="text-2xl font-bold text-gray-900">Starting from </span>
                    <span className="text-4xl font-bold text-gray-900">$1,499</span>
                  </div>
                  <p className="mt-3 text-sm text-gray-600">
                    For businesses that need custom solutions, cloud infrastructure, and dedicated support.
                  </p>
                </div>
                <ul className="flex-1 space-y-3 mb-8">
                  {[
                    'Unlimited Pages',
                    'Custom Web Applications',
                    'AWS Cloud Infrastructure',
                    'AI Automation',
                    'CRM Integration',
                    'Database Design',
                    'Business Dashboards',
                    'Enterprise Security',
                    'Ongoing Maintenance',
                    'Dedicated Project Manager',
                  ].map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-gray-700">
                      <Check className="h-4 w-4 mt-0.5 flex-shrink-0 text-green-500" aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/contact?tier=Enterprise" className="mt-auto">
                  <button className="w-full py-3 px-6 rounded-xl bg-gray-900 text-white font-semibold hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2">
                    Contact Us
                  </button>
                </Link>
              </div>
            </ScrollReveal>
          </div>

          {/* Pricing Note */}
          <div className="mt-16 text-center">
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              <strong className="text-gray-900">Every business is unique.</strong> Enterprise projects are quoted based on your specific requirements. Contact us for a personalized proposal.
            </p>
          </div>

          {/* Launch Promotion Banner */}
          <ScrollReveal direction="up" delay={0.3}>
            <motion.div
              className="mt-16 bg-gradient-to-r from-electric-500 to-purple-600 rounded-2xl p-8 md:p-12 text-center text-white shadow-xl"
              whileHover={{ scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div className="flex items-center justify-center gap-2 mb-4">
                <Rocket className="h-6 w-6" aria-hidden="true" />
                <h3 className="text-2xl font-bold">Launch Offer</h3>
              </div>
              <p className="text-lg text-white/90 max-w-2xl mx-auto mb-2">
                To celebrate the launch of BuildOnCloud, we're offering exclusive introductory pricing to our <strong className="text-white">first 10 clients</strong>.
              </p>
              <p className="text-white/80 max-w-2xl mx-auto mb-8">
                This is your opportunity to work with an AWS-certified Cloud, AI and Digital Transformation partner at special launch rates.
              </p>
              <Link to="/contact?promo=launch-offer">
                <button className="px-8 py-3 bg-white text-electric-600 font-bold rounded-xl hover:bg-gray-100 transition-colors duration-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-electric-500">
                  Claim Your Launch Offer
                </button>
              </Link>
            </motion.div>
          </ScrollReveal>

        </div>
      </section>
    </div>
  );
}

export default PricingPage;
