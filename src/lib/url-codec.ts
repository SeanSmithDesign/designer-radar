import { createParser } from 'nuqs';
import { skills } from '@/data/skills';
import { SkillScores } from '@/types/chart';

export const profileParser = createParser<SkillScores>({
  parse: (raw: string): SkillScores | null => {
    if (!raw || raw.length !== skills.length * 2) return null;
    const scores: SkillScores = {};
    skills.forEach((skill, i) => {
      const val = parseInt(raw.substring(i * 2, i * 2 + 2), 10);
      scores[skill.id] = Math.min(100, Math.max(0, isNaN(val) ? 50 : val));
    });
    return scores;
  },
  serialize: (scores: SkillScores): string => {
    return skills
      .map((skill) => String(scores[skill.id] ?? 50).padStart(2, '0'))
      .join('');
  },
});
