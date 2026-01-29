'use client';

import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  generateAngles,
  polarToCartesian,
  projectPointToAxis,
} from '@/lib/chart-math';
import { POINT_RADIUS } from '@/lib/constants';
import { Skill } from '@/types/chart';

interface RadarPointsProps {
  skills: Skill[];
  scores: number[];
  center: { x: number; y: number };
  scale: (value: number) => number;
  color: string;
  isEditMode?: boolean;
  maxRadius?: number;
  onScoreChange?: (skillId: string, value: number) => void;
}

export function RadarPoints({
  skills,
  scores,
  center,
  scale,
  color,
  isEditMode = false,
  maxRadius = 200,
  onScoreChange,
}: RadarPointsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const groupRef = useRef<SVGGElement>(null);
  const angles = generateAngles(skills.length);

  const getSvgPoint = useCallback(
    (e: React.PointerEvent): { x: number; y: number } | null => {
      if (!groupRef.current) return null;
      const svg = groupRef.current.ownerSVGElement;
      if (!svg) return null;

      const pt = svg.createSVGPoint();
      pt.x = e.clientX;
      pt.y = e.clientY;
      const ctm = svg.getScreenCTM();
      if (!ctm) return null;

      const svgPoint = pt.matrixTransform(ctm.inverse());
      return { x: svgPoint.x, y: svgPoint.y };
    },
    []
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent, index: number) => {
      if (!isEditMode || !onScoreChange) return;
      e.preventDefault();
      (e.target as Element).setPointerCapture(e.pointerId);
      setDraggingIndex(index);
    },
    [isEditMode, onScoreChange]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent, index: number) => {
      if (draggingIndex !== index || !isEditMode || !onScoreChange) return;

      const svgPoint = getSvgPoint(e);
      if (!svgPoint) return;

      const radius = projectPointToAxis(svgPoint, center, maxRadius);
      const newScore = Math.round((radius / maxRadius) * 100);
      const clampedScore = Math.max(0, Math.min(100, newScore));

      onScoreChange(skills[index].id, clampedScore);
    },
    [draggingIndex, isEditMode, onScoreChange, getSvgPoint, center, maxRadius, skills]
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      (e.target as Element).releasePointerCapture(e.pointerId);
      setDraggingIndex(null);
    },
    []
  );

  const isInteractive = isEditMode && onScoreChange;

  return (
    <g ref={groupRef} className="radar-points">
      {skills.map((skill, i) => {
        const angle = angles[i];
        const r = scale(scores[i]);
        const point = polarToCartesian(angle, r, center);
        const isHovered = hoveredIndex === i;
        const isDragging = draggingIndex === i;

        return (
          <g
            key={skill.id}
            onMouseEnter={() => !isDragging && setHoveredIndex(i)}
            onMouseLeave={() => !isDragging && setHoveredIndex(null)}
            style={{ cursor: isInteractive ? (isDragging ? 'grabbing' : 'grab') : 'pointer' }}
          >
            {/* Invisible larger hit area */}
            <circle
              cx={point.x}
              cy={point.y}
              r={isInteractive ? 24 : 16}
              fill="transparent"
              onPointerDown={(e) => handlePointerDown(e, i)}
              onPointerMove={(e) => handlePointerMove(e, i)}
              onPointerUp={handlePointerUp}
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
                r: isDragging ? 10 : isHovered ? 8 : POINT_RADIUS,
                cx: point.x,
                cy: point.y,
                scale: isDragging ? 1.1 : 1,
              }}
              transition={{
                r: { type: 'spring', stiffness: 400, damping: 20 },
                cx: { type: 'spring', stiffness: 200, damping: 25 },
                cy: { type: 'spring', stiffness: 200, damping: 25 },
              }}
              style={{
                pointerEvents: 'none',
                filter: isDragging
                  ? `drop-shadow(0 0 12px ${color}99)`
                  : isHovered
                    ? `drop-shadow(0 0 6px ${color}66)`
                    : 'none',
              }}
            />

            {/* Tooltip */}
            <AnimatePresence>
              {isHovered && !isDragging && (
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
                      <div
                        style={{
                          fontWeight: 600,
                          color: 'var(--foreground)',
                          marginBottom: '2px',
                        }}
                      >
                        {skill.name}
                      </div>
                      <div style={{ color: 'var(--muted)', fontSize: '11px' }}>
                        <span
                          style={{
                            fontWeight: 700,
                            color: color,
                            fontFamily: 'var(--font-geist-mono)',
                          }}
                        >
                          {scores[i]}
                        </span>
                        {' / 100'}
                        {isInteractive && (
                          <span style={{ marginLeft: '4px', opacity: 0.6 }}>
                            (drag to adjust)
                          </span>
                        )}
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
