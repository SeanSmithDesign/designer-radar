'use client';

import { useTilt } from '@/hooks/useTilt';

interface ChartContainerProps {
  children: React.ReactNode;
}

export function ChartContainer({ children }: ChartContainerProps) {
  const { ref, style, handleMouseMove, handleMouseLeave } = useTilt(5);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full"
      style={{
        ...style,
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
}
