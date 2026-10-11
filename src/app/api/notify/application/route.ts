import { applicationReceivedEmail } from '@/lib/email/templates';
import { sendEmail, siteUrl } from '@/lib/email/send';
import { cleanEmail, cleanString } from '@/lib/email/validate';
import { normalizeCode } from '@/lib/codes';
import { getServerSupabase } from '@/lib/supabaseServer';

// Sends the applicant their tracking code and a link to /seguimiento/<code>.
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const trackingCode = normalizeCode(cleanString(body?.trackingCode, 20) ?? '');
  if (!/^APP-[A-Z0-9]{4,10}$/.test(trackingCode)) {
    return Response.json({ sent: false, reason: 'invalid-code' }, { status: 400 });
  }

  let recipient: { email: string; fullName: string; vacancyTitle: string } | null = null;
  const db = getServerSupabase();

  if (db) {
    // Real database: never trust the payload, read the recipient from the stored application.
    const { data } = await db
      .from('candidate_applications')
      .select('email, full_name, vacancy_title')
      .eq('tracking_code', trackingCode)
      .maybeSingle();
    if (data) recipient = { email: data.email, fullName: data.full_name, vacancyTitle: data.vacancy_title };
  } else {
    // Demo mode (localStorage): the application only exists in the browser, so use the payload.
    const email = cleanEmail(body?.email);
    const fullName = cleanString(body?.fullName);
    const vacancyTitle = cleanString(body?.vacancyTitle);
    if (email && fullName && vacancyTitle) recipient = { email, fullName, vacancyTitle };
  }

  if (!recipient) {
    return Response.json({ sent: false, reason: 'not-found' }, { status: 404 });
  }

  const result = await sendEmail(
    recipient.email,
    applicationReceivedEmail({
      ...recipient,
      trackingCode,
      trackingUrl: `${siteUrl(request)}/seguimiento/${trackingCode}`,
    })
  );
  return Response.json(result);
}
