'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { presets } from '@/data/presets';
import { Profile } from '@/types/chart';

interface CompareModeProps {
  enabled: boolean;
  onToggle: () => void;
  compareProfiles: Profile[];
  onAddPresetComparison: (presetId: string) => void;
  onRemoveComparison: (id: string) => void;
}

export function CompareMode({
  enabled,
  onToggle,
  compareProfiles,
  onAddPresetComparison,
  onRemoveComparison,
}: CompareModeProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-[11px] font-semibold uppercase tracking-wider text-muted">
          Compare
        </h3>
        <button
          onClick={onToggle}
          className={`
            relative w-9 h-5 rounded-full transition-colors duration-200 cursor-pointer
            ${enabled ? 'bg-foreground' : 'bg-border'}
          `}
          aria-label="Toggle compare mode"
        >
          <motion.div
            className="absolute top-0.5 w-4 h-4 rounded-full bg-background"
            animate={{ left: enabled ? 18 : 2 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />
        </button>
      </div>

      <AnimatePresence>
        {enabled && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="flex flex-wrap gap-1.5 mb-2">
              {presets.map((preset) => {
                const isComparing = compareProfiles.some(
                  (p) => p.id === `compare-${preset.id}`
                );
                return (
                  <button
                    key={preset.id}
                    onClick={() => {
                      if (isComparing) {
                        onRemoveComparison(`compare-${preset.id}`);
                      } else {
                        onAddPresetComparison(preset.id);
                      }
                    }}
                    className={`
                      px-2.5 py-1 text-[10px] font-medium rounded-full
                      transition-colors duration-200 border cursor-pointer
                      ${
                        isComparing
                          ? 'bg-foreground/10 text-foreground border-foreground/30'
                          : 'bg-transparent text-muted border-border hover:border-foreground/20'
                      }
                    `}
                  >
                    {isComparing ? '- ' : '+ '}
                    {preset.name}
                  </button>
                );
              })}
            </div>

            {compareProfiles.length > 0 && (
              <div className="space-y-1">
                {compareProfiles.map((profile) => (
                  <div
                    key={profile.id}
                    className="flex items-center gap-2 text-xs text-muted"
                  >
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: profile.color }}
                    />
                    <span>{profile.name}</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
