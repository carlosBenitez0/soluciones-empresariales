'use client';

import { useCallback, useEffect, useState, useSyncExternalStore } from 'react';
import { useData } from '../context/DataContext';
import { isSupabaseConfigured } from '../lib/supabase';
import { ACCESS_CODE_PATTERN, normalizeCode } from '../lib/codes';
import { buildCompanyPortalView, CompanyPortalView } from '../lib/companyPortal';

const SESSION_KEY = 'soluciones_company_session_v1';

export const readCompanySession = (): string | null => {
  try {
    return localStorage.getItem(SESSION_KEY);
  } catch {
    return null;
  }
};

export const saveCompanySession = (accessCode: string) => {
  try {
    localStorage.setItem(SESSION_KEY, accessCode);
  } catch {}
};

export const clearCompanySession = () => {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch {}
};

const subscribeToStorage = (onChange: () => void) => {
  window.addEventListener('storage', onChange);
  return () => window.removeEventListener('storage', onChange);
};

/** Stored access code; `undefined` while rendering on the server (not known yet). */
export const useCompanySession = (): string | null | undefined =>
  useSyncExternalStore(subscribeToStorage, readCompanySession, () => undefined);

export type PortalState =
  | { status: 'loading' }
  | { status: 'invalid' }
  | { status: 'ok'; view: CompanyPortalView };

/**
 * Resolves an access code into the company's anonymized portal view.
 * With a real database the server builds the view; in demo mode (localStorage) it is built locally.
 */
export const useCompanyPortal = (accessCode: string | null) => {
  const { clientCompanies, vacancies, candidateApplications, isLoading } = useData();
  // Remote result tagged with the code + reload it belongs to, so a new request shows as loading
  const [remote, setRemote] = useState<{ key: string; state: PortalState } | null>(null);
  const [reloadKey, setReloadKey] = useState(0);
  const code = accessCode ? normalizeCode(accessCode) : null;

  useEffect(() => {
    if (!isSupabaseConfigured || !code) return;
    let cancelled = false;
    fetch('/api/portal-empresa', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ accessCode: code }),
    })
      .then(async (res) => (res.ok ? ((await res.json()) as CompanyPortalView) : null))
      .catch(() => null)
      .then((view) => {
        if (!cancelled) {
          setRemote({ key: `${code}#${reloadKey}`, state: view ? { status: 'ok', view } : { status: 'invalid' } });
        }
      });
    return () => {
      cancelled = true;
    };
  }, [code, reloadKey]);

  const refresh = useCallback(() => setReloadKey((k) => k + 1), []);

  let state: PortalState;
  if (!code || !ACCESS_CODE_PATTERN.test(code)) {
    state = { status: 'invalid' };
  } else if (isSupabaseConfigured) {
    state = remote && remote.key === `${code}#${reloadKey}` ? remote.state : { status: 'loading' };
  } else if (isLoading) {
    state = { status: 'loading' };
  } else {
    const company = clientCompanies.find((c) => c.accessCode === code && c.status === 'Aprobada');
    state = company
      ? { status: 'ok', view: buildCompanyPortalView(company, vacancies, candidateApplications) }
      : { status: 'invalid' };
  }

  return { state, refresh };
};
