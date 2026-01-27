'use client';

import { categories } from '@/data/categories';

export function RadarLegend() {
  return (
    <div className="flex items-center justify-center gap-6 mt-4">
      {categories.map((cat) => (
        <div key={cat.id} className="flex items-center gap-2">
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{
              backgroundColor: `var(--${cat.id === 'design-craft' ? 'indigo' : cat.id === 'tech-ai' ? 'cyan' : 'amber'})`,
            }}
          />
          <span className="text-xs font-medium text-muted">
            {cat.name}
          </span>
        </div>
      ))}
    </div>
  );
}
