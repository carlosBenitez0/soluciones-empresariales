import {
  AVAILABILITY_OPTIONS,
  CandidateApplication,
  Category,
  ClientCompany,
  ClientCompanyStatus,
  CONFIDENTIAL_COMPANY_NAME,
  PipelineStage,
  StaffingRequest,
  StaffingRequestStatus,
  Vacancy,
  WorkMode,
} from '../../types';
import { PIPELINE_STEPS } from '../../lib/tracking';
import type { Collections } from '../../store/supabaseSync';
import { addDays, createRng, daysBetween, Rng, seededCode, SEED_REFERENCE_DATE, slugify } from './rng';
import {
  BENEFITS_POOL,
  CATEGORY_DEFS,
  CONTACT_TITLES_F,
  CONTACT_TITLES_M,
  EMAIL_DOMAINS,
  FIRST_NAMES_F,
  FIRST_NAMES_M,
  JOB_TEMPLATES,
  JobTemplate,
  LAST_NAMES,
  MUNICIPALITIES,
  REQUEST_REQUIREMENTS,
  SEED_COMPANIES,
  TEST_NOTES,
} from './catalogs';
import { LEGACY_CANDIDATE_APPLICATIONS, LEGACY_STAFFING_REQUESTS, LEGACY_VACANCIES } from './legacy';

export const DEMO_ACCESS_CODE = 'EMP-DEMO26';

/** Target sizes (besides the hand-written legacy records). */
export const SEED_SIZES = {
  generatedVacancies: 38,
  generatedApplications: 249,
  generatedRequests: 29,
};

const REF = SEED_REFERENCE_DATE;

// Which categories each company sector usually hires for
const SECTOR_CATEGORIES: Record<string, string[]> = {
  Agroindustria: ['Producción y Manufactura', 'Operaciones y Logística', 'Administración'],
  Comercio: ['Ventas y Atención al Cliente', 'Operaciones y Logística', 'Finanzas y Contabilidad'],
  Tecnología: ['Tecnología', 'Ventas y Atención al Cliente'],
  Agricultura: ['Operaciones y Logística', 'Producción y Manufactura', 'Administración'],
  Servicios: ['Ventas y Atención al Cliente', 'Administración', 'Recursos Humanos'],
  Salud: ['Salud y Enfermería', 'Administración'],
  Manufactura: ['Producción y Manufactura', 'Operaciones y Logística', 'Recursos Humanos'],
  Logística: ['Operaciones y Logística', 'Administración'],
  Alimentos: ['Producción y Manufactura', 'Ventas y Atención al Cliente', 'Operaciones y Logística'],
  Seguridad: ['Seguridad y Vigilancia'],
  Finanzas: ['Finanzas y Contabilidad', 'Ventas y Atención al Cliente'],
  Turismo: ['Ventas y Atención al Cliente', 'Administración'],
};

// Not registered yet: they only sent a staffing request
const PROSPECT_COMPANIES = [
  { name: 'Constructora Los Volcanes S.A. de C.V.', domain: 'losvolcanes.com.sv' },
  { name: 'Restaurante El Comal Típico', domain: 'elcomal.com.sv' },
  { name: 'Academia de Idiomas Horizonte', domain: 'horizonte.edu.sv' },
  { name: 'Agencia de Viajes Mundo Maya', domain: 'mundomaya.travel' },
];

const formatUsd = (n: number) => `$${n.toLocaleString('en-US')}`;
const salaryRange = ([min, max]: [number, number]) => `${formatUsd(min)} - ${formatUsd(max)} USD`;
const parseSalaryRange = (range: string): [number, number] => {
  const nums = (range.match(/[\d,]+/g) ?? []).map((n) => Number(n.replace(/,/g, '')));
  return [nums[0] ?? 500, nums[1] ?? nums[0] ?? 700];
};
const roundTo = (n: number, step: number) => Math.round(n / step) * step;

const personName = (rng: Rng) => {
  const female = rng.chance(0.55);
  const first = rng.pick(female ? FIRST_NAMES_F : FIRST_NAMES_M);
  return { female, first, last1: rng.pick(LAST_NAMES), last2: rng.pick(LAST_NAMES) };
};

const salvadoranMobile = (rng: Rng) => `+503 ${rng.pick(['7', '6'])}${rng.int(100, 999)}-${rng.int(1000, 9999)}`;
const salvadoranLandline = (rng: Rng) => `+503 2${rng.int(100, 999)}-${rng.int(1000, 9999)}`;

