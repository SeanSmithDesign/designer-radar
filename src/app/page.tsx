'use client';

import { useRef, useState, useCallback, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { ChartContainer } from '@/components/chart/ChartContainer';
import { RadarChart } from '@/components/chart/RadarChart';
import { RadarLegend } from '@/components/chart/RadarLegend';
import { SliderPanel } from '@/components/controls/SliderPanel';
import { PresetSelector } from '@/components/controls/PresetSelector';
import { CompareMode } from '@/components/controls/CompareMode';
import { ExportPanel } from '@/components/export/ExportPanel';
import { useRadarData } from '@/hooks/useRadarData';
import { useChartExport } from '@/hooks/useChartExport';
import { Profile } from '@/types/chart';
import { presets } from '@/data/presets';
import { profileColors } from '@/data/defaults';

function RadarApp() {
  const { scores, setScore, setAllScores, resetToDefaults } = useRadarData();

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
      <Header />
      <main className="flex flex-col lg:flex-row">
        {/* Chart Section */}
        <motion.section
          className="flex-1 flex flex-col items-center justify-center p-6 lg:p-10"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div ref={chartRef} className="w-full max-w-[560px]">
            <ChartContainer>
              <RadarChart
                profiles={allProfiles}
                activeProfileId="active"
                width={560}
                height={560}
              />
            </ChartContainer>
            <RadarLegend />
          </div>
        </motion.section>

        {/* Controls Section */}
        <motion.aside
          className="w-full lg:w-[340px] border-t lg:border-t-0 lg:border-l border-border
            p-6 space-y-6 overflow-y-auto max-h-screen"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
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

          <div className="pb-6">
            <button
              onClick={resetToDefaults}
              className="text-[11px] text-muted hover:text-foreground transition-colors cursor-pointer"
            >
              Reset to defaults
            </button>
          </div>
        </motion.aside>
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
