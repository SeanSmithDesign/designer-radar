'use client';

import { useMemo } from 'react';
import { scaleLinear } from '@visx/scale';
import { RadarGrid } from './RadarGrid';
import { RadarAxes } from './RadarAxes';
import { RadarPolygon } from './RadarPolygon';
import { RadarPoints } from './RadarPoints';
import { skills } from '@/data/skills';
import { Profile } from '@/types/chart';
import { CHART_MARGIN, MAX_SCORE } from '@/lib/constants';

interface RadarChartProps {
  profiles: Profile[];
  activeProfileId: string;
  width: number;
  height: number;
}

export function RadarChart({
  profiles,
  activeProfileId,
  width,
  height,
}: RadarChartProps) {
  const numPoints = skills.length;
  const size = Math.min(width, height);
  const radius = (size - CHART_MARGIN * 2) / 2;
  const center = { x: width / 2, y: height / 2 };

  const scale = useMemo(
    () =>
      scaleLinear<number>({
        domain: [0, MAX_SCORE],
        range: [0, radius],
      }),
    [radius]
  );

  const activeProfile = profiles.find((p) => p.id === activeProfileId);
  const comparisonProfiles = profiles.filter((p) => p.id !== activeProfileId);

  const getScoresArray = (profile: Profile) =>
    skills.map((s) => profile.scores[s.id] ?? 50);

  if (radius <= 0) return null;

  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${width} ${height}`}
      className="select-none"
      role="img"
      aria-label="Radar chart showing designer skill scores"
      style={{ maxWidth: width, aspectRatio: `${width} / ${height}` }}
    >
      <RadarGrid
        numPoints={numPoints}
        radius={radius}
        center={center}
      />
      <RadarAxes
        skills={skills}
        radius={radius}
        center={center}
        scores={activeProfile ? getScoresArray(activeProfile) : undefined}
      />

      {/* Comparison profiles (rendered behind) */}
      {comparisonProfiles.map((profile) => (
        <RadarPolygon
          key={profile.id}
          scores={getScoresArray(profile)}
          numPoints={numPoints}
          center={center}
          scale={scale}
          color={profile.color}
          isComparison
        />
      ))}

      {/* Active profile */}
      {activeProfile && (
        <>
          <RadarPolygon
            scores={getScoresArray(activeProfile)}
            numPoints={numPoints}
            center={center}
            scale={scale}
            color={activeProfile.color}
          />
          <RadarPoints
            skills={skills}
            scores={getScoresArray(activeProfile)}
            center={center}
            scale={scale}
            color={activeProfile.color}
          />
        </>
      )}
    </svg>
  );
}
