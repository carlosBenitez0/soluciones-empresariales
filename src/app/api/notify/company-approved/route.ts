import { companyApprovedEmail } from '@/lib/email/templates';
import { sendEmail, siteUrl } from '@/lib/email/send';
import { cleanEmail, cleanString } from '@/lib/email/validate';
import { normalizeCode } from '@/lib/codes';
import { getServerSupabase } from '@/lib/supabaseServer';

// Sends an approved company its access code to the Portal de Empresas.
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  let recipient: { email: string; companyName: string; contactName: string; accessCode: string } | null = null;
  const db = getServerSupabase();

  if (db) {
    // Real database: only send the stored code to the stored email of an approved company.
    const companyId = cleanString(body?.companyId, 64);
    if (companyId) {
      const { data } = await db
        .from('client_companies')
        .select('email, name, contact_name, access_code, status')
        .eq('id', companyId)
        .maybeSingle();
      if (data && data.status === 'Aprobada' && data.access_code) {
        recipient = { email: data.email, companyName: data.name, contactName: data.contact_name, accessCode: data.access_code };
      }
    }
  } else {
    // Demo mode (localStorage): the company only exists in the browser, so use the payload.
    const email = cleanEmail(body?.email);
    const companyName = cleanString(body?.companyName);
    const contactName = cleanString(body?.contactName);
    const accessCode = normalizeCode(cleanString(body?.accessCode, 20) ?? '');
    if (email && companyName && contactName && /^EMP-[A-Z0-9]{4,10}$/.test(accessCode)) {
      recipient = { email, companyName, contactName, accessCode };
    }
  }

  if (!recipient) {
    return Response.json({ sent: false, reason: 'not-found' }, { status: 404 });
  }

  const result = await sendEmail(
    recipient.email,
    companyApprovedEmail({ ...recipient, portalUrl: `${siteUrl(request)}/portal-empresa` })
  );
  return Response.json(result);
}
