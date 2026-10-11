import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { useData } from '../context/DataContext';
import { useAppStore, STORE_KEY } from '../store/useAppStore';
import { buildSeedState, SEED_VERSION } from '../data/seed';

describe('useData (Zustand store)', () => {
  beforeEach(() => {
    localStorage.clear();
    useAppStore.setState({ ...buildSeedState(), hasHydrated: true });
  });

  it('keeps the tracking code that was already shown to the applicant', async () => {
    const { result } = renderHook(() => useData());
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    await act(async () => {
      await result.current.addCandidateApplication({
        trackingCode: 'APP-TEST42',
        vacancyId: 'vac-1',
        vacancyTitle: 'Analista Contable y de Planillas',
        fullName: 'Ana López',
        email: 'ana@test.sv',
        phone: '+503 7111-2222',
        experienceYears: 2,
        expectedSalary: 600,
        availability: 'Inmediata',
      });
    });

    expect(result.current.candidateApplications[0].trackingCode).toBe('APP-TEST42');
  });

  it('generates a non-sequential code when none is given', async () => {
    const { result } = renderHook(() => useData());
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    let code = '';
    await act(async () => {
      const created = await result.current.addCandidateApplication({
        vacancyTitle: 'Analista Contable y de Planillas',
        fullName: 'Ana López',
        email: 'ana@test.sv',
        phone: '+503 7111-2222',
        experienceYears: 2,
        expectedSalary: 600,
      });
      code = created.trackingCode;
    });

    expect(code).toMatch(/^APP-[A-Z2-9]{6}$/);
  });

  it('approving a company generates its portal access code', async () => {
    const { result } = renderHook(() => useData());
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    let companyId = '';
    await act(async () => {
      const company = await result.current.registerClientCompany({
        name: 'Industrias del Norte',
        contactName: 'Ana Martínez',
        email: 'rrhh@norte.sv',
        phone: '+503 2000-0000',
      });
      companyId = company.id;
    });
    expect(result.current.clientCompanies[0].status).toBe('Pendiente');
    expect(result.current.clientCompanies[0].accessCode).toBeUndefined();

    await act(async () => {
      await result.current.approveClientCompany(companyId);
    });

    expect(result.current.clientCompanies[0].status).toBe('Aprobada');
    expect(result.current.clientCompanies[0].accessCode).toMatch(/^EMP-[A-Z2-9]{6}$/);
  });

  it('restores data persisted with the current seed version', async () => {
    const saved = { ...buildSeedState(), categories: [{ id: 'cat-x', name: 'Persistida', isActive: true }] };
    localStorage.setItem(STORE_KEY, JSON.stringify({ state: saved, version: SEED_VERSION }));

    await useAppStore.persist.rehydrate();

    expect(useAppStore.getState().categories).toEqual([{ id: 'cat-x', name: 'Persistida', isActive: true }]);
    expect(useAppStore.getState().hasHydrated).toBe(true);
  });

  it('replaces data saved with an older seed version by the current seed', async () => {
    const old = { ...buildSeedState(), vacancies: [] };
    localStorage.setItem(STORE_KEY, JSON.stringify({ state: old, version: SEED_VERSION - 1 }));

    await useAppStore.persist.rehydrate();

    expect(useAppStore.getState().vacancies).toEqual(buildSeedState().vacancies);
  });

  it('resetDemoData restores the seed', () => {
    useAppStore.setState({ vacancies: [] });
    useAppStore.getState().resetDemoData();
    expect(useAppStore.getState().vacancies).toEqual(buildSeedState().vacancies);
  });
});
