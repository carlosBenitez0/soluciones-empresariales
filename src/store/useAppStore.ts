'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Vacancy, StaffingRequest, CandidateApplication, Category, ClientCompany } from '../types';
import { generateCode } from '../lib/codes';
import { buildSeedState, SEED_VERSION } from '../data/seed';
import * as sync from './supabaseSync';
import type { Collections } from './supabaseSync';

// The form that collects the data may already have shown a tracking code to the user; keep it if given.
export type NewStaffingRequest = Omit<StaffingRequest, 'id' | 'trackingCode' | 'submittedAt' | 'status'> & {
  trackingCode?: string;
};
export type NewCandidateApplication = Omit<CandidateApplication, 'id' | 'trackingCode' | 'appliedAt' | 'status'> & {
  trackingCode?: string;
};

export const STORE_KEY = 'soluciones_store';

/** Keys used before the Zustand store (DataContext + manual localStorage). Removed on first load. */
export const LEGACY_STORAGE_KEYS = [
  'soluciones_vacancies_v1',
  'soluciones_requests_v1',
  'soluciones_applications_v1',
  'soluciones_categories_v1',
  'soluciones_companies_v1',
];

const today = () => new Date().toISOString().split('T')[0];

// Fire-and-forget call to an email Route Handler; email failures must never block the UI flow.
const notify = (path: string, payload: Record<string, unknown>) => {
  try {
    fetch(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).catch((err) => console.warn(`Notification ${path} failed:`, err));
  } catch (err) {
    console.warn(`Notification ${path} failed:`, err);
  }
};

export interface AppState extends Collections {
  /** False until the persisted state has been read from localStorage (always false on the server). */
  hasHydrated: boolean;

