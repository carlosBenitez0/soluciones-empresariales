'use client';

import { useEffect } from 'react';
import { useAppStore, LEGACY_STORAGE_KEYS } from './useAppStore';
import { loadFromSupabase } from './supabaseSync';
import { isSupabaseConfigured } from '../lib/supabase';

/** Loads the persisted store once on the client (and the database, when configured). Renders nothing. */
export const StoreHydrator = () => {
  useEffect(() => {
    try {
      LEGACY_STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
    } catch {}

    void useAppStore.persist.rehydrate();

    if (isSupabaseConfigured) {
      loadFromSupabase().then((remote) => useAppStore.setState(remote));
    }
  }, []);

  return null;
};
