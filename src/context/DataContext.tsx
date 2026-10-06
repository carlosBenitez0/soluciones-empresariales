'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Vacancy, StaffingRequest, CandidateApplication } from '../types';
import { INITIAL_VACANCIES, INITIAL_STAFFING_REQUESTS, INITIAL_CANDIDATE_APPLICATIONS } from '../data/mockData';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface DataContextType {
  vacancies: Vacancy[];
  staffingRequests: StaffingRequest[];
  candidateApplications: CandidateApplication[];
  isLoading: boolean;
  addVacancy: (vacancy: Omit<Vacancy, 'id' | 'postedAt'>) => Promise<Vacancy>;
  updateVacancy: (id: string, updates: Partial<Vacancy>) => Promise<void>;
  deleteVacancy: (id: string) => Promise<void>;
  addStaffingRequest: (request: Omit<StaffingRequest, 'id' | 'trackingCode' | 'submittedAt' | 'status'>) => Promise<StaffingRequest>;
  updateStaffingRequest: (id: string, updates: Partial<StaffingRequest>) => Promise<void>;
  addCandidateApplication: (app: Omit<CandidateApplication, 'id' | 'trackingCode' | 'appliedAt' | 'status'>) => Promise<CandidateApplication>;
  updateCandidateApplication: (id: string, updates: Partial<CandidateApplication>) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const LOCAL_STORAGE_KEYS = {
  VACANCIES: 'soluciones_vacancies_v1',
  REQUESTS: 'soluciones_requests_v1',
  APPLICATIONS: 'soluciones_applications_v1',
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [vacancies, setVacancies] = useState<Vacancy[]>(INITIAL_VACANCIES);
  const [staffingRequests, setStaffingRequests] = useState<StaffingRequest[]>(INITIAL_STAFFING_REQUESTS);
  const [candidateApplications, setCandidateApplications] = useState<CandidateApplication[]>(INITIAL_CANDIDATE_APPLICATIONS);
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
              appliedAt: a.applied_at ? new Date(a.applied_at).toISOString().split('T')[0] : '2026-10-06',
              status: a.status,
              testScores: a.test_scores,
            }));
            setCandidateApplications(mappedApplications);
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

  // 1. Add Vacancy
  const addVacancy = async (vacancyInput: Omit<Vacancy, 'id' | 'postedAt'>): Promise<Vacancy> => {
    const today = new Date().toISOString().split('T')[0];
    const newId = `vac-${Date.now()}`;
    const newVacancy: Vacancy = {
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

  return (
    <DataContext.Provider
      value={{
        vacancies,
        staffingRequests,
        candidateApplications,
        isLoading,
        addVacancy,
        updateVacancy,
        deleteVacancy,
        addStaffingRequest,
        updateStaffingRequest,
        addCandidateApplication,
        updateCandidateApplication,
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
