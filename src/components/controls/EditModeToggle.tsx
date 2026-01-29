'use client';

import { motion } from 'framer-motion';

interface EditModeToggleProps {
  isEditMode: boolean;
  onToggle: () => void;
}

export function EditModeToggle({ isEditMode, onToggle }: EditModeToggleProps) {
  return (
    <motion.button
      onClick={onToggle}
      className={`
        relative flex items-center gap-1.5 px-3 py-1.5 rounded-full
        text-xs font-medium transition-colors cursor-pointer
        ${
          isEditMode
            ? 'bg-foreground text-background'
            : 'bg-card border border-border text-foreground/60 hover:text-foreground hover:border-foreground/30'
        }
      `}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      aria-label={isEditMode ? 'Exit edit mode' : 'Enter edit mode'}
      aria-pressed={isEditMode}
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M11.5 2.5a2.121 2.121 0 0 1 3 3L5 15l-4 1 1-4 9.5-9.5z" />
      </svg>
      <span>{isEditMode ? 'Editing' : 'Edit'}</span>
    </motion.button>
  );
}
