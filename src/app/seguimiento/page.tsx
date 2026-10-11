'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { normalizeCode, TRACKING_CODE_PATTERN } from '@/lib/codes';
import { Search, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function SeguimientoPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const code = normalizeCode(searchQuery);
    if (!TRACKING_CODE_PATTERN.test(code)) {
      setError('Ingrese un código válido, por ejemplo APP-7K3QXM o REQ-4F8T2P.');
      return;
    }
    router.push(`/seguimiento/${code}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver a la Página Principal</span>
            </Link>
          </div>

          <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-emerald-900 text-white rounded-3xl p-8 lg:p-12 mb-10 shadow-xl text-center">
            <span className="px-3.5 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-bold uppercase tracking-wider inline-block mb-3">
              Portal de Consulta en Tiempo Real
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Seguimiento de Estado de Postulación y Solicitud
            </h1>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mt-2">
              Ingrese el <strong className="text-emerald-400 font-bold">Código de Rastreo</strong> que le enviamos por correo
              (ej. APP-7K3QXM o REQ-4F8T2P) para ver el progreso de su proceso.
            </p>

            <form onSubmit={handleSearch} className="mt-8 max-w-lg mx-auto flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  aria-label="Código de rastreo"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setError('');
                  }}
                  placeholder="Ej. APP-7K3QXM"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-semibold shadow-md uppercase"
                />
              </div>
              <button
                type="submit"
                className="py-3 px-6 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-extrabold text-sm shadow-md transition-colors"
              >
                Consultar Estado
              </button>
            </form>
            {error && <p className="text-sm text-amber-300 font-semibold mt-3">{error}</p>}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
