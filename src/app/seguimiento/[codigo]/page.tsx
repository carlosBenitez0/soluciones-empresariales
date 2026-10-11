'use client';

import React, { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PipelineTracker } from '@/components/tracking/PipelineTracker';
import { useData } from '@/context/DataContext';
import { isSupabaseConfigured } from '@/lib/supabase';
import { normalizeCode } from '@/lib/codes';
import { findTracking, PublicTracking } from '@/lib/tracking';
import { ArrowLeft, Clock, Search } from 'lucide-react';

type LoadState = { status: 'loading' } | { status: 'found'; tracking: PublicTracking } | { status: 'not-found' };

export default function SeguimientoCodigoPage({ params }: { params: Promise<{ codigo: string }> }) {
  const { codigo } = use(params);
  const code = normalizeCode(decodeURIComponent(codigo));
  const { candidateApplications, staffingRequests, isLoading } = useData();
  const [remote, setRemote] = useState<LoadState>({ status: 'loading' });

  // With a real database the lookup goes through the server, which only returns public fields
  useEffect(() => {
    if (!isSupabaseConfigured) return;
    let cancelled = false;
    fetch(`/api/tracking/${encodeURIComponent(code)}`)
      .then(async (res) => (res.ok ? ((await res.json()) as PublicTracking) : null))
      .catch(() => null)
      .then((tracking) => {
        if (!cancelled) setRemote(tracking ? { status: 'found', tracking } : { status: 'not-found' });
      });
    return () => {
      cancelled = true;
    };
  }, [code]);

  let state: LoadState;
  if (isSupabaseConfigured) {
    state = remote;
  } else if (isLoading) {
    state = { status: 'loading' };
  } else {
    const tracking = findTracking(code, candidateApplications, staffingRequests);
    state = tracking ? { status: 'found', tracking } : { status: 'not-found' };
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <Link
            href="/seguimiento"
            className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Consultar otro código</span>
          </Link>

          {state.status === 'loading' && (
            <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center text-sm text-slate-500 font-semibold">
              Buscando el código {code}...
            </div>
          )}

          {state.status === 'not-found' && (
            <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-3">
              <Search className="w-8 h-8 text-slate-400 mx-auto" />
              <p className="text-slate-800 text-base font-bold">No encontramos ningún proceso con el código {code}.</p>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Revise que el código esté escrito igual que en el correo que le enviamos (ej. APP-7K3QXM).
              </p>
            </div>
          )}

          {state.status === 'found' && state.tracking.kind === 'application' && (
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-md space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
                <div>
                  <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                    Código: {state.tracking.trackingCode}
                  </span>
                  <h1 className="text-2xl font-extrabold text-slate-900 mt-1">Hola, {state.tracking.firstName}</h1>
                  <p className="text-sm text-slate-600 font-medium">
                    Postulación para: <strong className="text-slate-900">{state.tracking.vacancyTitle}</strong>
                  </p>
                </div>
                <div className="sm:text-right">
                  <span className="px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300 inline-block">
                    {state.tracking.status}
                  </span>
                  <p className="text-xs text-slate-500 mt-1">Postulado el: {state.tracking.appliedAt}</p>
                  {state.tracking.availability && (
                    <p className="text-xs text-slate-500">Disponibilidad: {state.tracking.availability}</p>
                  )}
                </div>
              </div>

              <div>
                <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-4">
                  Progreso de tu proceso de selección
                </h2>
                <PipelineTracker status={state.tracking.status} />
              </div>

              <p className="text-xs text-slate-500">
                Te contactaremos por teléfono o correo antes de cada entrevista o prueba. Puedes volver a esta página cuando quieras con el mismo enlace.
              </p>
            </div>
          )}

          {state.status === 'found' && state.tracking.kind === 'request' && (
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-md space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
                <div>
                  <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                    Código: {state.tracking.trackingCode}
                  </span>
                  <h1 className="text-2xl font-extrabold text-slate-900 mt-1">{state.tracking.companyName}</h1>
                  <p className="text-sm text-slate-600 font-medium">
                    Solicitud: <strong className="text-slate-900">{state.tracking.positionTitle}</strong> (
                    {state.tracking.numberOfPositions} plazas)
                  </p>
                </div>
                <div className="sm:text-right">
                  <span className="px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-blue-100 text-blue-800 border border-blue-300 inline-block">
                    {state.tracking.status}
                  </span>
                  <p className="text-xs text-slate-500 mt-1">Registrado el: {state.tracking.submittedAt}</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-950 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-sm">
                  <Clock className="w-4 h-4 text-blue-700" />
                  <span>Compromiso SLA de Respuesta: 24 a 48 horas hábiles</span>
                </div>
                <p className="text-slate-700">
                  Un especialista de Soluciones Empresariales está revisando los perfiles idóneos para su vacante de{' '}
                  {state.tracking.positionTitle}.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
