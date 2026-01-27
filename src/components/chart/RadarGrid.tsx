'use client';

import { generateGridPath } from '@/lib/chart-math';
import { GRID_LEVELS, MAX_SCORE } from '@/lib/constants';

interface RadarGridProps {
  numPoints: number;
  radius: number;
  center: { x: number; y: number };
}

export function RadarGrid({ numPoints, radius, center }: RadarGridProps) {
  const levels = Array.from({ length: GRID_LEVELS }, (_, i) => i + 1);

  return (
    <g className="radar-grid">
      {levels.map((level) => {
        const levelRadius = (radius / GRID_LEVELS) * level;
        const path = generateGridPath(numPoints, levelRadius, center);
        const isOuter = level === GRID_LEVELS;

        return (
          <path
            key={level}
            d={path}
            fill="none"
            stroke="var(--chart-grid)"
            strokeWidth={isOuter ? 1.5 : 0.5}
            strokeOpacity={isOuter ? 0.6 : 0.3}
          />
        );
      })}
      {/* Grid level labels along the first axis (straight up) */}
      {levels.map((level) => {
        const value = (MAX_SCORE / GRID_LEVELS) * level;
        const y = center.y - (radius / GRID_LEVELS) * level;
        return (
          <text
            key={`label-${level}`}
            x={center.x + 4}
            y={y + 2}
            fontSize={9}
            fill="var(--chart-axis)"
            fontFamily="var(--font-geist-mono)"
            opacity={0.5}
          >
            {value}
          </text>
        );
      })}
    </g>
  );
}
