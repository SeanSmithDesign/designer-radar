'use client';

import { useState, useCallback, useEffect } from 'react';
import { Profile, SkillScores } from '@/types/chart';
import { profileColors } from '@/data/defaults';

const STORAGE_KEY = 'radar-profiles';

function loadProfiles(): Profile[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveProfiles(profiles: Profile[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
  } catch {}
}

export function useProfiles() {
  const [savedProfiles, setSavedProfiles] = useState<Profile[]>([]);
  const [compareIds, setCompareIds] = useState<string[]>([]);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setSavedProfiles(loadProfiles()); }, []);

  const saveProfile = useCallback(
    (name: string, scores: SkillScores) => {
      const newProfile: Profile = {
        id: `profile-${Date.now()}`,
        name,
        scores,
        color: profileColors[savedProfiles.length % profileColors.length],
        createdAt: Date.now(),
      };
      const updated = [...savedProfiles, newProfile];
      setSavedProfiles(updated);
      saveProfiles(updated);
      return newProfile;
    },
    [savedProfiles]
  );

  const deleteProfile = useCallback(
    (id: string) => {
      const updated = savedProfiles.filter((p) => p.id !== id);
      setSavedProfiles(updated);
      saveProfiles(updated);
      setCompareIds((prev) => prev.filter((cid) => cid !== id));
    },
    [savedProfiles]
  );

  const toggleCompare = useCallback(
    (id: string) => {
      setCompareIds((prev) => {
        if (prev.includes(id)) {
          return prev.filter((cid) => cid !== id);
        }
        if (prev.length >= 2) return prev;
        return [...prev, id];
      });
    },
    []
  );

  const clearCompare = useCallback(() => {
    setCompareIds([]);
  }, []);

  const comparisonProfiles = savedProfiles.filter((p) =>
    compareIds.includes(p.id)
  );

  return {
    savedProfiles,
    comparisonProfiles,
    compareIds,
    saveProfile,
    deleteProfile,
    toggleCompare,
    clearCompare,
  };
}
