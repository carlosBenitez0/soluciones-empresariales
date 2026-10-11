// Optional write-through to Supabase. Every function is a no-op when Supabase is not configured,
// so the store keeps working purely on localStorage (current demo mode).
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import {
  Vacancy,
  StaffingRequest,
  CandidateApplication,
  Category,
  ClientCompany,
  CONFIDENTIAL_COMPANY_NAME,
} from '../types';

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const db = () => (isSupabaseConfigured && supabase ? supabase : null);

const toDate = (value: string | null | undefined, fallback = '2026-10-06') =>
  value ? new Date(value).toISOString().split('T')[0] : fallback;

const logError = (action: string) => (err: unknown) => console.error(`Error ${action} in Supabase:`, err);

export interface Collections {
  vacancies: Vacancy[];
  staffingRequests: StaffingRequest[];
  candidateApplications: CandidateApplication[];
  categories: Category[];
  clientCompanies: ClientCompany[];
}

/** Reads every table. Only non-empty results are returned, so local data is kept for empty tables. */
export const loadFromSupabase = async (): Promise<Partial<Collections>> => {
  const client = db();
  if (!client) return {};
  const result: Partial<Collections> = {};

  try {
    const { data: vacData } = await client.from('vacancies').select('*').order('posted_at', { ascending: false });
    if (vacData && vacData.length > 0) {
      result.vacancies = vacData.map((v) => ({
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
        postedAt: toDate(v.posted_at),
        isUrgent: v.is_urgent ?? false,
        isActive: v.is_active ?? true,
        companyId: v.company_id ?? undefined,
        isConfidential: v.company === CONFIDENTIAL_COMPANY_NAME,
      }));
    }

    const { data: reqData } = await client.from('staffing_requests').select('*').order('submitted_at', { ascending: false });
    if (reqData && reqData.length > 0) {
      result.staffingRequests = reqData.map((r) => ({
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
        submittedAt: toDate(r.submitted_at),
        status: r.status,
      }));
    }

    const { data: appData } = await client.from('candidate_applications').select('*').order('applied_at', { ascending: false });
    if (appData && appData.length > 0) {
      result.candidateApplications = appData.map((a) => ({
        id: a.id,
        trackingCode: a.tracking_code,
        vacancyId: a.vacancy_id ?? undefined,
        vacancyTitle: a.vacancy_title,
        fullName: a.full_name,
        email: a.email,
        phone: a.phone,
        experienceYears: a.experience_years,
        expectedSalary: Number(a.expected_salary),
        availability: a.availability ?? undefined,
        appliedAt: toDate(a.applied_at),
        status: a.status,
        testScores: a.test_scores,
      }));
    }

    const { data: compData } = await client.from('client_companies').select('*').order('created_at', { ascending: false });
    if (compData && compData.length > 0) {
      result.clientCompanies = compData.map((c) => ({
        id: c.id,
        name: c.name,
        contactName: c.contact_name,
        email: c.email,
        phone: c.phone,
        status: c.status,
        accessCode: c.access_code ?? undefined,
        createdAt: toDate(c.created_at, ''),
      }));
    }

    const { data: catData } = await client.from('categories').select('*').order('name', { ascending: true });
    if (catData && catData.length > 0) {
      result.categories = catData.map((c) => ({ id: c.id, name: c.name, isActive: c.is_active ?? true }));
    }
  } catch (err) {
    console.error('Error loading data from Supabase:', err);
  }

  return result;
};

// ---- Vacancies ----

/** Returns the database id of the inserted row, if any. */
export const insertVacancy = async (input: Omit<Vacancy, 'id' | 'postedAt'>): Promise<string | undefined> => {
  const client = db();
  if (!client) return undefined;
  try {
    const { data, error } = await client
      .from('vacancies')
      .insert([
        {
          title: input.title,
          company: input.company || CONFIDENTIAL_COMPANY_NAME,
          category: input.category,
          location: input.location,
          work_mode: input.workMode,
          salary_range: input.salaryRange,
          description: input.description,
          requirements: input.requirements,
          responsibilities: input.responsibilities,
          benefits: input.benefits,
          is_urgent: input.isUrgent,
          is_active: input.isActive ?? true,
          company_id: input.companyId ?? null,
        },
      ])
      .select()
      .single();
    return data && !error ? data.id : undefined;
  } catch (err) {
    logError('inserting vacancy')(err);
    return undefined;
  }
};

export const updateVacancyRow = async (id: string, updates: Partial<Vacancy>) => {
  const client = db();
  if (!client) return;
  const payload: Record<string, unknown> = {};
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
  await client.from('vacancies').update(payload).eq('id', id).then(undefined, logError('updating vacancy'));
};

export const deleteVacancyRow = async (id: string) => {
  const client = db();
  if (!client) return;
  await client.from('vacancies').delete().eq('id', id).then(undefined, logError('deleting vacancy'));
};

// ---- Staffing requests ----

