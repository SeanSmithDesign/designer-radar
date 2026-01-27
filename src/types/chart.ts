export type CategoryId = 'design-craft' | 'tech-ai' | 'startup-dynamics';

export interface Skill {
  id: string;
  name: string;
  shortName: string;
  category: CategoryId;
  description: string;
}

export interface Category {
  id: CategoryId;
  name: string;
  color: string;
  colorDark: string;
  skills: string[];
}

export type SkillScores = Record<string, number>;

export interface Profile {
  id: string;
  name: string;
  scores: SkillScores;
  color: string;
  createdAt: number;
}

export interface PresetProfile {
  id: string;
  name: string;
  description: string;
  scores: SkillScores;
}

export interface RadarChartProps {
  profiles: Profile[];
  activeProfileId: string;
  width: number;
  height: number;
  onScoreChange?: (skillId: string, value: number) => void;
}

export interface PolarPoint {
  x: number;
  y: number;
  angle: number;
  radius: number;
}

export interface TooltipData {
  skill: Skill;
  score: number;
  position: { x: number; y: number };
}