// ---------------------------------------------------------------------------------------------

const buildCategories = (): Category[] =>
  CATEGORY_DEFS.map((c, idx) => ({ id: `cat-${idx + 1}`, name: c.name, isActive: c.isActive }));

const buildCompanies = (rng: Rng): (ClientCompany & { sector: string; city: string; domain: string })[] => {
  const usedCodes = new Set<string>([DEMO_ACCESS_CODE]);
  return SEED_COMPANIES.map((def, idx) => {
    // 12 approved, 1 deactivated, 2 waiting for approval
    const status: ClientCompanyStatus = idx < 12 ? 'Aprobada' : idx === 12 ? 'Inactiva' : 'Pendiente';
    let accessCode: string | undefined;
    if (def.demo) accessCode = DEMO_ACCESS_CODE;
    else if (status !== 'Pendiente') {
      do accessCode = seededCode(rng, 'EMP');
      while (usedCodes.has(accessCode));
      usedCodes.add(accessCode);
    }
    const contact = personName(rng);
    const isElNorte = def.name === 'Comercializadora El Norte S.A.';
    return {
      id: `emp-${String(idx + 1).padStart(2, '0')}`,
      name: def.name,
      contactName: isElNorte
        ? 'Carlos Rivera'
        : `${rng.pick(contact.female ? CONTACT_TITLES_F : CONTACT_TITLES_M)} ${contact.first.split(' ')[0]} ${contact.last1}`,
      email: isElNorte ? 'crivera@elnorte.sv' : `rrhh@${def.domain}`,
      phone: salvadoranLandline(rng),
      status,
      accessCode,
      createdAt: status === 'Pendiente' ? addDays(REF, -rng.int(1, 5)) : addDays(REF, -rng.int(95, 150)),
      sector: def.sector,
      city: def.city,
      domain: def.domain,
    };
  });
};

const buildVacancies = (
  rng: Rng,
  companies: ReturnType<typeof buildCompanies>,
  activeCategoryNames: Set<string>
): { vacancies: Vacancy[]; salaryById: Map<string, [number, number]> } => {
  const salaryById = new Map<string, [number, number]>();
  const byName = new Map(companies.map((c) => [c.name, c]));
  const demo = companies.find((c) => c.accessCode === DEMO_ACCESS_CODE)!;

  // Hand-written vacancies: link them to their (now registered) companies; vac-1 is the demo company's
  const legacy = LEGACY_VACANCIES.map((v) => {
    const owner = v.id === 'vac-1' ? demo : byName.get(v.company);
    salaryById.set(v.id, parseSalaryRange(v.salaryRange));
    return { ...v, companyId: owner?.id, isConfidential: v.company === CONFIDENTIAL_COMPANY_NAME };
  });

  // Who gets the generated vacancies: demo 4, deactivated company 2 (closed), the rest round-robin
  const approved = companies.filter((c) => c.status === 'Aprobada' && c.id !== demo.id);
  const inactive = companies.filter((c) => c.status === 'Inactiva');
  const owners: typeof companies = [demo, demo, demo, demo, ...inactive.flatMap((c) => [c, c])];
  for (let i = 0; owners.length < SEED_SIZES.generatedVacancies; i++) owners.push(approved[i % approved.length]);

  const usedTitlesPerCompany = new Map<string, Set<string>>();
  const generated = owners.map((company, idx): Vacancy => {
    const categories = (SECTOR_CATEGORIES[company.sector] ?? ['Administración']).filter((c) => activeCategoryNames.has(c));
    const category = rng.pick(categories);
    const used = usedTitlesPerCompany.get(company.id) ?? new Set<string>();
    const options = JOB_TEMPLATES[category].filter((t) => !used.has(t.title));
    const template: JobTemplate = rng.pick(options.length ? options : JOB_TEMPLATES[category]);
    used.add(template.title);
    usedTitlesPerCompany.set(company.id, used);

    const isCompanyInactive = company.status === 'Inactiva';
    const age = isCompanyInactive ? rng.int(60, 90) : rng.int(1, 90);
    const isConfidential = rng.chance(0.2);
    const location = rng.chance(0.7) ? company.city : rng.pick(MUNICIPALITIES);
    const workMode = rng.pickWeighted<WorkMode>(['Presencial', 'Híbrido', 'Remoto'], [60, 25, 15]);
    const id = `vac-g${String(idx + 1).padStart(3, '0')}`;
    salaryById.set(id, template.salary);

    return {
      id,
      title: template.title,
      company: isConfidential ? CONFIDENTIAL_COMPANY_NAME : company.name,
      companyId: company.id,
      isConfidential,
      category,
      location,
      workMode: category === 'Tecnología' || workMode !== 'Remoto' ? workMode : 'Presencial',
      salaryRange: salaryRange(template.salary),
      description: `${template.summary} Plaza para ${
        isConfidential ? `importante empresa del sector ${company.sector.toLowerCase()}` : company.name
      } en ${location}.`,
      requirements: template.requirements,
      responsibilities: template.responsibilities,
      benefits: [BENEFITS_POOL[0], ...rng.sample(BENEFITS_POOL.slice(1), rng.int(2, 3))],
      postedAt: addDays(REF, -age),
      isUrgent: rng.chance(0.2),
      // Closed: every vacancy of a deactivated company, and some of the older ones
      isActive: isCompanyInactive ? false : !rng.chance(age > 45 ? 0.3 : 0.04),
    };
  });

  return { vacancies: [...legacy, ...generated], salaryById };
};

