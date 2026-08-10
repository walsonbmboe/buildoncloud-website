import { Link } from 'react-router-dom';
import {
  Globe2,
  Award,
  Target,
  Eye,
  Rocket,
  Calendar,
  Lightbulb,
  Shield,
  Heart,
} from 'lucide-react';
import founderImage from '../assets/founder.png';
import ScrollReveal from '../components/common/ScrollReveal';
import SectionHeading from '../components/common/SectionHeading';
import GlassCard from '../components/common/GlassCard';
import PageHero from '../components/common/PageHero';
import SEO from '../components/common/SEO';

// AWS Certifications data
const certifications = [
  { title: 'AWS Certified Solutions Architect – Associate', color: 'from-orange-400 to-orange-600', credlyUrl: 'https://www.credly.com/users/walson-baiye-mboe' },
  { title: 'AWS Certified Data Engineer – Associate', color: 'from-blue-400 to-blue-600', credlyUrl: 'https://www.credly.com/users/walson-baiye-mboe' },
  { title: 'AWS Certified Machine Learning Engineer – Associate', color: 'from-green-400 to-green-600', credlyUrl: 'https://www.credly.com/users/walson-baiye-mboe' },
  { title: 'AWS Artificial Intelligence Practitioner', color: 'from-purple-400 to-purple-600', credlyUrl: 'https://www.credly.com/users/walson-baiye-mboe' },
];

