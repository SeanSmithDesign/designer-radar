'use client';

import { motion } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
  return (
    <motion.header
      className="flex items-center justify-between px-6 py-4 border-b border-border"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center gap-3">
        <div className="w-7 h-7 rounded-lg bg-foreground flex items-center justify-center">
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            className="text-background"
          >
            <polygon
              points="7,0.5 13,3.75 13,10.25 7,13.5 1,10.25 1,3.75"
              stroke="currentColor"
              strokeWidth="1.2"
              fill="none"
            />
            <polygon
              points="7,3 10,4.75 10,9.25 7,11 4,9.25 4,4.75"
              stroke="currentColor"
              strokeWidth="0.8"
              fill="currentColor"
              fillOpacity="0.3"
            />
          </svg>
        </div>
        <div>
          <h1 className="text-sm font-semibold tracking-tight">
            Product Designer Strength Radar
          </h1>
          <p className="text-[10px] text-muted font-medium">
            Map your design skills
          </p>
        </div>
      </div>
      <ThemeToggle />
    </motion.header>
  );
}
