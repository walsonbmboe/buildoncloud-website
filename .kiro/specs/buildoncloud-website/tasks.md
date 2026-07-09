e# Implementation Plan: BuildOnCloud Technologies Website

## Overview

This plan implements the BuildOnCloud Technologies premium dark-themed website as a React 18+ SPA with TypeScript (strict mode), Tailwind CSS, Framer Motion, Lucide Icons, and Vite 5+. Tasks are ordered to build foundational infrastructure first, then shared components, then pages, and finally cross-cutting concerns (SEO, accessibility, performance). Each task builds incrementally on prior work with no orphaned code.

## Tasks

- [ ] 1. Project scaffolding and core configuration
  - [ ] 1.1 Initialize Vite project with React and TypeScript
    - Run `npm create vite@latest` with React + TypeScript template
    - Enable `strict: true` in tsconfig.json
    - Install dependencies: react 18+, react-dom, react-router-dom v6, framer-motion, lucide-react, react-helmet-async
    - Install dev dependencies: tailwindcss, postcss, autoprefixer, vitest, @testing-library/react, @testing-library/jest-dom, jsdom, fast-check, vite-plugin-html-prerender
    - Configure Vitest in vite.config.ts with jsdom environment
    - _Requirements: 1.1, 1.4, 1.5, 1.6_

  - [ ] 1.2 Configure Tailwind CSS with custom dark theme
    - Initialize Tailwind with `npx tailwindcss init -p`
    - Define custom color palette in tailwind.config.ts: navy (#0a0f1e, #0d1224), charcoal (#1a1f2e, #1e2333), electric blue (#3b82f6, #2563eb), cyan (#06b6d4, #0891b2)
    - Add custom font families, spacing scale, and screen breakpoints (640, 768, 1024, 1280)
    - Add glassmorphism utility classes (backdrop-blur, translucent backgrounds)
    - Create `src/styles/globals.css` with Tailwind directives and CSS custom properties
    - _Requirements: 1.2, 2.1, 2.2, 2.3, 2.4, 3.1_

  - [ ] 1.3 Set up project directory structure and TypeScript types
    - Create directory structure: src/components/{layout,ui,common}, src/pages, src/hooks, src/data, src/utils, src/types, src/styles, src/assets
    - Create `src/types/index.ts` with all shared interfaces: Service, PortfolioProject, PricingTier, BlogArticle, Testimonial, FAQItem, ContactFormData, ValueProposition, StatCounter, NavLink, SEOMetadata
    - _Requirements: 1.1, 1.7_

  - [ ] 1.4 Configure routing with React Router v6
    - Create `src/App.tsx` with BrowserRouter, HelmetProvider, and route definitions
    - Define routes: /, /portfolio, /about, /pricing, /blog, /blog/:slug, /contact
    - Set up React.lazy() code splitting for each page component
    - Wrap routes with Suspense fallback
    - _Requirements: 1.5, 19.2_

- [ ] 2. Shared utilities, hooks, and animation system
  - [ ] 2.1 Create animation utilities and Framer Motion variants
    - Create `src/utils/animation.ts` with shared motion variants: fadeIn, fadeUp, fadeDown, fadeLeft, fadeRight, stagger container, scale hover
    - Define page transition variants (fade with 200-500ms duration)
    - Define scroll reveal variants (fade + translate, 300-600ms)
    - Implement reduced-motion-aware variant factory that returns instant transitions when reduced motion is preferred
    - _Requirements: 19.2, 19.3, 19.4, 21.5_

  - [ ] 2.2 Implement custom hooks
    - Create `src/hooks/useScrollPosition.ts` — returns window.scrollY throttled to 16ms
    - Create `src/hooks/useReducedMotion.ts` — returns boolean from prefers-reduced-motion media query
    - Create `src/hooks/useIntersectionObserver.ts` — returns ref + isInView with threshold and triggerOnce options
    - Create `src/hooks/useCounterAnimation.ts` — animates from 0 to target with ease-out over duration using requestAnimationFrame
    - Create `src/hooks/useFormValidation.ts` — generic form validation with rules, errors, touched state, handleChange, handleBlur, validate, reset
    - _Requirements: 8.4, 8.5, 13.2, 13.4, 18.1, 19.4_

  - [ ] 2.3 Create validation utilities
    - Create `src/utils/validation.ts` with email validation (contains @ + domain with .), field length validation, required field checks
    - Define validation rules for ContactForm and NewsletterForm
    - _Requirements: 13.1, 13.2, 16.2_

  - [ ]* 2.4 Write property tests for form validation (Properties 1, 2, 3)
    - **Property 1: Contact form validation rejects invalid input and preserves data**
    - **Property 2: Contact form validation accepts all valid input**
    - **Property 3: Email format validation correctness**
    - Create `tests/property/validation.property.ts` using fast-check
    - Generate arbitrary contact form data with invalid fields; assert errors returned and data preserved
    - Generate arbitrary valid contact form data; assert zero errors
    - Generate arbitrary strings; assert email validation accepts iff contains @ + domain with .
    - **Validates: Requirements 13.1, 13.2, 13.4, 16.2**

- [ ] 3. Common UI components
  - [ ] 3.1 Implement GlassCard component
    - Create `src/components/common/GlassCard.tsx`
    - Apply bg-white/5, backdrop-blur-xl, border border-white/10, rounded-2xl
    - Support optional hover prop for scale(1.03) + glow effect
    - Accept className for composition
    - _Requirements: 2.3, 7.2_

  - [ ] 3.2 Implement ScrollReveal component
    - Create `src/components/common/ScrollReveal.tsx`
    - Wrap children in motion.div with useInView trigger
    - Support direction (up/down/left/right), delay, duration, threshold props
    - Respect prefers-reduced-motion via useReducedMotion hook
    - _Requirements: 19.3, 19.4, 21.5_

  - [ ] 3.3 Implement Button and SectionHeading components
    - Create `src/components/common/Button.tsx` — variant (primary/secondary/outline), size, onClick, asLink (renders anchor), aria-label support, min 44x44 touch target on mobile
    - Create `src/components/common/SectionHeading.tsx` — title with gradient text, optional subtitle, centered prop
    - _Requirements: 3.7, 21.2, 21.3_

- [ ] 4. Layout components
  - [ ] 4.1 Implement Navbar component
    - Create `src/components/layout/Navbar.tsx`
    - Sticky positioning, max-height 80px, z-index 50
    - Logo as link to /, navigation links in horizontal row
    - useScrollPosition to toggle glassmorphism background (backdrop-blur-xl bg-navy-900/85) when scrolled past hero
    - Active link styling with useLocation()
    - Mobile hamburger menu below 768px with slide-out panel
    - Keyboard accessible (Tab, Enter, Escape to close mobile menu)
    - _Requirements: 4.1, 4.2, 4.3, 4.6, 4.7, 4.8, 3.3, 3.4_

  - [ ] 4.2 Implement Footer component
    - Create `src/components/layout/Footer.tsx`
    - Logo, quick links (all pages), contact info, social links (LinkedIn, Facebook)
    - Newsletter subscription form integration
    - Copyright notice
    - Responsive grid layout
    - _Requirements: 13.5, 16.1_

  - [ ] 4.3 Implement Layout wrapper and LoadingScreen
    - Create `src/components/layout/Layout.tsx` — renders Navbar, Outlet wrapped in AnimatePresence mode="wait", Footer, WhatsAppButton, BackToTopButton
    - Create `src/components/layout/LoadingScreen.tsx` — full-viewport overlay, animated logo, min 800ms / max 3000ms display, 300ms fade-out, waits for document.fonts.ready
    - Wire Layout into App.tsx as parent route element
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 19.2_

- [ ] 5. Checkpoint - Ensure project builds and renders
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 6. Static data files
  - [ ] 6.1 Create all static data files
    - Create `src/data/services.ts` — 5 services with icons, titles, descriptions per Req 7
    - Create `src/data/portfolio.ts` — 6 projects with categories, tech stacks, descriptions per Req 9
    - Create `src/data/pricing.ts` — 3 tiers (Starter, Professional, Enterprise) with features per Req 11
    - Create `src/data/blog.ts` — 4 articles with slugs, categories, keywords, content per Req 12
    - Create `src/data/testimonials.ts` — 3+ testimonials with names, companies, text per Req 14
    - Create `src/data/faq.ts` — 3+ FAQ items per Req 15
    - Create `src/data/seo.ts` — per-page SEO metadata (titles 30-60 chars, descriptions 50-160 chars, unique titles)
    - _Requirements: 7.1, 7.3-7.7, 9.1, 11.1, 11.2, 12.1, 14.1, 15.1, 20.1_

- [ ] 7. Home page implementation
  - [ ] 7.1 Implement Hero section
    - Create Hero section within `src/pages/HomePage.tsx`
    - Headline: "Building Smarter Businesses Through Technology"
    - Subheading: "Empowering Businesses Through Cloud, AI & Digital Transformation."
    - Two CTA buttons: "Get Started" → /contact, "View Services" → scroll to services
    - Animated particle/geometric background with Framer Motion (fallback to CSS gradient)
    - Staggered fade-in/slide-up animation for text elements (1.5s total, 300ms stagger)
    - Full viewport height on 768px+ viewports
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 6.8, 6.9_

  - [ ] 7.2 Implement Services section
    - Create Services section with SectionHeading + 5 ServiceCard components
    - Create `src/components/ui/ServiceCard.tsx` — GlassCard with Lucide icon, title, description, hover scale + glow, staggered scroll reveal
    - Responsive grid: 3 columns desktop, 2 tablet, 1 mobile
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7, 7.8_

  - [ ] 7.3 Implement Why Choose Us section with animated counters
    - Create Why Choose Us section with 6 value proposition items in grid (3 per row desktop, 1 mobile)
    - Create `src/components/ui/AnimatedCounter.tsx` — uses useCounterAnimation + useIntersectionObserver, animates 0→target over 2000ms, triggers once
    - Display 3 stat counters (projects, clients, years)
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6_

  - [ ] 7.4 Implement Testimonials section
    - Create `src/components/ui/TestimonialCard.tsx` — client name, company, text, avatar
    - Create Testimonials carousel in HomePage — auto-rotate at 5s intervals, pause on interaction, resume after 10s idle
    - Navigation controls (dots/arrows), fade/slide transition (400ms)
    - Wrap from last→first and first→last
    - _Requirements: 14.1, 14.2, 14.3, 14.4, 14.5_

  - [ ]* 7.5 Write property test for testimonial carousel navigation
    - **Property 8: Testimonial carousel modular navigation**
    - Create `tests/property/carousel.property.ts` using fast-check
    - Generate arbitrary start index and step sequences; assert result equals (start + steps) mod totalItems
    - **Validates: Requirements 14.2**

  - [ ] 7.6 Implement FAQ section
    - Create `src/components/ui/FAQAccordion.tsx` — single-open accordion, height animation (200-400ms), chevron rotation, aria-expanded, aria-controls, keyboard support (Enter/Space)
    - Render FAQ items from data file
    - _Requirements: 15.1, 15.2, 15.3, 15.4, 15.5_

  - [ ]* 7.7 Write property test for FAQ accordion
    - **Property 6: FAQ accordion single-open invariant**
    - Create `tests/property/faq.property.ts` using fast-check
    - Generate arbitrary sequences of toggle actions; assert at most one item expanded after each action
    - **Validates: Requirements 15.2, 15.3, 15.4**

  - [ ] 7.8 Implement Newsletter section
    - Create `src/components/ui/NewsletterForm.tsx` — email input (min-width 200px), subscribe button, email validation, success/error messages, clear on success
    - Place in HomePage and Footer
    - _Requirements: 16.1, 16.2, 16.3, 16.4_

- [ ] 8. Portfolio page implementation
  - [ ] 8.1 Implement Portfolio page with filtering
    - Create `src/pages/PortfolioPage.tsx`
    - Create `src/components/ui/PortfolioCard.tsx` — image, title, description (120 chars), tech tags, "View Details" button
    - Implement category filter buttons (default: show all)
    - AnimatePresence fade transitions (200-400ms) on filter change
    - "No results" message when filter matches nothing
    - Project detail view (modal or expanded) with full description, tech stack, objectives, live/demo links
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6_

  - [ ]* 8.2 Write property test for portfolio filtering
    - **Property 5: Portfolio category filter completeness**
    - Create `tests/property/filter.property.ts` using fast-check
    - Generate arbitrary category selections; assert filtered results contain exactly matching projects
    - **Validates: Requirements 9.2, 9.3**

- [ ] 9. About page implementation
  - [ ] 9.1 Implement About page
    - Create `src/pages/AboutPage.tsx`
    - Company story section (min 50 chars)
    - Mission statement: "Empowering businesses through Cloud, AI & Digital Transformation"
    - Vision statement: "Trusted technology partner delivering innovative solutions"
    - Scroll-triggered fade-in animations per section (600ms)
    - Error boundary wrapping each section for graceful degradation
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_

- [ ] 10. Pricing page implementation
  - [ ] 10.1 Implement Pricing page with tier navigation
    - Create `src/pages/PricingPage.tsx`
    - Create `src/components/ui/PricingCard.tsx` — tier name, price with currency, feature list (3-8 items), CTA button
    - Professional tier highlighted with "Recommended" badge + distinct border/glow
    - Hover animation: scale 1.02-1.05 + elevated glow (300ms)
    - CTA click navigates to /contact?tier={tierName}
    - Consistent card heights via flex-grow strategy
    - Horizontal row on 768px+, vertical stack below
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5, 11.7_

- [ ] 11. Blog page implementation
  - [ ] 11.1 Implement Blog listing page with search and filtering
    - Create `src/pages/BlogPage.tsx`
    - Create `src/components/ui/BlogCard.tsx` — featured image (lazy-loaded, alt text), title (100 chars), date, category tag, excerpt (150 chars)
    - Search input (30+ chars width) filtering by title + keywords, debounced 1s
    - Category filter buttons
    - Combined search + category filtering (intersection)
    - "No results" message when filters yield nothing
    - Click navigates to /blog/:slug
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5, 12.6, 12.7_

  - [ ] 11.2 Implement Blog article page
    - Create `src/pages/BlogArticlePage.tsx`
    - Display full article content, title, date, category, featured image
    - Route param `:slug` lookup from blog data
    - Back navigation to /blog
    - _Requirements: 12.6_

  - [ ]* 11.3 Write property test for blog search and filter
    - **Property 4: Blog search and filter intersection**
    - Add to `tests/property/filter.property.ts` using fast-check
    - Generate arbitrary search terms and categories; assert filtered results satisfy both criteria with no false exclusions
    - **Validates: Requirements 12.2, 12.4, 12.7**

- [ ] 12. Contact page implementation
  - [ ] 12.1 Implement Contact page with form validation
    - Create `src/pages/ContactPage.tsx`
    - Create `src/components/ui/ContactForm.tsx` — fields: name, email, phone (optional), subject, message
    - Use useFormValidation hook with validation rules
    - Read `?tier=` query param to pre-fill tier display
    - Inline error messages per field on blur/submit
    - Success: confirmation message + clear form
    - Error: error banner + preserve all data
    - Focus management: focus first invalid field on error
    - Contact info: email, phone, social links (LinkedIn, Facebook)
    - WhatsApp contact button
    - Google Maps placeholder
    - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.5, 13.6, 13.7, 13.8, 11.5_

- [ ] 13. Floating components
  - [ ] 13.1 Implement WhatsApp button and Back-to-top button
    - Create `src/components/ui/WhatsAppButton.tsx` — fixed bottom-right (bottom-6 right-6), z-40, green (#25D366) circle, WhatsApp icon, pulse animation (3s cycle), opens wa.me link, min 44x44 touch target
    - Create `src/components/ui/BackToTopButton.tsx` — visible when scrollY > 400px, fade in/out (300ms), fixed position above WhatsApp (bottom-20 right-6), smooth scroll to top (300-800ms), keyboard focusable, aria-label
    - Ensure 10px minimum spacing between buttons
    - _Requirements: 17.1, 17.2, 17.3, 17.4, 17.5, 18.1, 18.2, 18.3, 18.4_

- [ ] 14. Checkpoint - Full application integration test
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 15. SEO and metadata
  - [ ] 15.1 Implement SEO module with react-helmet-async
    - Create `src/utils/seo.ts` — helper functions for generating meta tags, Open Graph, Twitter Card, JSON-LD structured data
    - Create SEO component that reads from `src/data/seo.ts` and injects Helmet tags per page
    - Implement Organization JSON-LD and Service JSON-LD schemas
    - Add fallback logic: if title/description not provided, derive from page heading/content
    - Integrate SEO component into each page
    - _Requirements: 20.1, 20.2, 20.5, 20.7_

  - [ ] 15.2 Configure pre-rendering and sitemap generation
    - Configure vite-plugin-html-prerender for all routes (/, /portfolio, /about, /pricing, /blog, /contact)
    - Generate sitemap.xml at build time listing all public pages
    - Ensure semantic HTML structure (header, main, nav, section, article, footer) on all pages
    - _Requirements: 20.3, 20.4, 20.6_

  - [ ]* 15.3 Write property test for SEO metadata
    - **Property 7: SEO metadata uniqueness and bounds**
    - Create `tests/property/seo.property.ts` using fast-check
    - For all pages: assert title 30-60 chars, description 50-160 chars, no duplicate titles
    - **Validates: Requirements 20.1**

- [ ] 16. Accessibility compliance
  - [ ] 16.1 Implement accessibility features across all components
    - Audit and add ARIA labels/roles to all interactive elements (buttons, links, nav, accordion, carousel)
    - Ensure keyboard navigation works (Tab, Enter, Space, Escape, Arrow keys)
    - Add visible focus indicators (3:1 contrast)
    - Add descriptive alt text to all informative images (≤150 chars), role="presentation" on decorative images
    - Ensure prefers-reduced-motion disables all non-essential animations
    - Add ARIA live regions for dynamic content (form success/error messages, carousel changes)
    - Ensure 4.5:1 contrast for normal text, 3:1 for large text
    - _Requirements: 21.1, 21.2, 21.3, 21.4, 21.5, 21.6, 21.7_

  - [ ]* 16.2 Write accessibility automated tests
    - Install vitest-axe (or @axe-core/react)
    - Create `tests/a11y/accessibility.test.tsx` — render each page and run axe-core audit
    - Assert zero critical/serious violations per page
    - _Requirements: 21.1_

- [ ] 17. Performance optimization and deployment
  - [ ] 17.1 Implement performance optimizations
    - Verify code splitting per page route with React.lazy()
    - Add image lazy loading with loading="lazy" attribute
    - Preload hero fonts with `<link rel="preload">`
    - Configure font-display: swap in CSS
    - Verify initial bundle size < 200KB with Vite build analysis
    - Add responsive image dimensions to prevent CLS
    - _Requirements: 1.6, 6.8_

  - [ ] 17.2 Configure Netlify deployment
    - Create `netlify.toml` with build command, publish directory, SPA redirect rules (/* → /index.html)
    - Configure cache headers for static assets
    - Add `_redirects` file for client-side routing support
    - _Requirements: 1.6_

- [ ] 18. Final checkpoint - Ensure all tests pass and build succeeds
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document
- Unit tests validate specific examples and edge cases
- The tech stack is fixed: React 18+, TypeScript (strict), Tailwind CSS, Framer Motion, Lucide Icons, Vite 5+, React Router v6, react-helmet-async, Vitest, fast-check
- All static content data lives in `src/data/` as typed TypeScript constants — no runtime fetching needed
- Pre-rendering with vite-plugin-html-prerender ensures SEO crawlability

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1"] },
    { "id": 1, "tasks": ["1.2", "1.3"] },
    { "id": 2, "tasks": ["1.4", "2.1", "2.3"] },
    { "id": 3, "tasks": ["2.2", "3.1", "3.2", "3.3"] },
    { "id": 4, "tasks": ["2.4", "4.1", "4.2", "6.1"] },
    { "id": 5, "tasks": ["4.3"] },
    { "id": 6, "tasks": ["7.1", "7.2", "7.3", "7.8", "9.1"] },
    { "id": 7, "tasks": ["7.4", "7.6", "8.1", "10.1", "11.1"] },
    { "id": 8, "tasks": ["7.5", "7.7", "8.2", "11.2", "11.3", "12.1"] },
    { "id": 9, "tasks": ["13.1"] },
    { "id": 10, "tasks": ["15.1", "15.2", "16.1"] },
    { "id": 11, "tasks": ["15.3", "16.2", "17.1"] },
    { "id": 12, "tasks": ["17.2"] }
  ]
}
```
