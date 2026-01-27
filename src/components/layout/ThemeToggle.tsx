'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) {
    return <div className="w-8 h-8" />;
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <motion.button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="relative w-8 h-8 rounded-full flex items-center justify-center
        text-foreground/60 hover:text-foreground transition-colors cursor-pointer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <motion.svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{ rotate: isDark ? 0 : 180 }}
        transition={{ duration: 0.3 }}
      >
        {isDark ? (
          <>
            <circle cx="8" cy="8" r="3.5" />
            <line x1="8" y1="1" x2="8" y2="2.5" />
            <line x1="8" y1="13.5" x2="8" y2="15" />
            <line x1="1" y1="8" x2="2.5" y2="8" />
            <line x1="13.5" y1="8" x2="15" y2="8" />
            <line x1="3.05" y1="3.05" x2="4.1" y2="4.1" />
            <line x1="11.9" y1="11.9" x2="12.95" y2="12.95" />
            <line x1="3.05" y1="12.95" x2="4.1" y2="11.9" />
            <line x1="11.9" y1="4.1" x2="12.95" y2="3.05" />
          </>
        ) : (
          <path d="M13.5 8.5a5.5 5.5 0 1 1-6-6 4.5 4.5 0 0 0 6 6Z" />
        )}
      </motion.svg>
    </motion.button>
  );
}
