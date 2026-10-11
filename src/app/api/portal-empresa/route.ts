import { getServerSupabase } from '@/lib/supabaseServer';
import { ACCESS_CODE_PATTERN, normalizeCode } from '@/lib/codes';
import { buildCompanyPortalView } from '@/lib/companyPortal';
import { CandidateApplication, Vacancy } from '@/types';

const toDate = (value: string | null) => (value ? new Date(value).toISOString().split('T')[0] : '');

// Validates a company access code and returns its anonymized portal view.
// Filtering happens here, on the server, so personal data never reaches the company's browser.
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const accessCode = normalizeCode(typeof body?.accessCode === 'string' ? body.accessCode : '');
  if (!ACCESS_CODE_PATTERN.test(accessCode)) {
    return Response.json({ error: 'invalid-code' }, { status: 401 });
  }

  const db = getServerSupabase();
  if (!db) {
    return Response.json({ error: 'no-database' }, { status: 503 });
  }

  const { data: company } = await db
    .from('client_companies')
    .select('id, name, status')
    .eq('access_code', accessCode)
    .maybeSingle();
  if (!company || company.status !== 'Aprobada') {
    return Response.json({ error: 'invalid-code' }, { status: 401 });
  }

  const { data: vacRows } = await db
    .from('vacancies')
    .select('id, title, is_active, posted_at, company_id')
    .eq('company_id', company.id)
    .order('posted_at', { ascending: false });
  const vacancies = (vacRows ?? []).map(
    (v) =>
      ({
        id: v.id,
        title: v.title,
        isActive: v.is_active ?? true,
        postedAt: toDate(v.posted_at),
        companyId: v.company_id,
      }) as Vacancy
  );

  const vacancyIds = vacancies.map((v) => v.id);
  const { data: appRows } = vacancyIds.length
    ? await db
        .from('candidate_applications')
        .select('vacancy_id, full_name, email, phone, availability, status, applied_at')
        .in('vacancy_id', vacancyIds)
    : { data: [] };
  const applications = (appRows ?? []).map(
    (a) =>
      ({
        vacancyId: a.vacancy_id,
        fullName: a.full_name,
        email: a.email,
        phone: a.phone,
        availability: a.availability ?? undefined,
        status: a.status,
        appliedAt: toDate(a.applied_at),
      }) as CandidateApplication
  );

  return Response.json(buildCompanyPortalView(company, vacancies, applications));
}
