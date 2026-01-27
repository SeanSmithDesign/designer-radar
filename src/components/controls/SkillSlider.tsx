'use client';

import { useCallback } from 'react';
import { Skill } from '@/types/chart';

interface SkillSliderProps {
  skill: Skill;
  value: number;
  onChange: (skillId: string, value: number) => void;
  categoryColor: string;
}

export function SkillSlider({ skill, value, onChange, categoryColor }: SkillSliderProps) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(skill.id, parseInt(e.target.value, 10));
    },
    [skill.id, onChange]
  );

  const percentage = value / 100;

  return (
    <div className="group flex items-center gap-3 py-1.5">
      <label
        htmlFor={`slider-${skill.id}`}
        className="text-xs font-medium text-foreground/70 w-20 shrink-0 truncate cursor-pointer"
        title={skill.name}
      >
        {skill.shortName}
      </label>
      <div className="relative flex-1">
        <input
          id={`slider-${skill.id}`}
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={handleChange}
          className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, ${categoryColor} 0%, ${categoryColor} ${percentage * 100}%, var(--border) ${percentage * 100}%, var(--border) 100%)`,
          }}
          aria-label={`${skill.name}: ${value}`}
        />
      </div>
      <span
        className="text-xs font-mono font-bold w-8 text-right tabular-nums"
        style={{ color: categoryColor }}
      >
        {value}
      </span>
    </div>
  );
}
