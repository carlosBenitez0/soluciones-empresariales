'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Vacancy, StaffingRequest, CandidateApplication, Category, ClientCompany, CONFIDENTIAL_COMPANY_NAME } from '../types';
import { INITIAL_VACANCIES, INITIAL_STAFFING_REQUESTS, INITIAL_CANDIDATE_APPLICATIONS, INITIAL_CATEGORIES } from '../data/mockData';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { generateCode } from '../lib/codes';

interface DataContextType {
  vacancies: Vacancy[];
  staffingRequests: StaffingRequest[];
  candidateApplications: CandidateApplication[];
  categories: Category[];
  activeCategoryNames: string[];
  clientCompanies: ClientCompany[];
  isLoading: boolean;
  addVacancy: (vacancy: Omit<Vacancy, 'id' | 'postedAt'>) => Promise<Vacancy>;
  updateVacancy: (id: string, updates: Partial<Vacancy>) => Promise<void>;
  deleteVacancy: (id: string) => Promise<void>;
  addStaffingRequest: (request: Omit<StaffingRequest, 'id' | 'trackingCode' | 'submittedAt' | 'status'>) => Promise<StaffingRequest>;
  updateStaffingRequest: (id: string, updates: Partial<StaffingRequest>) => Promise<void>;
  addCandidateApplication: (app: Omit<CandidateApplication, 'id' | 'trackingCode' | 'appliedAt' | 'status'>) => Promise<CandidateApplication>;
  updateCandidateApplication: (id: string, updates: Partial<CandidateApplication>) => Promise<void>;
  addCategory: (name: string) => Promise<Category>;
  updateCategory: (id: string, updates: Partial<Omit<Category, 'id'>>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  registerClientCompany: (input: Pick<ClientCompany, 'name' | 'contactName' | 'email' | 'phone'>) => Promise<ClientCompany>;
  approveClientCompany: (id: string) => Promise<ClientCompany | undefined>;
  updateClientCompany: (id: string, updates: Partial<Omit<ClientCompany, 'id' | 'createdAt'>>) => Promise<void>;
  regenerateAccessCode: (id: string) => Promise<string | undefined>;
  deleteClientCompany: (id: string) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const LOCAL_STORAGE_KEYS = {
  VACANCIES: 'soluciones_vacancies_v1',
  REQUESTS: 'soluciones_requests_v1',
  APPLICATIONS: 'soluciones_applications_v1',
  CATEGORIES: 'soluciones_categories_v1',
  COMPANIES: 'soluciones_companies_v1',
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [vacancies, setVacancies] = useState<Vacancy[]>(INITIAL_VACANCIES);
  const [staffingRequests, setStaffingRequests] = useState<StaffingRequest[]>(INITIAL_STAFFING_REQUESTS);
  const [candidateApplications, setCandidateApplications] = useState<CandidateApplication[]>(INITIAL_CANDIDATE_APPLICATIONS);
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [clientCompanies, setClientCompanies] = useState<ClientCompany[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initial Load from Supabase or LocalStorage
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      if (isSupabaseConfigured && supabase) {
        try {
          // Fetch Vacancies
          const { data: vacData } = await supabase.from('vacancies').select('*').order('posted_at', { ascending: false });
          if (vacData && vacData.length > 0) {
            const mappedVacancies: Vacancy[] = vacData.map((v) => ({
              id: v.id,
              title: v.title,
              company: v.company,
              category: v.category,
              location: v.location,
              workMode: v.work_mode,
              salaryRange: v.salary_range,
              description: v.description,
              requirements: v.requirements || [],
              responsibilities: v.responsibilities || [],
              benefits: v.benefits || [],
              postedAt: v.posted_at ? new Date(v.posted_at).toISOString().split('T')[0] : '2026-10-06',
              isUrgent: v.is_urgent ?? false,
              isActive: v.is_active ?? true,
              companyId: v.company_id ?? undefined,
              isConfidential: v.company === CONFIDENTIAL_COMPANY_NAME,
            }));
            setVacancies(mappedVacancies);
          }

          // Fetch Staffing Requests
          const { data: reqData } = await supabase.from('staffing_requests').select('*').order('submitted_at', { ascending: false });
          if (reqData && reqData.length > 0) {
            const mappedRequests: StaffingRequest[] = reqData.map((r) => ({
              id: r.id,
              trackingCode: r.tracking_code,
              companyName: r.company_name,
              contactName: r.contact_name,
              email: r.email,
              phone: r.phone,
              requestType: r.request_type,
              positionTitle: r.position_title,
              category: r.category,
              numberOfPositions: r.number_of_positions,
              salaryBudget: r.salary_budget,
              keyRequirements: r.key_requirements,
              urgent: r.urgent,
              submittedAt: r.submitted_at ? new Date(r.submitted_at).toISOString().split('T')[0] : '2026-10-06',
              status: r.status,
            }));
            setStaffingRequests(mappedRequests);
          }

          // Fetch Candidate Applications
          const { data: appData } = await supabase.from('candidate_applications').select('*').order('applied_at', { ascending: false });
          if (appData && appData.length > 0) {
            const mappedApplications: CandidateApplication[] = appData.map((a) => ({
              id: a.id,
              trackingCode: a.tracking_code,
              vacancyTitle: a.vacancy_title,
              fullName: a.full_name,
              email: a.email,
              phone: a.phone,
              experienceYears: a.experience_years,
              expectedSalary: Number(a.expected_salary),
              availability: a.availability ?? undefined,
              appliedAt: a.applied_at ? new Date(a.applied_at).toISOString().split('T')[0] : '2026-10-06',
              status: a.status,
              testScores: a.test_scores,
            }));
            setCandidateApplications(mappedApplications);
          }

          // Fetch Client Companies
          const { data: compData } = await supabase.from('client_companies').select('*').order('created_at', { ascending: false });
          if (compData) {
            setClientCompanies(
              compData.map((c) => ({
                id: c.id,
                name: c.name,
                contactName: c.contact_name,
                email: c.email,
                phone: c.phone,
                status: c.status,
                accessCode: c.access_code ?? undefined,
                createdAt: c.created_at ? new Date(c.created_at).toISOString().split('T')[0] : '',
              }))
            );
          }

          // Fetch Categories
          const { data: catData } = await supabase.from('categories').select('*').order('name', { ascending: true });
          if (catData && catData.length > 0) {
            setCategories(
              catData.map((c) => ({ id: c.id, name: c.name, isActive: c.is_active ?? true }))
            );
          }
        } catch (err) {
          console.error('Error loading data from Supabase:', err);
        }
      } else {
        // Fallback to LocalStorage
        try {
          const storedVacancies = localStorage.getItem(LOCAL_STORAGE_KEYS.VACANCIES);
          if (storedVacancies) setVacancies(JSON.parse(storedVacancies));

          const storedRequests = localStorage.getItem(LOCAL_STORAGE_KEYS.REQUESTS);
          if (storedRequests) setStaffingRequests(JSON.parse(storedRequests));

          const storedApps = localStorage.getItem(LOCAL_STORAGE_KEYS.APPLICATIONS);
          if (storedApps) setCandidateApplications(JSON.parse(storedApps));

          const storedCompanies = localStorage.getItem(LOCAL_STORAGE_KEYS.COMPANIES);
          if (storedCompanies) setClientCompanies(JSON.parse(storedCompanies));

          const storedCategories = localStorage.getItem(LOCAL_STORAGE_KEYS.CATEGORIES);
          if (storedCategories) setCategories(JSON.parse(storedCategories));
        } catch (e) {
          console.error('Error reading from localStorage:', e);
        }
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  // Save to LocalStorage helpers
  const saveVacanciesLocal = (newVacancies: Vacancy[]) => {
    setVacancies(newVacancies);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.VACANCIES, JSON.stringify(newVacancies));
    } catch (e) {}
  };

  const saveRequestsLocal = (newRequests: StaffingRequest[]) => {
    setStaffingRequests(newRequests);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.REQUESTS, JSON.stringify(newRequests));
    } catch (e) {}
  };

