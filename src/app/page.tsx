'use client';

import { useRef, useState, useCallback, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { ChartContainer } from '@/components/chart/ChartContainer';
import { RadarChart } from '@/components/chart/RadarChart';
import { RadarLegend } from '@/components/chart/RadarLegend';
import { SliderPanel } from '@/components/controls/SliderPanel';
import { PresetSelector } from '@/components/controls/PresetSelector';
import { CompareMode } from '@/components/controls/CompareMode';
import { EditModeToggle } from '@/components/controls/EditModeToggle';
import { ExportPanel } from '@/components/export/ExportPanel';
import { useRadarData } from '@/hooks/useRadarData';
import { useChartExport } from '@/hooks/useChartExport';
import { useEditMode } from '@/hooks/useEditMode';
import { Profile } from '@/types/chart';
import { presets } from '@/data/presets';
import { profileColors } from '@/data/defaults';

const GITHUB_URL = 'https://github.com/seansmith/designer-radar'; // TODO: Update with actual URL
const IS_PORTFOLIO_MODE = process.env.NEXT_PUBLIC_PORTFOLIO_MODE === 'true';

function RadarApp() {
  const { scores, setScore, setAllScores, resetToDefaults } = useRadarData();
  const { isEditMode, toggleEditMode } = useEditMode();

  const chartRef = useRef<HTMLDivElement>(null);
  const { exportAsPng, exportAsSvg, copyShareUrl } = useChartExport(chartRef);

  const [compareEnabled, setCompareEnabled] = useState(false);
  const [presetCompareProfiles, setPresetCompareProfiles] = useState<Profile[]>([]);

  const activeProfile: Profile = {
    id: 'active',
    name: 'My Profile',
    scores,
    color: '#6366f1',
    createdAt: 0,
  };

  const allProfiles = [activeProfile, ...presetCompareProfiles];

  const handleAddPresetComparison = useCallback(
    (presetId: string) => {
      const preset = presets.find((p) => p.id === presetId);
      if (!preset) return;

      setPresetCompareProfiles((prev) => {
        const exists = prev.some((p) => p.id === `compare-${presetId}`);
        if (exists) return prev;
        if (prev.length >= 2) return prev;
        return [
          ...prev,
          {
            id: `compare-${presetId}`,
            name: preset.name,
            scores: preset.scores,
            color: profileColors[(prev.length + 1) % profileColors.length],
            createdAt: Date.now(),
          },
        ];
      });
    },
    []
  );

  const handleRemoveComparison = useCallback((id: string) => {
    setPresetCompareProfiles((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {!IS_PORTFOLIO_MODE && <Header />}
      <main className="flex flex-col lg:flex-row">
        {/* Chart Section */}
        <motion.section
          className="flex-1 flex flex-col items-center justify-center p-6 lg:p-10"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* Controls above chart */}
          <div className="w-full max-w-[560px] mb-4 flex items-center justify-between">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-muted hover:text-foreground transition-colors"
              aria-label="View source on GitHub"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <span>GitHub</span>
            </a>
            <EditModeToggle isEditMode={isEditMode} onToggle={toggleEditMode} />
          </div>

          <div ref={chartRef} className="w-full max-w-[560px]">
            <ChartContainer>
              <RadarChart
                profiles={allProfiles}
                activeProfileId="active"
                width={560}
                height={560}
                isEditMode={isEditMode}
                onScoreChange={setScore}
              />
            </ChartContainer>
            <RadarLegend />
          </div>
        </motion.section>

        {/* Controls Section - only visible in edit mode */}
        <AnimatePresence>
          {isEditMode && (
            <motion.aside
              className="w-full lg:w-[340px] border-t lg:border-t-0 lg:border-l border-border
                p-6 space-y-6 overflow-y-auto max-h-screen"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <PresetSelector onSelect={setAllScores} />

              <div className="h-px bg-border" />

              <SliderPanel scores={scores} onScoreChange={setScore} />

              <div className="h-px bg-border" />

              <CompareMode
                enabled={compareEnabled}
                onToggle={() => {
                  setCompareEnabled((prev) => !prev);
                  if (compareEnabled) {
                    setPresetCompareProfiles([]);
                  }
                }}
                compareProfiles={presetCompareProfiles}
                onAddPresetComparison={handleAddPresetComparison}
                onRemoveComparison={handleRemoveComparison}
              />

              <div className="h-px bg-border" />

              <ExportPanel
                onExportPng={exportAsPng}
                onExportSvg={exportAsSvg}
                onCopyUrl={copyShareUrl}
              />

              <div className="flex items-center justify-between pb-6">
                <button
                  onClick={resetToDefaults}
                  className="text-[11px] text-muted hover:text-foreground transition-colors cursor-pointer"
                >
                  Reset to defaults
                </button>
                <button
                  onClick={toggleEditMode}
                  className="px-4 py-2 bg-foreground text-background text-xs font-medium rounded-full
                    hover:opacity-90 transition-opacity cursor-pointer"
                >
                  Done
                </button>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="w-6 h-6 rounded-full border-2 border-foreground/20 border-t-foreground animate-spin" />
        </div>
      }
    >
      <RadarApp />
    </Suspense>
  );
}