export const insertStaffingRequest = async (req: StaffingRequest): Promise<string | undefined> => {
  const client = db();
  if (!client) return undefined;
  try {
    const { data } = await client
      .from('staffing_requests')
      .insert([
        {
          tracking_code: req.trackingCode,
          company_name: req.companyName,
          contact_name: req.contactName,
          email: req.email,
          phone: req.phone,
          request_type: req.requestType,
          position_title: req.positionTitle,
          category: req.category,
          number_of_positions: req.numberOfPositions,
          salary_budget: req.salaryBudget,
          key_requirements: req.keyRequirements,
          urgent: req.urgent,
          status: req.status,
        },
      ])
      .select()
      .single();
    return data?.id;
  } catch (err) {
    logError('inserting staffing request')(err);
    return undefined;
  }
};

export const updateStaffingRequestRow = async (id: string, updates: Partial<StaffingRequest>) => {
  const client = db();
  if (!client) return;
  const payload: Record<string, unknown> = {};
  if (updates.status) payload.status = updates.status;
  await client.from('staffing_requests').update(payload).eq('id', id).then(undefined, logError('updating staffing request'));
};

// ---- Candidate applications ----

export const insertCandidateApplication = async (app: CandidateApplication): Promise<string | undefined> => {
  const client = db();
  if (!client) return undefined;
  try {
    const { data } = await client
      .from('candidate_applications')
      .insert([
        {
          tracking_code: app.trackingCode,
          // Demo vacancies use ids like "vac-1"; only real rows can be referenced
          vacancy_id: app.vacancyId && UUID_PATTERN.test(app.vacancyId) ? app.vacancyId : null,
          vacancy_title: app.vacancyTitle,
          full_name: app.fullName,
          email: app.email,
          phone: app.phone,
          experience_years: app.experienceYears,
          expected_salary: app.expectedSalary,
          availability: app.availability ?? null,
          status: app.status,
        },
      ])
      .select()
      .single();
    return data?.id;
  } catch (err) {
    logError('inserting candidate application')(err);
    return undefined;
  }
};

export const updateCandidateApplicationRow = async (id: string, updates: Partial<CandidateApplication>) => {
  const client = db();
  if (!client) return;
  const payload: Record<string, unknown> = {};
  if (updates.status) payload.status = updates.status;
  if (updates.testScores) payload.test_scores = updates.testScores;
  await client
    .from('candidate_applications')
    .update(payload)
    .eq('id', id)
    .then(undefined, logError('updating candidate application'));
};

// ---- Categories ----

export const insertCategory = async (name: string): Promise<string | undefined> => {
  const client = db();
  if (!client) return undefined;
  try {
    const { data } = await client.from('categories').insert([{ name, is_active: true }]).select().single();
    return data?.id;
  } catch (err) {
    logError('inserting category')(err);
    return undefined;
  }
};

export const updateCategoryRow = async (id: string, updates: { name?: string; isActive?: boolean }, oldName?: string) => {
  const client = db();
  if (!client) return;
  try {
    const payload: Record<string, string | boolean> = {};
    if (updates.name) payload.name = updates.name;
    if (typeof updates.isActive === 'boolean') payload.is_active = updates.isActive;
    await client.from('categories').update(payload).eq('id', id);
    if (updates.name && oldName && updates.name !== oldName) {
      await client.from('vacancies').update({ category: updates.name }).eq('category', oldName);
    }
  } catch (err) {
    logError('updating category')(err);
  }
};

export const deleteCategoryRow = async (id: string) => {
  const client = db();
  if (!client) return;
  await client.from('categories').delete().eq('id', id).then(undefined, logError('deleting category'));
};

// ---- Client companies ----

export const insertClientCompany = async (
  input: Pick<ClientCompany, 'name' | 'contactName' | 'email' | 'phone'>
): Promise<string | undefined> => {
  const client = db();
  if (!client) return undefined;
  try {
    const { data } = await client
      .from('client_companies')
      .insert([{ name: input.name, contact_name: input.contactName, email: input.email, phone: input.phone, status: 'Pendiente' }])
      .select()
      .single();
    return data?.id;
  } catch (err) {
    logError('inserting client company')(err);
    return undefined;
  }
};

export const updateClientCompanyRow = async (id: string, updates: Partial<Omit<ClientCompany, 'id' | 'createdAt'>>) => {
  const client = db();
  if (!client) return;
  try {
    const payload: Record<string, string | null> = {};
    if (updates.name) payload.name = updates.name;
    if (updates.contactName) payload.contact_name = updates.contactName;
    if (updates.email) payload.email = updates.email;
    if (updates.phone) payload.phone = updates.phone;
    if (updates.status) payload.status = updates.status;
    if ('accessCode' in updates) payload.access_code = updates.accessCode ?? null;
    await client.from('client_companies').update(payload).eq('id', id);
    if (updates.name) {
      await client
        .from('vacancies')
        .update({ company: updates.name })
        .eq('company_id', id)
        .neq('company', CONFIDENTIAL_COMPANY_NAME);
    }
  } catch (err) {
    logError('updating client company')(err);
  }
};

export const deleteClientCompanyRow = async (id: string) => {
  const client = db();
  if (!client) return;
  await client.from('client_companies').delete().eq('id', id).then(undefined, logError('deleting client company'));
};
