'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { presets } from '@/data/presets';
import { SkillScores } from '@/types/chart';

interface PresetSelectorProps {
  onSelect: (scores: SkillScores) => void;
}

export function PresetSelector({ onSelect }: PresetSelectorProps) {
  const [activePreset, setActivePreset] = useState<string | null>(null);

  return (
    <div>
      <h3 className="text-[11px] font-semibold uppercase tracking-wider text-muted mb-2">
        Presets
      </h3>
      <div className="flex flex-wrap gap-1.5">
        {presets.map((preset) => {
          const isActive = activePreset === preset.id;
          return (
            <motion.button
              key={preset.id}
              onClick={() => {
                setActivePreset(preset.id);
                onSelect(preset.scores);
              }}
              className={`
                px-3 py-1.5 text-xs font-medium rounded-full
                transition-colors duration-200
                border cursor-pointer
                ${
                  isActive
                    ? 'bg-foreground text-background border-foreground'
                    : 'bg-transparent text-foreground/70 border-border hover:border-foreground/30 hover:text-foreground'
                }
              `}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              title={preset.description}
            >
              {preset.name}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