const buildApplications = (
  rng: Rng,
  vacancies: Vacancy[],
  salaryById: Map<string, [number, number]>
): CandidateApplication[] => {
  const usedNames = new Set(LEGACY_CANDIDATE_APPLICATIONS.map((a) => a.fullName));
  const usedEmails = new Set(LEGACY_CANDIDATE_APPLICATIONS.map((a) => a.email));
  const usedCodes = new Set(LEGACY_CANDIDATE_APPLICATIONS.map((a) => a.trackingCode));

  // Older and open vacancies receive more applicants
  const weights = vacancies.map((v) => (daysBetween(v.postedAt, REF) + 5) * (v.isActive === false ? 0.7 : 1));
  const stageWeights = [35, 18, 15, 12, 9, 6, 5];
  const availabilityWeights = [40, 30, 20, 10];

  const generated: CandidateApplication[] = [];
  for (let n = 1; n <= SEED_SIZES.generatedApplications; n++) {
    const vacancy = vacancies[rng.weightedIndex(weights)];
    const vacancyAge = daysBetween(vacancy.postedAt, REF);

    let name = personName(rng);
    let fullName = `${name.first} ${name.last1} ${name.last2}`;
    while (usedNames.has(fullName)) {
      name = personName(rng);
      fullName = `${name.first} ${name.last1} ${name.last2}`;
    }
    usedNames.add(fullName);

    let email = '';
    do email = `${slugify(name.first.split(' ')[0])}.${slugify(name.last1)}${rng.int(1, 99)}@${rng.pick(EMAIL_DOMAINS)}`;
    while (usedEmails.has(email));
    usedEmails.add(email);

    let trackingCode = '';
    do trackingCode = seededCode(rng, 'APP');
    while (usedCodes.has(trackingCode));
    usedCodes.add(trackingCode);

    const appliedAt = addDays(vacancy.postedAt, rng.int(0, Math.max(0, vacancyAge)));
    const daysSinceApplied = daysBetween(appliedAt, REF);

    // Funnel: most people are in early stages; nobody advances faster than ~3 days per stage,
    // and only vacancies older than a month can have someone hired already
    let stageIdx = Math.min(rng.weightedIndex(stageWeights), Math.floor(daysSinceApplied / 3));
    if (stageIdx === PIPELINE_STEPS.length - 1 && vacancyAge <= 30) stageIdx -= 1;
    const status: PipelineStage = PIPELINE_STEPS[stageIdx];

    const [min, max] = salaryById.get(vacancy.id) ?? [500, 700];
    const experienceYears = rng.pickWeighted([0, 1, 2, 3, 4, 5, 6, 8, 10, 12], [6, 12, 16, 16, 13, 11, 9, 8, 5, 4]);

    generated.push({
      id: `app-${String(n).padStart(4, '0')}`,
      trackingCode,
      vacancyId: vacancy.id,
      vacancyTitle: vacancy.title,
      fullName,
      email,
      phone: salvadoranMobile(rng),
      location: rng.pick(MUNICIPALITIES),
      experienceYears,
      expectedSalary: roundTo(rng.int(min - 50, max + 100), 25),
      availability: rng.pickWeighted(AVAILABILITY_OPTIONS, availabilityWeights),
      resumeFileName: `CV_${slugify(name.first.split(' ')[0], '_')}_${slugify(name.last1, '_')}.pdf`,
      appliedAt,
      status,
      // Evaluation results exist only from the testing stage on
      ...(stageIdx >= 3
        ? {
            testScores: {
              technicalScore: rng.int(62, 98),
              psychometricScore: rng.int(60, 97),
              testNotes: rng.pick(TEST_NOTES),
            },
          }
        : {}),
    });
  }

  return [...LEGACY_CANDIDATE_APPLICATIONS, ...generated];
};

