import { Skill } from '@/types/chart';

export const skills: Skill[] = [
  // Design Craft
  {
    id: 'user-research',
    name: 'User Research',
    shortName: 'Research',
    category: 'design-craft',
    description: 'Planning, conducting, and synthesizing user research to drive design decisions.',
  },
  {
    id: 'visual-design',
    name: 'Visual Design',
    shortName: 'Visual',
    category: 'design-craft',
    description: 'UI aesthetics, typography, layout systems, and color theory.',
  },
  {
    id: 'interaction-design',
    name: 'Interaction Design',
    shortName: 'Interaction',
    category: 'design-craft',
    description: 'User flows, transitions, micro-interactions, and usability patterns.',
  },
  {
    id: 'information-architecture',
    name: 'Information Architecture',
    shortName: 'IA',
    category: 'design-craft',
    description: 'Content structure, navigation systems, and taxonomy design.',
  },
  // Tech & AI Leverage
  {
    id: 'ai-tool-mastery',
    name: 'AI Tool Mastery',
    shortName: 'AI Tools',
    category: 'tech-ai',
    description: 'Leveraging AI agents, prompt engineering, and AI-assisted workflows.',
  },
  {
    id: 'code-literacy',
    name: 'Code Literacy',
    shortName: 'Code',
    category: 'tech-ai',
    description: 'Reading and writing code, understanding technical constraints and systems.',
  },
  {
    id: 'data-analysis',
    name: 'Data Analysis',
    shortName: 'Data',
    category: 'tech-ai',
    description: 'Metrics interpretation, A/B testing, and quantitative reasoning.',
  },
  {
    id: 'rapid-prototyping',
    name: 'Rapid Prototyping',
    shortName: 'Prototyping',
    category: 'tech-ai',
    description: 'Fast iteration with code, Figma, and AI-powered prototyping tools.',
  },
  // Startup Dynamics
  {
    id: 'business-strategy',
    name: 'Business Strategy',
    shortName: 'Strategy',
    category: 'startup-dynamics',
    description: 'Market awareness, prioritization, and product-business alignment.',
  },
  {
    id: 'cross-functional-leadership',
    name: 'Cross-functional Leadership',
    shortName: 'Leadership',
    category: 'startup-dynamics',
    description: 'Working across engineering, marketing, and sales; mentoring others.',
  },
  {
    id: 'speed-execution',
    name: 'Speed & Execution',
    shortName: 'Speed',
    category: 'startup-dynamics',
    description: 'Shipping fast, unblocking yourself, and scrappy problem-solving.',
  },
  {
    id: 'communication',
    name: 'Communication',
    shortName: 'Comms',
    category: 'startup-dynamics',
    description: 'Storytelling, documentation, and stakeholder alignment.',
  },
];

export const skillIds = skills.map((s) => s.id);
export const skillMap = Object.fromEntries(skills.map((s) => [s.id, s]));
