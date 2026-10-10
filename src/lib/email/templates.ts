// HTML email templates. Kept framework-free so they can be rendered from any Route Handler.

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const layout = (title: string, body: string): string => `<!doctype html>
<html lang="es">
  <body style="margin:0;padding:0;background:#f1f5f9;font-family:Arial,Helvetica,sans-serif;color:#0f172a;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;border:1px solid #e2e8f0;">
            <tr>
              <td style="background:#1e3a8a;border-radius:16px 16px 0 0;padding:20px 28px;color:#ffffff;font-size:16px;font-weight:bold;">
                Soluciones Empresariales
              </td>
            </tr>
            <tr>
              <td style="padding:28px;">
                <h1 style="margin:0 0 16px;font-size:22px;line-height:1.3;">${escapeHtml(title)}</h1>
                ${body}
              </td>
            </tr>
            <tr>
              <td style="padding:16px 28px;border-top:1px solid #e2e8f0;color:#64748b;font-size:12px;">
                Chalatenango Sur, El Salvador · contacto@solucionesempresariales.sv
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

const codeBlock = (label: string, code: string): string => `
  <div style="margin:20px 0;padding:16px;border-radius:12px;background:#eff6ff;border:1px solid #bfdbfe;text-align:center;">
    <div style="font-size:11px;font-weight:bold;color:#64748b;text-transform:uppercase;letter-spacing:1px;">${escapeHtml(label)}</div>
    <div style="font-size:26px;font-weight:bold;color:#1d4ed8;letter-spacing:4px;margin-top:4px;">${escapeHtml(code)}</div>
  </div>`;

const button = (href: string, text: string): string => `
  <p style="margin:24px 0;text-align:center;">
    <a href="${escapeHtml(href)}" style="display:inline-block;padding:12px 24px;border-radius:10px;background:#1d4ed8;color:#ffffff;font-weight:bold;text-decoration:none;">
      ${escapeHtml(text)}
    </a>
  </p>`;

export interface EmailContent {
  subject: string;
  html: string;
}

export const applicationReceivedEmail = (params: {
  fullName: string;
  vacancyTitle: string;
  trackingCode: string;
  trackingUrl: string;
}): EmailContent => ({
  subject: `Recibimos tu postulación · Código ${params.trackingCode}`,
  html: layout(
    `¡Gracias por postularte, ${params.fullName.split(' ')[0]}!`,
    `<p style="margin:0 0 12px;font-size:14px;line-height:1.6;">
       Recibimos tu postulación para la plaza <strong>${escapeHtml(params.vacancyTitle)}</strong>.
       Nuestro equipo de Talento Humano se pondrá en contacto contigo en 1 a 2 días hábiles.
     </p>
     ${codeBlock('Tu código de seguimiento', params.trackingCode)}
     <p style="margin:0;font-size:14px;line-height:1.6;">Con este código puedes ver en qué etapa del proceso vas en cualquier momento.</p>
     ${button(params.trackingUrl, 'Ver mi proceso')}`
  ),
});

export const companyApprovedEmail = (params: {
  companyName: string;
  contactName: string;
  accessCode: string;
  portalUrl: string;
}): EmailContent => ({
  subject: `Acceso al Portal de Empresas · ${params.companyName}`,
  html: layout(
    `Bienvenido, ${params.contactName}`,
    `<p style="margin:0 0 12px;font-size:14px;line-height:1.6;">
       Aprobamos el registro de <strong>${escapeHtml(params.companyName)}</strong>. Desde el Portal de Empresas podrá ver
       cuántos postulantes tiene cada una de sus plazas y en qué etapa del proceso va cada uno.
     </p>
     ${codeBlock('Su código de acceso', params.accessCode)}
     <p style="margin:0;font-size:13px;line-height:1.6;color:#475569;">Guarde este código: es la llave de acceso a la información de su empresa.</p>
     ${button(params.portalUrl, 'Entrar al Portal de Empresas')}`
  ),
});