const buildStaffingRequests = (rng: Rng, companies: ReturnType<typeof buildCompanies>, activeCategoryNames: Set<string>) => {
  const usedCodes = new Set(LEGACY_STAFFING_REQUESTS.map((r) => r.trackingCode));
  const statuses: StaffingRequestStatus[] = [
    'En Evaluación de Salario',
    'En Revisión',
    'Búsqueda de Candidatos',
    'Candidatos Presentados',
    'Completada',
    'Cancelada',
  ];

  const generated: StaffingRequest[] = [];
  for (let n = 1; n <= SEED_SIZES.generatedRequests; n++) {
    const registered = rng.chance(0.8) ? rng.pick(companies) : null;
    const prospect = rng.pick(PROSPECT_COMPANIES);
    const companyName = registered?.name ?? prospect.name;
    const sector = registered?.sector ?? 'Servicios';
    const category = rng.pick((SECTOR_CATEGORIES[sector] ?? ['Administración']).filter((c) => activeCategoryNames.has(c)));
    const template = rng.pick(JOB_TEMPLATES[category]);
    const contact = personName(rng);
    const age = rng.int(0, 60);

    let trackingCode = '';
    do trackingCode = seededCode(rng, 'REQ');
    while (usedCodes.has(trackingCode));
    usedCodes.add(trackingCode);

    const positions = rng.pickWeighted([1, 2, 3, 4, 5], [45, 25, 15, 10, 5]);
    generated.push({
      id: `req-g${String(n).padStart(3, '0')}`,
      trackingCode,
      companyName,
      contactName: registered?.contactName ?? `${contact.first.split(' ')[0]} ${contact.last1}`,
      email: registered?.email ?? `${slugify(contact.first.split(' ')[0])}.${slugify(contact.last1)}@${prospect.domain}`,
      phone: registered?.phone ?? salvadoranLandline(rng),
      requestType: rng.chance(0.7) ? 'Plaza Nueva' : 'Reemplazo',
      positionTitle: template.title,
      category,
      numberOfPositions: positions,
      salaryBudget: `${salaryRange(template.salary).replace(' USD', '')} USD${positions > 1 ? ' por plaza' : ''}`,
      keyRequirements: rng.pick(REQUEST_REQUIREMENTS),
      urgent: rng.chance(0.25),
      submittedAt: addDays(REF, -age),
      // Requests are answered within 1-2 days, so only the newest ones are still pending
      status: age <= 2 ? 'Pendiente (1-2 días)' : rng.pickWeighted(statuses, [3, 4, 7, 5, 6, 1]),
    });
  }

  return [...LEGACY_STAFFING_REQUESTS, ...generated];
};

const byDateDesc = <T>(key: (item: T) => string) => (a: T, b: T) => key(b).localeCompare(key(a));

/** Builds the full demo dataset. Deterministic: same seed, same data. */
export const generateSeed = (seed = 2026): Collections => {
  const rng = createRng(seed);
  const categories = buildCategories();
  const activeCategoryNames = new Set(categories.filter((c) => c.isActive).map((c) => c.name));

  const companiesWithMeta = buildCompanies(rng);
  const { vacancies, salaryById } = buildVacancies(rng, companiesWithMeta, activeCategoryNames);
  const candidateApplications = buildApplications(rng, vacancies, salaryById);
  const staffingRequests = buildStaffingRequests(rng, companiesWithMeta, activeCategoryNames);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const clientCompanies: ClientCompany[] = companiesWithMeta.map(({ sector, city, domain, ...company }) => company);

  return {
    categories,
    clientCompanies: clientCompanies.sort(byDateDesc((c) => c.createdAt)),
    vacancies: vacancies.sort(byDateDesc((v) => v.postedAt)),
    candidateApplications: candidateApplications.sort(byDateDesc((a) => a.appliedAt)),
    staffingRequests: staffingRequests.sort(byDateDesc((r) => r.submittedAt)),
  };
};
