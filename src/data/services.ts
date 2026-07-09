import type { Service } from '../types';

export const services: Service[] = [
  {
    id: 'web-development',
    icon: 'Globe',
    title: 'Website Development',
    description: 'Professional, responsive websites for digital presence',
    detailedDescription:
      'We build professional, responsive websites using a mobile-first approach with custom designs tailored to your brand. Our sites are SEO-optimized from the ground up and integrate seamlessly with your preferred CMS for easy content management.',
    features: [
      'Custom design & branding',
      'Mobile-first responsive development',
      'SEO optimization built-in',
      'CMS integration (WordPress, Headless)',
      'Performance & Core Web Vitals tuning',
    ],
    useCases: ['Business & corporate websites', 'E-commerce stores', 'Non-profit & community portals', 'Portfolios & landing pages'],
    category: 'development',
  },
  {
    id: 'ai-solutions',
    icon: 'Brain',
    title: 'AI Solutions & Chatbots',
    description: 'AI-powered assistants and tools for engagement and productivity',
    detailedDescription:
      'Harness the power of artificial intelligence with custom chatbot development, GPT/LLM integration, and natural language processing solutions. We build intelligent automation that scales your team without scaling costs — across any industry.',
    features: [
      'Custom chatbot development',
      'GPT & LLM integration',
      'Natural language processing',
      'Customer service automation',
      'AI-powered content generation',
    ],
    useCases: ['Customer support & engagement', 'Healthcare appointment systems', 'Retail & e-commerce assistants', 'Internal knowledge bases'],
    category: 'ai',
  },
  {
    id: 'data-engineering',
    icon: 'Database',
    title: 'Data Engineering & Business Intelligence',
    description: 'Turn your raw data into actionable business insights',
    detailedDescription:
      'Unlock the value hidden in your data. We design and build data pipelines, warehouses, and analytics dashboards that transform raw data into clear, actionable business insights. Whether you need real-time reporting, predictive analytics, or a complete data strategy — we help you make smarter decisions backed by evidence.',
    features: [
      'Data pipeline design & automation (ETL/ELT)',
      'Data warehouse & lake architecture',
      'Business intelligence dashboards',
      'Real-time analytics & reporting',
      'Predictive analytics & forecasting',
      'Data quality & governance frameworks',
    ],
    useCases: ['Sales & revenue analytics', 'Operational performance tracking', 'Customer behaviour insights', 'Supply chain optimization', 'Financial reporting & forecasting'],
    category: 'data',
  },
  {
    id: 'cloud-engineering',
    icon: 'Cloud',
    title: 'Cloud Engineering',
    description: 'Secure, scalable AWS cloud solutions',
    detailedDescription:
      'Design, build, and manage robust AWS cloud infrastructure. From architecture design and cloud migration to DevOps pipelines, serverless applications, and cost optimization — we ensure your infrastructure is secure, scalable, and cost-effective.',
    features: [
      'Architecture design & review',
      'Cloud migration strategy',
      'DevOps & CI/CD pipelines',
      'Serverless application development',
      'Cost optimization & monitoring',
    ],
    useCases: ['Startup scaling', 'Enterprise migration', 'Multi-region deployment', 'Disaster recovery & backup'],
    category: 'cloud',
  },
  {
    id: 'business-automation',
    icon: 'Cog',
    title: 'Business Automation',
    description: 'Workflow and process automation to boost efficiency',
    detailedDescription:
      'Streamline your operations with intelligent workflow and process automation. We integrate CRM systems, automate marketing, handle document processing, and build pipelines that eliminate manual tasks and reduce errors — in any industry.',
    features: [
      'CRM integration & automation',
      'Email & marketing automation',
      'Document & invoice processing',
      'Data pipelines & ETL',
      'Workflow orchestration',
    ],
    useCases: ['Finance & accounting workflows', 'HR & recruitment automation', 'Sales pipeline management', 'Logistics & operations', 'Client notification systems'],
    category: 'automation',
  },
  {
    id: 'custom-software',
    icon: 'Code',
    title: 'Custom Software Development',
    description: 'Bespoke applications tailored to your business needs',
    detailedDescription:
      'We deliver bespoke software applications built to solve your unique business challenges. From full-stack development and API design to database architecture and third-party integrations, we create systems that work exactly the way you need — across every sector.',
    features: [
      'Full-stack application development',
      'RESTful & GraphQL API design',
      'Database architecture & optimization',
      'Third-party integrations',
      'Scalable microservices',
    ],
    useCases: ['Financial management platforms', 'Healthcare & patient systems', 'Inventory & asset management', 'Booking & scheduling platforms', 'Education portals'],
    category: 'development',
  },
  {
    id: 'aws-training',
    icon: 'GraduationCap',
    title: 'AWS Training & Mentorship',
    description: 'Hands-on AWS training and mentorship for cloud skills',
    detailedDescription:
      'Accelerate your cloud journey with hands-on AWS training and mentorship. We offer certification preparation, interactive workshops, 1-on-1 mentoring sessions, and team upskilling programs designed for all experience levels.',
    features: [
      'AWS certification preparation',
      'Interactive workshops',
      '1-on-1 mentoring sessions',
      'Team upskilling programs',
      'Hands-on lab exercises',
    ],
    useCases: ['Career changers', 'Development teams', 'Enterprise upskilling', 'University students'],
    category: 'training',
  },
];
