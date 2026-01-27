'use client';

import { useQueryState } from 'nuqs';
import { useCallback } from 'react';
import { profileParser } from '@/lib/url-codec';
import { defaultScores } from '@/data/defaults';
import { SkillScores } from '@/types/chart';

export function useRadarData() {
  const [scores, setScores] = useQueryState(
    'p',
    profileParser.withDefault(defaultScores)
  );

  const setScore = useCallback(
    (skillId: string, value: number) => {
      setScores((prev) => ({
        ...prev,
        [skillId]: Math.min(100, Math.max(0, value)),
      }));
    },
    [setScores]
  );

  const setAllScores = useCallback(
    (newScores: SkillScores) => {
      setScores(newScores);
    },
    [setScores]
  );

  const resetToDefaults = useCallback(() => {
    setScores(defaultScores);
  }, [setScores]);

  return {
    scores,
    setScore,
    setAllScores,
    resetToDefaults,
  };
}