  const saveAppsLocal = (newApps: CandidateApplication[]) => {
    setCandidateApplications(newApps);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.APPLICATIONS, JSON.stringify(newApps));
    } catch (e) {}
  };

  const saveCategoriesLocal = (newCategories: Category[]) => {
    setCategories(newCategories);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.CATEGORIES, JSON.stringify(newCategories));
    } catch (e) {}
  };

  const saveCompaniesLocal = (newCompanies: ClientCompany[]) => {
    setClientCompanies(newCompanies);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.COMPANIES, JSON.stringify(newCompanies));
    } catch (e) {}
  };

  // 1. Add Vacancy
  const addVacancy = async (vacancyInput: Omit<Vacancy, 'id' | 'postedAt'>): Promise<Vacancy> => {
    const today = new Date().toISOString().split('T')[0];
    const newId = `vac-${Date.now()}`;
    const newVacancy: Vacancy = {
      isActive: true,
      ...vacancyInput,
      id: newId,
      postedAt: today,
    };

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('vacancies')
          .insert([
            {
              title: vacancyInput.title,
              company: vacancyInput.company || 'Empresa Cliente Confidencial',
              category: vacancyInput.category,
              location: vacancyInput.location,
              work_mode: vacancyInput.workMode,
              salary_range: vacancyInput.salaryRange,
              description: vacancyInput.description,
              requirements: vacancyInput.requirements,
              responsibilities: vacancyInput.responsibilities,
              benefits: vacancyInput.benefits,
              is_urgent: vacancyInput.isUrgent,
              is_active: vacancyInput.isActive ?? true,
              company_id: vacancyInput.companyId ?? null,
            },
          ])
          .select()
          .single();

        if (data && !error) {
          newVacancy.id = data.id;
        }
      } catch (err) {
        console.error('Error inserting vacancy into Supabase:', err);
      }
    }

    const updated = [newVacancy, ...vacancies];
    saveVacanciesLocal(updated);
    return newVacancy;
  };

  // 2. Update Vacancy
  const updateVacancy = async (id: string, updates: Partial<Vacancy>): Promise<void> => {
    const updatedVacancies = vacancies.map((v) => (v.id === id ? { ...v, ...updates } : v));
    saveVacanciesLocal(updatedVacancies);

    if (isSupabaseConfigured && supabase) {
      try {
        const payload: Record<string, any> = {};
        if (updates.title) payload.title = updates.title;
        if (updates.company) payload.company = updates.company;
        if (updates.category) payload.category = updates.category;
        if (updates.location) payload.location = updates.location;
        if (updates.workMode) payload.work_mode = updates.workMode;
        if (updates.salaryRange) payload.salary_range = updates.salaryRange;
        if (updates.description) payload.description = updates.description;
        if (updates.requirements) payload.requirements = updates.requirements;
        if (updates.responsibilities) payload.responsibilities = updates.responsibilities;
        if (updates.benefits) payload.benefits = updates.benefits;
        if (typeof updates.isUrgent === 'boolean') payload.is_urgent = updates.isUrgent;
        if (typeof updates.isActive === 'boolean') payload.is_active = updates.isActive;
        if ('companyId' in updates) payload.company_id = updates.companyId ?? null;

        await supabase.from('vacancies').update(payload).eq('id', id);
      } catch (err) {
        console.error('Error updating vacancy in Supabase:', err);
      }
    }
  };

  // 3. Delete Vacancy
  const deleteVacancy = async (id: string): Promise<void> => {
    const updated = vacancies.filter((v) => v.id !== id);
    saveVacanciesLocal(updated);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('vacancies').delete().eq('id', id);
      } catch (err) {
        console.error('Error deleting vacancy in Supabase:', err);
      }
    }
  };

  // 4. Add Staffing Request
  const addStaffingRequest = async (
    input: Omit<StaffingRequest, 'id' | 'trackingCode' | 'submittedAt' | 'status'>
  ): Promise<StaffingRequest> => {
    const today = new Date().toISOString().split('T')[0];
    const trackingCode = `REQ-${Math.floor(1000 + Math.random() * 9000)}`;
    const newRequest: StaffingRequest = {
      ...input,
      id: `req-${Date.now()}`,
      trackingCode,
      submittedAt: today,
      status: 'Pendiente (1-2 días)',
    };

    if (isSupabaseConfigured && supabase) {
      try {
        const { data } = await supabase
          .from('staffing_requests')
          .insert([
            {
              tracking_code: trackingCode,
              company_name: input.companyName,
              contact_name: input.contactName,
              email: input.email,
              phone: input.phone,
              request_type: input.requestType,
              position_title: input.positionTitle,
              category: input.category,
              number_of_positions: input.numberOfPositions,
              salary_budget: input.salaryBudget,
              key_requirements: input.keyRequirements,
              urgent: input.urgent,
              status: 'Pendiente (1-2 días)',
            },
          ])
          .select()
          .single();

        if (data) {
          newRequest.id = data.id;
        }
      } catch (err) {
        console.error('Error inserting staffing request into Supabase:', err);
      }
    }

    const updated = [newRequest, ...staffingRequests];
    saveRequestsLocal(updated);
    return newRequest;
  };

  // 5. Update Staffing Request
  const updateStaffingRequest = async (id: string, updates: Partial<StaffingRequest>): Promise<void> => {
    const updatedRequests = staffingRequests.map((r) => (r.id === id ? { ...r, ...updates } : r));
    saveRequestsLocal(updatedRequests);

    if (isSupabaseConfigured && supabase) {
      try {
        const payload: Record<string, any> = {};
        if (updates.status) payload.status = updates.status;
        await supabase.from('staffing_requests').update(payload).eq('id', id);
      } catch (err) {
        console.error('Error updating staffing request in Supabase:', err);
      }
    }
  };

  // 6. Add Candidate Application
  const addCandidateApplication = async (
    input: Omit<CandidateApplication, 'id' | 'trackingCode' | 'appliedAt' | 'status'>
  ): Promise<CandidateApplication> => {
    const today = new Date().toISOString().split('T')[0];
    const trackingCode = `APP-${Math.floor(1000 + Math.random() * 9000)}`;
    const newApp: CandidateApplication = {
      ...input,
      id: `app-${Date.now()}`,
      trackingCode,
      appliedAt: today,
      status: 'Solicitud Recibida',
    };

    if (isSupabaseConfigured && supabase) {
      try {
        const { data } = await supabase
          .from('candidate_applications')
          .insert([
            {
              tracking_code: trackingCode,
              vacancy_title: input.vacancyTitle,
              full_name: input.fullName,
              email: input.email,
              phone: input.phone,
              experience_years: input.experienceYears,
              expected_salary: input.expectedSalary,
              availability: input.availability ?? null,
              status: 'Solicitud Recibida',
            },
          ])
          .select()
          .single();

        if (data) {
          newApp.id = data.id;
        }
      } catch (err) {
        console.error('Error inserting candidate application into Supabase:', err);
      }
    }

    const updated = [newApp, ...candidateApplications];
    saveAppsLocal(updated);
    return newApp;
  };

  // 7. Update Candidate Application
  const updateCandidateApplication = async (id: string, updates: Partial<CandidateApplication>): Promise<void> => {
    const updatedApps = candidateApplications.map((a) => (a.id === id ? { ...a, ...updates } : a));
    saveAppsLocal(updatedApps);

    if (isSupabaseConfigured && supabase) {
      try {
        const payload: Record<string, any> = {};
        if (updates.status) payload.status = updates.status;
        if (updates.testScores) payload.test_scores = updates.testScores;

        await supabase.from('candidate_applications').update(payload).eq('id', id);
      } catch (err) {
        console.error('Error updating candidate application in Supabase:', err);
      }
    }
  };

  // 8. Add Category
  const addCategory = async (name: string): Promise<Category> => {
    const newCategory: Category = { id: `cat-${Date.now()}`, name: name.trim(), isActive: true };

    if (isSupabaseConfigured && supabase) {
      try {
        const { data } = await supabase
          .from('categories')
          .insert([{ name: newCategory.name, is_active: true }])
          .select()
          .single();
        if (data) newCategory.id = data.id;
      } catch (err) {
        console.error('Error inserting category into Supabase:', err);
      }
    }

    saveCategoriesLocal([...categories, newCategory]);
    return newCategory;
  };

  // 9. Update Category (renaming also moves the vacancies that used the old name)
  const updateCategory = async (id: string, updates: Partial<Omit<Category, 'id'>>): Promise<void> => {
    const current = categories.find((c) => c.id === id);
    if (!current) return;
    const newName = updates.name?.trim();
    const isRename = Boolean(newName && newName !== current.name);

    saveCategoriesLocal(categories.map((c) => (c.id === id ? { ...c, ...updates, ...(newName ? { name: newName } : {}) } : c)));
    if (isRename) {
      saveVacanciesLocal(vacancies.map((v) => (v.category === current.name ? { ...v, category: newName! } : v)));
    }

    if (isSupabaseConfigured && supabase) {
      try {
        const payload: Record<string, string | boolean> = {};
        if (newName) payload.name = newName;
        if (typeof updates.isActive === 'boolean') payload.is_active = updates.isActive;
        await supabase.from('categories').update(payload).eq('id', id);
        if (isRename) {
          await supabase.from('vacancies').update({ category: newName }).eq('category', current.name);
        }
      } catch (err) {
        console.error('Error updating category in Supabase:', err);
      }
    }
  };

  // 10. Delete Category (callers must make sure no vacancy uses it)
  const deleteCategory = async (id: string): Promise<void> => {
    saveCategoriesLocal(categories.filter((c) => c.id !== id));

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('categories').delete().eq('id', id);
      } catch (err) {
        console.error('Error deleting category in Supabase:', err);
      }
    }
  };

  // 11. Register Client Company (public form, starts as Pendiente)
  const registerClientCompany = async (
    input: Pick<ClientCompany, 'name' | 'contactName' | 'email' | 'phone'>
  ): Promise<ClientCompany> => {
    const newCompany: ClientCompany = {
      ...input,
      id: `emp-${Date.now()}`,
      status: 'Pendiente',
      createdAt: new Date().toISOString().split('T')[0],
    };

    if (isSupabaseConfigured && supabase) {
      try {
        const { data } = await supabase
          .from('client_companies')
          .insert([
            {
              name: input.name,
              contact_name: input.contactName,
              email: input.email,
              phone: input.phone,
              status: 'Pendiente',
            },
          ])
          .select()
          .single();
        if (data) newCompany.id = data.id;
      } catch (err) {
        console.error('Error inserting client company into Supabase:', err);
      }
    }

    saveCompaniesLocal([newCompany, ...clientCompanies]);
    return newCompany;
  };

  // 12. Update Client Company
  const updateClientCompany = async (
    id: string,
    updates: Partial<Omit<ClientCompany, 'id' | 'createdAt'>>
  ): Promise<void> => {
    saveCompaniesLocal(clientCompanies.map((c) => (c.id === id ? { ...c, ...updates } : c)));

    // Keep the public company name of its non-confidential vacancies in sync
    const newName = updates.name;
    if (newName) {
      saveVacanciesLocal(
        vacancies.map((v) => (v.companyId === id && !v.isConfidential ? { ...v, company: newName } : v))
      );
    }

    if (isSupabaseConfigured && supabase) {
      try {
        const payload: Record<string, string | null> = {};
        if (updates.name) payload.name = updates.name;
        if (updates.contactName) payload.contact_name = updates.contactName;
        if (updates.email) payload.email = updates.email;
        if (updates.phone) payload.phone = updates.phone;
        if (updates.status) payload.status = updates.status;
        if ('accessCode' in updates) payload.access_code = updates.accessCode ?? null;
        await supabase.from('client_companies').update(payload).eq('id', id);
        if (newName) {
          await supabase
            .from('vacancies')
            .update({ company: newName })
            .eq('company_id', id)
            .neq('company', CONFIDENTIAL_COMPANY_NAME);
        }
      } catch (err) {
        console.error('Error updating client company in Supabase:', err);
      }
    }
  };

  // 13. Approve Client Company (generates its portal access code)
  const approveClientCompany = async (id: string): Promise<ClientCompany | undefined> => {
    const company = clientCompanies.find((c) => c.id === id);
    if (!company) return undefined;
    const accessCode = company.accessCode ?? generateCode('EMP');
    await updateClientCompany(id, { status: 'Aprobada', accessCode });
    return { ...company, status: 'Aprobada', accessCode };
  };

  // 14. Regenerate access code (invalidates the previous one)
  const regenerateAccessCode = async (id: string): Promise<string | undefined> => {
    if (!clientCompanies.some((c) => c.id === id)) return undefined;
    const accessCode = generateCode('EMP');
    await updateClientCompany(id, { accessCode });
    return accessCode;
  };

  // 15. Delete Client Company (its vacancies stay published, just unlinked)
  const deleteClientCompany = async (id: string): Promise<void> => {
    saveCompaniesLocal(clientCompanies.filter((c) => c.id !== id));
    saveVacanciesLocal(vacancies.map((v) => (v.companyId === id ? { ...v, companyId: undefined } : v)));

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('client_companies').delete().eq('id', id);
      } catch (err) {
        console.error('Error deleting client company in Supabase:', err);
      }
    }
  };

  const activeCategoryNames = categories.filter((c) => c.isActive).map((c) => c.name);

  return (
    <DataContext.Provider
      value={{
        vacancies,
        staffingRequests,
        candidateApplications,
        categories,
        activeCategoryNames,
        clientCompanies,
        isLoading,
        addVacancy,
        updateVacancy,
        deleteVacancy,
        addStaffingRequest,
        updateStaffingRequest,
        addCandidateApplication,
        updateCandidateApplication,
        addCategory,
        updateCategory,
        deleteCategory,
        registerClientCompany,
        approveClientCompany,
        updateClientCompany,
        regenerateAccessCode,
        deleteClientCompany,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
