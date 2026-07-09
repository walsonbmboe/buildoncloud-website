import type { PortfolioProject } from '../types';

export const portfolioProjects: PortfolioProject[] = [
  {
    id: 'midlands-african-choir',
    title: 'The Midlands African Choir UK',
    shortDescription: 'A vibrant community choir website with event management, media galleries, and membership features.',
    fullDescription:
      'Built a modern, responsive website for The Midlands African Choir UK featuring event scheduling, photo and video galleries, member registration, and community news updates. The site showcases the choir\'s performances and cultural impact across the Midlands region.',
    image: '/images/portfolio/midlands-choir.webp',
    category: 'web',
    techStack: ['React', 'Tailwind', 'Node.js'],
    objectives: [
      'Create an engaging online presence for the choir',
      'Enable event discovery and registration',
      'Showcase media from past performances',
    ],
    liveUrl: 'https://midlandsafricanchoir.co.uk',
  },
  {
    id: 'ghost-audit',
    title: 'Ghost Audit',
    shortDescription: 'An AI-powered tax compliance platform for UK self-employed individuals, featuring Amazon Bedrock Agents and automated HMRC audit risk assessment.',
    fullDescription:
      'Ghost Audit is an AI-powered tax compliance platform designed for UK self-employed individuals. It features Amazon Bedrock Agents, a RAG Knowledge Base for real-time HMRC guidance, and automated audit risk assessment. The platform helps freelancers and sole traders stay compliant by identifying potential tax risks before they become problems. Selected as a Top 300 project in the AWS AIdeas Competition.',
    image: '/images/portfolio/ghost-audit.webp',
    category: 'ai',
    techStack: ['Amazon Bedrock', 'Lambda', 'React'],
    objectives: [
      'Automate tax compliance risk detection for self-employed workers',
      'Leverage RAG Knowledge Base for accurate HMRC guidance',
      'Build intelligent agents for audit risk scoring',
    ],
  },
  {
    id: 'audit-ai',
    title: 'AuditAI',
    shortDescription: 'An enterprise audit intelligence platform with a six-domain scoring engine and Amazon Nova Pro-powered anomaly detection pipeline.',
    fullDescription:
      'AuditAI is an enterprise audit intelligence platform featuring a six-domain scoring engine and an Amazon Nova Pro-powered anomaly detection pipeline. Currently under institutional client review, it automates the identification of financial irregularities, compliance gaps, and operational risks across complex organizational structures.',
    image: '/images/portfolio/audit-ai.webp',
    category: 'ai',
    techStack: ['Amazon Bedrock', 'Step Functions', 'CloudFormation'],
    objectives: [
      'Build a multi-domain audit scoring engine',
      'Implement AI-driven anomaly detection at enterprise scale',
      'Automate compliance and risk assessment workflows',
    ],
  },
  {
    id: 'presmfi-digital-platform',
    title: 'Microfinance Digital Platform',
    shortDescription: 'A cloud-powered digital transformation platform for a leading microfinance institution in Central Africa, featuring automated client messaging and churn prediction.',
    fullDescription:
      'A comprehensive digital transformation platform built for a leading microfinance institution in Central Africa. Features include automated client messaging and notifications, a loan recommendation engine powered by machine learning, and churn prediction models to identify at-risk customers. Built on AWS with Amplify, Glue ETL pipelines, and SageMaker for ML workloads.',
    image: '/images/portfolio/presmfi.webp',
    category: 'ai',
    techStack: ['AWS Amplify', 'Glue ETL', 'SageMaker', 'Lambda', 'API Integration'],
    objectives: [
      'Digitise client communication and loan management',
      'Build ML-powered loan recommendation engine',
      'Implement customer churn prediction models',
    ],
  },
  {
    id: 'glaw-school',
    title: 'GLAW School — God\'s Love & Wisdom School',
    shortDescription: 'A premium, responsive school website for a faith-based Daycare, Bilingual Nursery & Primary School in Kumba, Cameroon.',
    fullDescription:
      'A premium, responsive school website for God\'s Love & Wisdom School (GLAW), a faith-based Daycare, Bilingual Nursery & Primary School in Kumba, Cameroon. Features animated sections, Netlify Forms integration for parent inquiries, SEO optimization, and a modern design system built with React, Tailwind CSS, Framer Motion, and TypeScript.',
    image: '/images/portfolio/glaw-school.webp',
    category: 'web',
    techStack: ['React', 'Tailwind', 'Framer Motion', 'TypeScript', 'Vite'],
    objectives: [
      'Establish a professional online presence for the school',
      'Enable parent inquiries through Netlify Forms',
      'Showcase school programs, facilities, and values',
    ],
    liveUrl: 'https://glawschoolcameroon.netlify.app',
  },
];
