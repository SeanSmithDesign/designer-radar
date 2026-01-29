'use client';

import { useCallback, useState } from 'react';

export function useEditMode(initialState = false) {
  const [isEditMode, setIsEditMode] = useState(initialState);

  const toggleEditMode = useCallback(() => {
    setIsEditMode((prev) => !prev);
  }, []);

  const enterEditMode = useCallback(() => setIsEditMode(true), []);
  const exitEditMode = useCallback(() => setIsEditMode(false), []);

  return {
    isEditMode,
    toggleEditMode,
    enterEditMode,
    exitEditMode,
  };
}
