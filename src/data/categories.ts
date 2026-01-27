import { Category } from '@/types/chart';

export const categories: Category[] = [
  {
    id: 'design-craft',
    name: 'Design Craft',
    color: '#6366f1',
    colorDark: '#818cf8',
    skills: ['user-research', 'visual-design', 'interaction-design', 'information-architecture'],
  },
  {
    id: 'tech-ai',
    name: 'Tech & AI',
    color: '#06b6d4',
    colorDark: '#22d3ee',
    skills: ['ai-tool-mastery', 'code-literacy', 'data-analysis', 'rapid-prototyping'],
  },
  {
    id: 'startup-dynamics',
    name: 'Startup Dynamics',
    color: '#f59e0b',
    colorDark: '#fbbf24',
    skills: ['business-strategy', 'cross-functional-leadership', 'speed-execution', 'communication'],
  },
];

export const categoryMap = Object.fromEntries(categories.map((c) => [c.id, c]));
