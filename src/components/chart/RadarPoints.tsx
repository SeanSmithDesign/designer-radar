'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateAngles, polarToCartesian } from '@/lib/chart-math';
import { POINT_RADIUS } from '@/lib/constants';
import { Skill } from '@/types/chart';

interface RadarPointsProps {
  skills: Skill[];
  scores: number[];
  center: { x: number; y: number };
  scale: (value: number) => number;
  color: string;
}

export function RadarPoints({
  skills,
  scores,
  center,
  scale,
  color,
}: RadarPointsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const angles = generateAngles(skills.length);

  return (
    <g className="radar-points">
      {skills.map((skill, i) => {
        const angle = angles[i];
        const r = scale(scores[i]);
        const point = polarToCartesian(angle, r, center);
        const isHovered = hoveredIndex === i;

        return (
          <g
            key={skill.id}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{ cursor: 'pointer' }}
          >
            {/* Invisible larger hit area */}
            <circle
              cx={point.x}
              cy={point.y}
              r={16}
              fill="transparent"
            />
            {/* Visible point */}
            <motion.circle
              cx={point.x}
              cy={point.y}
              r={POINT_RADIUS}
              fill={color}
              stroke="var(--background)"
              strokeWidth={2}
              animate={{
                r: isHovered ? 8 : POINT_RADIUS,
                cx: point.x,
                cy: point.y,
              }}
              transition={{
                r: { type: 'spring', stiffness: 400, damping: 20 },
                cx: { type: 'spring', stiffness: 200, damping: 25 },
                cy: { type: 'spring', stiffness: 200, damping: 25 },
              }}
              style={{
                filter: isHovered
                  ? `drop-shadow(0 0 6px ${color}66)`
                  : 'none',
              }}
            />

            {/* Tooltip */}
            <AnimatePresence>
              {isHovered && (
                <motion.g
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{ duration: 0.15 }}
                >
                  <foreignObject
                    x={point.x - 90}
                    y={point.y - 70}
                    width={180}
                    height={60}
                    style={{ pointerEvents: 'none' }}
                  >
                    <div
                      style={{
                        background: 'var(--card)',
                        border: '1px solid var(--border)',
                        borderRadius: '8px',
                        padding: '8px 12px',
                        fontSize: '12px',
                        fontFamily: 'var(--font-geist-sans)',
                        backdropFilter: 'blur(12px)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        textAlign: 'center',
                      }}
                    >
                      <div style={{ fontWeight: 600, color: 'var(--foreground)', marginBottom: '2px' }}>
                        {skill.name}
                      </div>
                      <div style={{ color: 'var(--muted)', fontSize: '11px' }}>
                        <span style={{ fontWeight: 700, color: color, fontFamily: 'var(--font-geist-mono)' }}>
                          {scores[i]}
                        </span>
                        {' / 100'}
                      </div>
                    </div>
                  </foreignObject>
                </motion.g>
              )}
            </AnimatePresence>
          </g>
        );
      })}
    </g>
  );
}
