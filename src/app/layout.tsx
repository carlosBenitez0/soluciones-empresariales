import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Soluciones Empresariales | Servicios de Staffing & Talento Humano",
  description: "Agencia especializada en dotación de personal (Staff Augmentation) en El Salvador. Conectamos empresas en crecimiento con talento calificado.",
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png' },
      { url: '/logos/se-isotipo-no-bg.png', type: 'image/png' },
    ],
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased scroll-smooth">
      <body className={`${inter.className} min-h-full flex flex-col bg-slate-50 text-slate-900`}>
        {children}
      </body>
    </html>
  );
}
