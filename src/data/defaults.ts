import { SkillScores } from '@/types/chart';
import { skills } from './skills';

export const defaultScores: SkillScores = Object.fromEntries(
  skills.map((s) => [s.id, 50])
);

export const profileColors = [
  '#6366f1', // indigo
  '#ef4444', // red
  '#10b981', // emerald
  '#f59e0b', // amber
];
