import { Link } from 'react-router-dom'
import { Linkedin, Facebook, Mail, Phone, MapPin, MessageCircle } from 'lucide-react'
import NewsletterForm from '../ui/NewsletterForm'
import logo from '../../assets/high-level-description-a-premium-futuris_f3vHQt_SWbScCaxkD5y_kw_UlApLCgFRFmxf_vEPckIXw_cover.jpg'

const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'About', path: '/about' },
  { label: 'Pricing', path: '/pricing' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
]

const socialLinks = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/buildoncloud',
    icon: Linkedin,
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/buildoncloud',
    icon: Facebook,
  },
]

function Footer() {
  return (
    <footer
      className="bg-[#1a1a2e] border-t border-white/10"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* 4-column grid: 1 on mobile, 2 on tablet, 4 on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: Logo + Company Tagline */}
          <div className="space-y-4">
            <Link to="/" className="inline-flex items-center gap-3 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-electric-500" aria-label="BuildOnCloud Technologies Home">
              <div className="w-11 h-11 rounded-full overflow-hidden ring-2 ring-white/30 flex-shrink-0">
                <img
                  src={logo}
                  alt="BuildOnCloud Technologies"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-lg font-bold text-white">
                BuildOnCloud
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Empowering Businesses Through Cloud, AI &amp; Digital Transformation.
            </p>
            <p className="text-gray-500 text-sm">
              Build. Innovate. Scale.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <nav aria-label="Footer navigation">
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-electric-500 transition-colors duration-200 text-sm rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-electric-500"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Column 3: Contact Info + Social Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:buildoncloud.awsconsult@gmail.com"
                  className="flex items-center gap-2 text-gray-400 hover:text-electric-500 transition-colors duration-200 text-sm rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-electric-500"
                >
                  <Mail className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                  <span>buildoncloud.awsconsult@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+4407440241808"
                  className="flex items-center gap-2 text-gray-400 hover:text-electric-500 transition-colors duration-200 text-sm rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-electric-500"
                >
                  <Phone className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                  <span>+44 07440 241 808</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/447440241808"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-400 hover:text-electric-500 transition-colors duration-200 text-sm rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-electric-500"
                >
                  <MessageCircle className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                  <span>+44 07440 241 808 (WhatsApp)</span>
                </a>
              </li>
              <li>
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <MapPin className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                  <span>Cameroon &amp; United Kingdom</span>
                </div>
              </li>
            </ul>

            {/* Social Links */}
            <div className="mt-6">
              <h4 className="text-white font-medium text-sm mb-3">Follow Us</h4>
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-electric-500 hover:border-electric-500/50 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-electric-500"
                    aria-label={`Follow us on ${social.label}`}
                  >
                    <social.icon className="w-4 h-4" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Column 4: Newsletter Form */}
          <div>
            <h3 className="text-white font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">
              Stay updated with the latest in cloud, AI, and digital transformation.
            </p>
            <NewsletterForm variant="dark" />
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-gray-500 text-sm text-center">
            &copy; {new Date().getFullYear()} BuildOnCloud Technologies. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