function AboutPage() {
  return (
    <div>
      <SEO pageKey="about" />

      {/* Section 1: Hero Banner */}
      <PageHero
        variant="gradient"
        title="About BuildOnCloud"
        accentText="BuildOnCloud"
        subtitle="Your AWS Cloud, AI & Digital Innovation partner — proudly serving clients across Africa, Europe, and beyond"
      />

      {/* Section 2: Our Story */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <SectionHeading title="Our Story" centered />
            <div className="mt-8 space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                BuildOnCloud was founded with a simple but ambitious mission — to help businesses
                unlock the power of cloud computing, artificial intelligence, and modern digital technologies.
                Born in Cameroon, we serve clients across Africa, Europe, and wherever businesses are ready to transform.
              </p>
              <p>
                Many organizations — particularly across Africa and emerging markets — face challenges such as outdated systems, high IT costs,
                limited technical expertise, and inefficient manual processes. BuildOnCloud exists to solve
                these challenges by delivering secure, scalable, and affordable digital solutions.
              </p>
              <p>
                Rather than simply building websites, we help organizations transform how they operate using
                AWS Cloud, AI, Automation, Data Engineering, and Business Intelligence.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Section 3: Mission & Vision */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ScrollReveal direction="left">
              <GlassCard className="p-8 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                    <Target className="w-6 h-6 text-electric-500" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Our Mission</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  To empower businesses worldwide with secure, scalable, and innovative cloud
                  technologies that drive sustainable growth and digital transformation.
                </p>
              </GlassCard>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <GlassCard className="p-8 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center">
                    <Eye className="w-6 h-6 text-purple-500" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Our Vision</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  To become a globally trusted AWS Cloud and AI consulting company, helping
                  organizations leverage world-class technology to compete on any stage.
                </p>
              </GlassCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Section: Core Values */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <SectionHeading title="Our Core Values" subtitle="The principles that guide everything we do" centered />
          </ScrollReveal>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Lightbulb,
                title: 'Innovation',
                description: 'Embracing cutting-edge technologies to deliver forward-thinking solutions for businesses everywhere.',
              },
              {
                icon: Rocket,
                title: 'Excellence',
                description: 'Committing to the highest standards in every project we deliver, no matter the size.',
              },
              {
                icon: Heart,
                title: 'Collaboration',
                description: 'Working closely with clients to understand and exceed their expectations at every step.',
              },
              {
                icon: Shield,
                title: 'Integrity',
                description: 'Building trust through transparency, reliability, and ethical business practices.',
              },
            ].map((value, index) => (
              <ScrollReveal key={value.title} direction="up" delay={index * 0.1}>
                <GlassCard className="p-6 text-center h-full">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50">
                    <value.icon className="h-7 w-7 text-electric-500" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{value.title}</h3>
                  <p className="mt-2 text-sm text-gray-600">{value.description}</p>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Meet the Founder */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <SectionHeading title="Meet Our Founder" centered />
          </ScrollReveal>

          <div className="mt-12 flex flex-col lg:flex-row gap-10 items-start">
            {/* Founder photo placeholder */}
            <ScrollReveal direction="left" delay={0.1}>
              <div className="flex-shrink-0 mx-auto lg:mx-0">
                <img
                  src={founderImage}
                  alt="Walson Baiye Mboe - Founder of BuildOnCloud Technologies"
                  className="w-64 h-64 md:w-72 md:h-72 rounded-2xl object-cover border border-gray-200 shadow-lg"
                />
              </div>
            </ScrollReveal>

            {/* Founder info */}
            <ScrollReveal direction="right" delay={0.2}>
              <div className="flex-1 min-w-0">
                <h3 className="text-2xl font-bold text-gray-900">Walson Baiye Mboe</h3>
                <p className="mt-1 text-electric-500 font-medium">
                  Founder & AWS Cloud Solutions Architect/Machine Learning Engineer
                </p>

                <div className="mt-6 space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    Walson Baiye Mboe is an AWS-certified Cloud Engineer with a background in Finance
                    and a passion for helping businesses leverage technology for growth.
                  </p>
                  <p>
                    He founded BuildOnCloud after recognizing that many organizations — especially in Africa — struggle to adopt modern cloud technologies due to cost, complexity, and limited
                    access to expertise.
                  </p>
                  <p>
                    His goal is to bridge that gap by delivering enterprise-grade AWS Cloud, Artificial
                    Intelligence, Data Engineering, and Digital Transformation solutions tailored to
                    businesses of all sizes.
                  </p>
                </div>

                {/* AWS Certifications */}
                <div className="mt-8">
                  <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Award className="w-4 h-4 text-orange-500" aria-hidden="true" />
                    AWS Certifications
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {certifications.map((cert) => (
                      <a
                        key={cert.title}
                        href={cert.credlyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100 hover:border-blue-200 hover:bg-blue-50/50 transition-colors duration-200"
                      >
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${cert.color} flex items-center justify-center flex-shrink-0`}>
                          <Award className="w-4 h-4 text-white" aria-hidden="true" />
                        </div>
                        <span className="text-xs font-medium text-gray-700">{cert.title}</span>
                      </a>
                    ))}
                  </div>
                  <p className="mt-4 text-xs text-gray-500">
                    <a href="https://www.credly.com/users/walson-baiye-mboe" target="_blank" rel="noopener noreferrer" className="text-electric-500 hover:text-electric-600 underline">
                      Verify all certifications on Credly →
                    </a>
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Section 5: Why Africa? */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        {/* African-themed gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-amber-50/50 to-yellow-50/30" aria-hidden="true" />
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(234,88,12,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(59,130,246,0.2) 0%, transparent 50%)' }} aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal direction="up">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-orange-100 border border-orange-200">
              <Globe2 className="w-4 h-4 text-orange-600" aria-hidden="true" />
              <span className="text-sm font-medium text-orange-700">Our Roots</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Our African Heritage</h2>
            <div className="mt-8 space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                Africa is home to one of the world's fastest-growing digital economies. BuildOnCloud was born here — in Cameroon — and our African roots give us a unique perspective on building technology that's accessible, practical, and impactful.
              </p>
              <p>
                While we serve clients globally, we're especially passionate about making AWS Cloud, AI, and Digital Transformation accessible to African organizations that have been underserved by the technology industry.
              </p>
              <p>
                From startups and SMEs to NGOs, educational institutions, healthcare providers, and enterprises — we build solutions that work for businesses at every stage, in every market.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Section 8: Call to Action */}
      <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-r from-electric-500 to-purple-600">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-white/5 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal direction="up">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Ready to Transform Your Business?
            </h2>
            <p className="mt-6 text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              Whether you're launching your first website, migrating to AWS Cloud, implementing AI
              solutions, or modernizing your business processes, BuildOnCloud is here to help.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="https://calendly.com/buildoncloud-awsconsult/30min" target="_blank" rel="noopener noreferrer">
                <button className="px-8 py-3 bg-white text-electric-600 font-bold rounded-xl hover:bg-gray-100 transition-colors duration-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-electric-500 flex items-center gap-2">
                  <Calendar className="w-5 h-5" aria-hidden="true" />
                  Schedule a Free Consultation
                </button>
              </a>
              <Link to="/services">
                <button className="px-8 py-3 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-electric-500 flex items-center gap-2">
                  <Rocket className="w-5 h-5" aria-hidden="true" />
                  View Our Services
                </button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
