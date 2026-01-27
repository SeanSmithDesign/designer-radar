'use client';

import { motion } from 'framer-motion';
import { SkillSlider } from './SkillSlider';
import { skills } from '@/data/skills';
import { categories } from '@/data/categories';
import { SkillScores } from '@/types/chart';

interface SliderPanelProps {
  scores: SkillScores;
  onScoreChange: (skillId: string, value: number) => void;
}

export function SliderPanel({ scores, onScoreChange }: SliderPanelProps) {
  return (
    <div className="space-y-5">
      {categories.map((category, catIndex) => {
        const categorySkills = skills.filter((s) => s.category === category.id);
        const cssVar = category.id === 'design-craft' ? 'var(--indigo)' : category.id === 'tech-ai' ? 'var(--cyan)' : 'var(--amber)';

        return (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: catIndex * 0.1, duration: 0.3 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: cssVar }}
              />
              <h3
                className="text-[11px] font-semibold uppercase tracking-wider"
                style={{ color: cssVar }}
              >
                {category.name}
              </h3>
            </div>
            <div className="space-y-0.5">
              {categorySkills.map((skill) => (
                <SkillSlider
                  key={skill.id}
                  skill={skill}
                  value={scores[skill.id] ?? 50}
                  onChange={onScoreChange}
                  categoryColor={cssVar}
                />
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
