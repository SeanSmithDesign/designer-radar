'use client';

import { motion } from 'framer-motion';
import { generateAngles, generatePolygonPath } from '@/lib/chart-math';

interface RadarPolygonProps {
  scores: number[];
  numPoints: number;
  center: { x: number; y: number };
  scale: (value: number) => number;
  color: string;
  fillOpacity?: number;
  strokeWidth?: number;
  isComparison?: boolean;
}

export function RadarPolygon({
  scores,
  numPoints,
  center,
  scale,
  color,
  fillOpacity = 0.15,
  strokeWidth = 2,
  isComparison = false,
}: RadarPolygonProps) {
  const angles = generateAngles(numPoints);
  const path = generatePolygonPath(scores, angles, scale, center);

  return (
    <motion.path
      d={path}
      fill={color}
      fillOpacity={isComparison ? 0.08 : fillOpacity}
      stroke={color}
      strokeWidth={isComparison ? 1.5 : strokeWidth}
      strokeOpacity={isComparison ? 0.4 : 0.8}
      strokeLinejoin="round"
      initial={{ d: path, opacity: 0 }}
      animate={{ d: path, opacity: 1 }}
      transition={{
        d: {
          type: 'spring',
          stiffness: 200,
          damping: 25,
          mass: 0.8,
        },
        opacity: { duration: 0.4 },
      }}
      style={{
        filter: isComparison
          ? 'none'
          : `drop-shadow(0 0 8px ${color}33)`,
      }}
    />
  );
}
