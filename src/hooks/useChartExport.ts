'use client';

import { useCallback, RefObject } from 'react';
import { toPng, toSvg } from 'html-to-image';

export function useChartExport(chartRef: RefObject<HTMLDivElement | null>) {
  const exportAsPng = useCallback(async () => {
    if (!chartRef.current) return;
    try {
      const dataUrl = await toPng(chartRef.current, {
        pixelRatio: 2,
        backgroundColor: 'var(--background)',
      });
      const link = document.createElement('a');
      link.download = 'designer-radar.png';
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Export failed:', err);
    }
  }, [chartRef]);

  const exportAsSvg = useCallback(async () => {
    if (!chartRef.current) return;
    try {
      const dataUrl = await toSvg(chartRef.current);
      const link = document.createElement('a');
      link.download = 'designer-radar.svg';
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Export failed:', err);
    }
  }, [chartRef]);

  const copyShareUrl = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      return true;
    } catch {
      return false;
    }
  }, []);

  return { exportAsPng, exportAsSvg, copyShareUrl };
}
