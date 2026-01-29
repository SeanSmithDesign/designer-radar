const FULL_CIRCLE = 2 * Math.PI;

export function generateAngles(numPoints: number): number[] {
  const step = FULL_CIRCLE / numPoints;
  return Array.from({ length: numPoints }, (_, i) => i * step - Math.PI / 2);
}

export function polarToCartesian(
  angle: number,
  radius: number,
  center: { x: number; y: number }
): { x: number; y: number } {
  return {
    x: center.x + radius * Math.cos(angle),
    y: center.y + radius * Math.sin(angle),
  };
}

export function generatePolygonPoints(
  numPoints: number,
  radius: number,
  center: { x: number; y: number }
): { x: number; y: number }[] {
  const angles = generateAngles(numPoints);
  return angles.map((angle) => polarToCartesian(angle, radius, center));
}

export function generatePolygonPath(
  scores: number[],
  angles: number[],
  scale: (value: number) => number,
  center: { x: number; y: number }
): string {
  const points = scores.map((score, i) => {
    const radius = scale(score);
    return polarToCartesian(angles[i], radius, center);
  });

  return (
    points
      .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(2)},${p.y.toFixed(2)}`)
      .join(' ') + ' Z'
  );
}

export function generateGridPath(
  numPoints: number,
  radius: number,
  center: { x: number; y: number }
): string {
  const points = generatePolygonPoints(numPoints, radius, center);
  return (
    points
      .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(2)},${p.y.toFixed(2)}`)
      .join(' ') + ' Z'
  );
}

/**
 * Convert Cartesian coordinates to polar (relative to center)
 */
export function cartesianToPolar(
  point: { x: number; y: number },
  center: { x: number; y: number }
): { angle: number; radius: number } {
  const dx = point.x - center.x;
  const dy = point.y - center.y;
  return {
    angle: Math.atan2(dy, dx),
    radius: Math.sqrt(dx * dx + dy * dy),
  };
}

/**
 * Project a point onto an axis and return the clamped radius.
 * Used for drag-to-axis snapping.
 */
export function projectPointToAxis(
  point: { x: number; y: number },
  center: { x: number; y: number },
  maxRadius: number
): number {
  const polar = cartesianToPolar(point, center);
  return Math.max(0, Math.min(polar.radius, maxRadius));
}

export function getLabelAnchor(
  angle: number
): { textAnchor: 'start' | 'middle' | 'end'; dy: string } {
  const normalized = ((angle + Math.PI * 2.5) % (Math.PI * 2));

  let textAnchor: 'start' | 'middle' | 'end';
  if (normalized < 0.3 || normalized > Math.PI * 2 - 0.3) {
    textAnchor = 'middle';
  } else if (normalized < Math.PI) {
    textAnchor = 'start';
  } else {
    textAnchor = 'end';
  }

  let dy: string;
  if (normalized < 0.3 || normalized > Math.PI * 2 - 0.3) {
    dy = '-0.7em';
  } else if (Math.abs(normalized - Math.PI) < 0.3) {
    dy = '1.2em';
  } else {
    dy = '0.35em';
  }

  return { textAnchor, dy };
}
