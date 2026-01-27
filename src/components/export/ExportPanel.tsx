'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ExportPanelProps {
  onExportPng: () => void;
  onExportSvg: () => void;
  onCopyUrl: () => Promise<boolean>;
}

export function ExportPanel({ onExportPng, onExportSvg, onCopyUrl }: ExportPanelProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await onCopyUrl();
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div>
      <h3 className="text-[11px] font-semibold uppercase tracking-wider text-muted mb-2">
        Export
      </h3>
      <div className="flex gap-2">
        <ExportButton onClick={onExportPng} label="PNG" />
        <ExportButton onClick={onExportSvg} label="SVG" />
        <motion.button
          onClick={handleCopy}
          className="flex-1 px-3 py-2 text-xs font-medium rounded-lg border border-border
            bg-transparent text-foreground/70 hover:bg-foreground/5 hover:text-foreground
            transition-colors duration-200 cursor-pointer"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.span
                key="copied"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="text-emerald-500"
              >
                Copied!
              </motion.span>
            ) : (
              <motion.span
                key="copy"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
              >
                Copy Link
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
}

function ExportButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <motion.button
      onClick={onClick}
      className="flex-1 px-3 py-2 text-xs font-medium rounded-lg border border-border
        bg-transparent text-foreground/70 hover:bg-foreground/5 hover:text-foreground
        transition-colors duration-200 cursor-pointer"
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
    >
      {label}
    </motion.button>
  );
}
