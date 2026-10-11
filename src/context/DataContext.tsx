'use client';

import { useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useAppStore, AppState } from '../store/useAppStore';

// Compatibility facade: screens keep calling useData(); the state now lives in the Zustand store
// (src/store/useAppStore.ts), persisted to localStorage.

export type DataContextType = Omit<AppState, 'hasHydrated'> & {
  activeCategoryNames: string[];
  isLoading: boolean;
};

export const useData = (): DataContextType => {
  const { hasHydrated, ...state } = useAppStore(useShallow((s) => s));

  const activeCategoryNames = useMemo(
    () => state.categories.filter((c) => c.isActive).map((c) => c.name),
    [state.categories]
  );

  return { ...state, activeCategoryNames, isLoading: !hasHydrated };
};
