'use client';

import { generateAngles, polarToCartesian, getLabelAnchor } from '@/lib/chart-math';
import { LABEL_OFFSET } from '@/lib/constants';
import { Skill } from '@/types/chart';
interface RadarAxesProps {
  skills: Skill[];
  radius: number;
  center: { x: number; y: number };
  scores?: number[];
}

export function RadarAxes({ skills, radius, center, scores }: RadarAxesProps) {
  const angles = generateAngles(skills.length);

  return (
    <g className="radar-axes">
      {skills.map((skill, i) => {
        const angle = angles[i];
        const outerPoint = polarToCartesian(angle, radius, center);
        const labelPoint = polarToCartesian(angle, radius + LABEL_OFFSET, center);
        const { textAnchor, dy } = getLabelAnchor(angle);

        return (
          <g key={skill.id}>
            {/* Spoke line */}
            <line
              x1={center.x}
              y1={center.y}
              x2={outerPoint.x}
              y2={outerPoint.y}
              stroke="var(--chart-grid)"
              strokeWidth={0.5}
              strokeOpacity={0.3}
            />
            {/* Skill label */}
            <text
              x={labelPoint.x}
              y={labelPoint.y}
              textAnchor={textAnchor}
              dy={dy}
              fontSize={11}
              fontWeight={500}
              fill="var(--chart-label)"
              fontFamily="var(--font-geist-sans)"
            >
              {skill.shortName}
            </text>
            {/* Score value */}
            {scores && (
              <text
                x={labelPoint.x}
                y={labelPoint.y}
                textAnchor={textAnchor}
                dy={dy === '-0.7em' ? '-1.8em' : dy === '1.2em' ? '2.3em' : '1.5em'}
                fontSize={10}
                fontWeight={700}
                fill={`var(--${skill.category === 'design-craft' ? 'indigo' : skill.category === 'tech-ai' ? 'cyan' : 'amber'})`}
                fontFamily="var(--font-geist-mono)"
                opacity={0.8}
              >
                {scores[i]}
              </text>
            )}
            {/* Category dot */}
            <circle
              cx={labelPoint.x + (textAnchor === 'start' ? -8 : textAnchor === 'end' ? 8 : 0)}
              cy={labelPoint.y + (dy === '-0.7em' ? 3 : dy === '1.2em' ? -3 : 0)}
              r={2.5}
              fill={`var(--${skill.category === 'design-craft' ? 'indigo' : skill.category === 'tech-ai' ? 'cyan' : 'amber'})`}
              opacity={0.6}
            />
          </g>
        );
      })}
    </g>
  );
}
