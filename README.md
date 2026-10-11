This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Variables de entorno

Crear `.env.local` (no se versiona) con:

| Variable | Dónde | Uso |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | cliente y servidor | URL del proyecto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | cliente y servidor | Llave pública (anon). Sin ella la app usa `localStorage` (modo demo) |
| `SUPABASE_SERVICE_ROLE_KEY` | solo servidor | Usada por las rutas `/api/*` para leer datos privados. Nunca con prefijo `NEXT_PUBLIC_` |
| `RESEND_API_KEY` | solo servidor | Envío de correos con [Resend](https://resend.com). Sin ella los correos se omiten (se registra un aviso) |
| `EMAIL_FROM` | solo servidor | Remitente, con dominio verificado en Resend. Ej. `Soluciones Empresariales <notificaciones@tudominio.com>` |
| `NEXT_PUBLIC_SITE_URL` | cliente y servidor | URL pública para los enlaces de los correos (sin `/` final) |

### Base de datos

- Instalación nueva: ejecutar `supabase/schema.sql` (o `supabase/seed.sql` con datos de ejemplo) y luego `supabase/migration_v2.sql`.
- Base existente: ejecutar solo `supabase/migration_v2.sql` (es idempotente).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
