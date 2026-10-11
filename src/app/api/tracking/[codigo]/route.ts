import { getServerSupabase } from '@/lib/supabaseServer';
import { normalizeCode, TRACKING_CODE_PATTERN } from '@/lib/codes';
import { toPublicApplication, toPublicRequest } from '@/lib/tracking';
import { CandidateApplication, StaffingRequest } from '@/types';

const toDate = (value: string | null) => (value ? new Date(value).toISOString().split('T')[0] : '');

// Returns only the public projection of an application or staffing request for a tracking code.
export async function GET(_request: Request, ctx: RouteContext<'/api/tracking/[codigo]'>) {
  const { codigo } = await ctx.params;
  const code = normalizeCode(codigo);
  if (!TRACKING_CODE_PATTERN.test(code)) {
    return Response.json({ error: 'invalid-code' }, { status: 400 });
  }

  const db = getServerSupabase();
  if (!db) {
    return Response.json({ error: 'no-database' }, { status: 503 });
  }

  if (code.startsWith('APP-')) {
    const { data } = await db
      .from('candidate_applications')
      .select('tracking_code, full_name, vacancy_title, status, applied_at, availability')
      .eq('tracking_code', code)
      .maybeSingle();
    if (data) {
      return Response.json(
        toPublicApplication({
          trackingCode: data.tracking_code,
          fullName: data.full_name,
          vacancyTitle: data.vacancy_title,
          status: data.status,
          appliedAt: toDate(data.applied_at),
          availability: data.availability ?? undefined,
        } as CandidateApplication)
      );
    }
  } else {
    const { data } = await db
      .from('staffing_requests')
      .select('tracking_code, company_name, position_title, number_of_positions, status, submitted_at')
      .eq('tracking_code', code)
      .maybeSingle();
    if (data) {
      return Response.json(
        toPublicRequest({
          trackingCode: data.tracking_code,
          companyName: data.company_name,
          positionTitle: data.position_title,
          numberOfPositions: data.number_of_positions,
          status: data.status,
          submittedAt: toDate(data.submitted_at),
        } as StaffingRequest)
      );
    }
  }

  return Response.json({ error: 'not-found' }, { status: 404 });
}
