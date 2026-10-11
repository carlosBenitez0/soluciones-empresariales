import { Resend } from 'resend';
import type { EmailContent } from './templates';

// Server-only: reads secret env vars. Import it only from Route Handlers.

export interface SendResult {
  sent: boolean;
  reason?: string;
}

export const sendEmail = async (to: string, content: EmailContent): Promise<SendResult> => {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;

  if (!apiKey || !from) {
    console.warn(`[email] RESEND_API_KEY/EMAIL_FROM not set; skipped "${content.subject}" to ${to}`);
    return { sent: false, reason: 'not-configured' };
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({ from, to, subject: content.subject, html: content.html });
  if (error) {
    console.error('[email] Resend error:', error);
    return { sent: false, reason: error.message };
  }
  return { sent: true };
};

/** Absolute base URL for links inside emails. */
export const siteUrl = (request: Request): string =>
  (process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin).replace(/\/$/, '');