  addVacancy: (vacancy: Omit<Vacancy, 'id' | 'postedAt'>) => Promise<Vacancy>;
  updateVacancy: (id: string, updates: Partial<Vacancy>) => Promise<void>;
  deleteVacancy: (id: string) => Promise<void>;
  addStaffingRequest: (request: NewStaffingRequest) => Promise<StaffingRequest>;
  updateStaffingRequest: (id: string, updates: Partial<StaffingRequest>) => Promise<void>;
  addCandidateApplication: (app: NewCandidateApplication) => Promise<CandidateApplication>;
  updateCandidateApplication: (id: string, updates: Partial<CandidateApplication>) => Promise<void>;
  addCategory: (name: string) => Promise<Category>;
  updateCategory: (id: string, updates: Partial<Omit<Category, 'id'>>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  registerClientCompany: (input: Pick<ClientCompany, 'name' | 'contactName' | 'email' | 'phone'>) => Promise<ClientCompany>;
  approveClientCompany: (id: string) => Promise<ClientCompany | undefined>;
  updateClientCompany: (id: string, updates: Partial<Omit<ClientCompany, 'id' | 'createdAt'>>) => Promise<void>;
  regenerateAccessCode: (id: string) => Promise<string | undefined>;
  deleteClientCompany: (id: string) => Promise<void>;
  /** Replaces all data with the demo seed. */
  resetDemoData: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      ...buildSeedState(),
      hasHydrated: false,

      // 1. Add Vacancy
      addVacancy: async (input) => {
        const newVacancy: Vacancy = { isActive: true, ...input, id: `vac-${Date.now()}`, postedAt: today() };
        const dbId = await sync.insertVacancy(input);
        if (dbId) newVacancy.id = dbId;
        set({ vacancies: [newVacancy, ...get().vacancies] });
        return newVacancy;
      },

      // 2. Update Vacancy
      updateVacancy: async (id, updates) => {
        set({ vacancies: get().vacancies.map((v) => (v.id === id ? { ...v, ...updates } : v)) });
        await sync.updateVacancyRow(id, updates);
      },

      // 3. Delete Vacancy
      deleteVacancy: async (id) => {
        set({ vacancies: get().vacancies.filter((v) => v.id !== id) });
        await sync.deleteVacancyRow(id);
      },

      // 4. Add Staffing Request
      addStaffingRequest: async (input) => {
        const newRequest: StaffingRequest = {
          ...input,
          id: `req-${Date.now()}`,
          trackingCode: input.trackingCode ?? generateCode('REQ'),
          submittedAt: today(),
          status: 'Pendiente (1-2 días)',
        };
        const dbId = await sync.insertStaffingRequest(newRequest);
        if (dbId) newRequest.id = dbId;
        set({ staffingRequests: [newRequest, ...get().staffingRequests] });
        return newRequest;
      },

      // 5. Update Staffing Request
      updateStaffingRequest: async (id, updates) => {
        set({ staffingRequests: get().staffingRequests.map((r) => (r.id === id ? { ...r, ...updates } : r)) });
        await sync.updateStaffingRequestRow(id, updates);
      },

      // 6. Add Candidate Application
      addCandidateApplication: async (input) => {
        const newApp: CandidateApplication = {
          ...input,
          id: `app-${Date.now()}`,
          trackingCode: input.trackingCode ?? generateCode('APP'),
          appliedAt: today(),
          status: 'Solicitud Recibida',
        };
        const dbId = await sync.insertCandidateApplication(newApp);
        if (dbId) newApp.id = dbId;
        set({ candidateApplications: [newApp, ...get().candidateApplications] });

        notify('/api/notify/application', {
          trackingCode: newApp.trackingCode,
          email: newApp.email,
          fullName: newApp.fullName,
          vacancyTitle: newApp.vacancyTitle,
        });
        return newApp;
      },

      // 7. Update Candidate Application
      updateCandidateApplication: async (id, updates) => {
        set({ candidateApplications: get().candidateApplications.map((a) => (a.id === id ? { ...a, ...updates } : a)) });
        await sync.updateCandidateApplicationRow(id, updates);
      },

      // 8. Add Category
      addCategory: async (name) => {
        const newCategory: Category = { id: `cat-${Date.now()}`, name: name.trim(), isActive: true };
        const dbId = await sync.insertCategory(newCategory.name);
        if (dbId) newCategory.id = dbId;
        set({ categories: [...get().categories, newCategory] });
        return newCategory;
      },

      // 9. Update Category (renaming also moves the vacancies that used the old name)
      updateCategory: async (id, updates) => {
        const current = get().categories.find((c) => c.id === id);
        if (!current) return;
        const newName = updates.name?.trim();
        const isRename = Boolean(newName && newName !== current.name);

        set({
          categories: get().categories.map((c) => (c.id === id ? { ...c, ...updates, ...(newName ? { name: newName } : {}) } : c)),
          ...(isRename
            ? { vacancies: get().vacancies.map((v) => (v.category === current.name ? { ...v, category: newName! } : v)) }
            : {}),
        });
        await sync.updateCategoryRow(id, { name: newName, isActive: updates.isActive }, current.name);
      },

      // 10. Delete Category (callers must make sure no vacancy uses it)
      deleteCategory: async (id) => {
        set({ categories: get().categories.filter((c) => c.id !== id) });
        await sync.deleteCategoryRow(id);
      },

      // 11. Register Client Company (public form, starts as Pendiente)
      registerClientCompany: async (input) => {
        const newCompany: ClientCompany = { ...input, id: `emp-${Date.now()}`, status: 'Pendiente', createdAt: today() };
        const dbId = await sync.insertClientCompany(input);
        if (dbId) newCompany.id = dbId;
        set({ clientCompanies: [newCompany, ...get().clientCompanies] });
        return newCompany;
      },

      // 12. Update Client Company (keeps the public name of its non-confidential vacancies in sync)
      updateClientCompany: async (id, updates) => {
        const newName = updates.name;
        set({
          clientCompanies: get().clientCompanies.map((c) => (c.id === id ? { ...c, ...updates } : c)),
          ...(newName
            ? {
                vacancies: get().vacancies.map((v) =>
                  v.companyId === id && !v.isConfidential ? { ...v, company: newName } : v
                ),
              }
            : {}),
        });
        await sync.updateClientCompanyRow(id, updates);
      },

      // 13. Approve Client Company (generates its portal access code)
      approveClientCompany: async (id) => {
        const company = get().clientCompanies.find((c) => c.id === id);
        if (!company) return undefined;
        const accessCode = company.accessCode ?? generateCode('EMP');
        await get().updateClientCompany(id, { status: 'Aprobada', accessCode });

        notify('/api/notify/company-approved', {
          companyId: id,
          email: company.email,
          companyName: company.name,
          contactName: company.contactName,
          accessCode,
        });
        return { ...company, status: 'Aprobada', accessCode };
      },

      // 14. Regenerate access code (invalidates the previous one)
      regenerateAccessCode: async (id) => {
        if (!get().clientCompanies.some((c) => c.id === id)) return undefined;
        const accessCode = generateCode('EMP');
        await get().updateClientCompany(id, { accessCode });
        return accessCode;
      },

      // 15. Delete Client Company (its vacancies stay published, just unlinked)
      deleteClientCompany: async (id) => {
        set({
          clientCompanies: get().clientCompanies.filter((c) => c.id !== id),
          vacancies: get().vacancies.map((v) => (v.companyId === id ? { ...v, companyId: undefined } : v)),
        });
        await sync.deleteClientCompanyRow(id);
      },

      resetDemoData: () => set(buildSeedState()),
    }),
    {
      name: STORE_KEY,
      version: SEED_VERSION,
      storage: createJSONStorage(() => localStorage),
      // Hydrated manually from <StoreHydrator /> after mount, so server and first client render match
      skipHydration: true,
      partialize: (state): Collections => ({
        vacancies: state.vacancies,
        staffingRequests: state.staffingRequests,
        candidateApplications: state.candidateApplications,
        categories: state.categories,
        clientCompanies: state.clientCompanies,
      }),
      // Data saved with an older seed version is demo data: replace it with the current seed
      migrate: () => buildSeedState(),
      onRehydrateStorage: () => () => {
        useAppStore.setState({ hasHydrated: true });
      },
    }
  )
);
