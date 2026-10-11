'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { clearCompanySession, useCompanyPortal, useCompanySession } from '@/hooks/useCompanyPortal';
import { PortalVacancy } from '@/lib/companyPortal';
import { PIPELINE_STEPS } from '@/lib/tracking';
import { Briefcase, LogOut, Lock, Mail, Phone, RefreshCw, UserCheck, Users } from 'lucide-react';

const VacancyCard: React.FC<{ vacancy: PortalVacancy }> = ({ vacancy }) => {
  const hired = vacancy.applicants.filter((a) => a.hired);

  return (
    <article className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      <header className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900">{vacancy.title}</h2>
          <p className="text-xs text-slate-500">Publicada: {vacancy.postedAt}</p>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${
              vacancy.isActive
                ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                : 'bg-slate-100 text-slate-600 border-slate-200'
            }`}
          >
            {vacancy.isActive ? 'Recibiendo postulaciones' : 'Cerrada'}
          </span>
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-800 border border-blue-200 flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            {vacancy.totalApplicants} postulantes
          </span>
        </div>
      </header>

      <div className="p-5 space-y-5">
        {/* Funnel: how many people are in each stage */}
        <div>
          <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Postulantes por etapa</h3>
          <ol className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {PIPELINE_STEPS.map((stage, idx) => {
              const count = vacancy.byStage[stage] ?? 0;
              return (
                <li
                  key={stage}
                  className={`p-2.5 rounded-xl border text-center ${
                    count > 0 ? 'bg-blue-50 border-blue-200' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <span className={`block text-xl font-black ${count > 0 ? 'text-blue-800' : 'text-slate-400'}`}>
                    {count}
                  </span>
                  <span className="block text-[10px] leading-tight font-semibold text-slate-600 mt-0.5">
                    {idx + 1}. {stage}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Anonymous list */}
        {vacancy.applicants.length > 0 ? (
          <div>
            <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Detalle por postulante</h3>
            <ul className="divide-y divide-slate-100 border border-slate-200 rounded-xl">
              {vacancy.applicants.map((applicant) => (
                <li key={applicant.label} className="px-4 py-2.5 flex items-center justify-between gap-3 text-sm">
                  <span className="font-bold text-slate-800">{applicant.label}</span>
                  <span className="text-xs text-slate-500 hidden sm:inline">Postuló: {applicant.appliedAt}</span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                      applicant.hired
                        ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                        : 'bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    {applicant.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-sm text-slate-500">Todavía no hay postulantes para esta plaza.</p>
        )}

        {/* Hired candidates: the only place where personal data appears */}
        {hired.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
              <UserCheck className="w-4 h-4" />
              Candidatos contratados
            </h3>
            {hired.map((applicant) => (
              <div key={applicant.label} className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-sm space-y-1">
                <p className="font-extrabold text-slate-900">{applicant.hired!.fullName}</p>
                <p className="text-slate-700 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-emerald-700" /> {applicant.hired!.email}
                </p>
                <p className="text-slate-700 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-700" /> {applicant.hired!.phone}
                </p>
                {applicant.hired!.availability && (
                  <p className="text-xs text-slate-600">Disponibilidad para iniciar: {applicant.hired!.availability}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </article>
  );
};

export default function PortalEmpresaPanelPage() {
  const router = useRouter();
  const accessCode = useCompanySession();
  const { state, refresh } = useCompanyPortal(accessCode ?? null);

  useEffect(() => {
    // `undefined` = still rendering on the server; `null` = no session on this device
    if (accessCode === null) router.replace('/portal-empresa');
  }, [accessCode, router]);

  useEffect(() => {
    // Code was regenerated or the company was deactivated
    if (accessCode && state.status === 'invalid') {
      clearCompanySession();
      router.replace('/portal-empresa');
    }
  }, [accessCode, state.status, router]);

  const handleLogout = () => {
    clearCompanySession();
    router.push('/portal-empresa');
  };

  const view = state.status === 'ok' ? state.view : null;
  const totals = view
    ? {
        vacancies: view.vacancies.length,
        applicants: view.vacancies.reduce((sum, v) => sum + v.totalApplicants, 0),
        hired: view.vacancies.reduce((sum, v) => sum + v.applicants.filter((a) => a.hired).length, 0),
      }
    : null;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {!view || !totals ? (
            <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center text-sm text-slate-500 font-semibold">
              Cargando su portal...
            </div>
          ) : (
            <>
              <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-emerald-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-300">Portal de Empresas</span>
                    <h1 className="text-2xl sm:text-3xl font-extrabold mt-1">{view.companyName}</h1>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={refresh}
                      className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      Actualizar
                    </button>
                    <button
                      onClick={handleLogout}
                      className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Salir
                    </button>
                  </div>
                </div>

                <dl className="grid grid-cols-3 gap-3 mt-6">
                  {[
                    { label: 'Plazas', value: totals.vacancies },
                    { label: 'Postulantes', value: totals.applicants },
                    { label: 'Contratados', value: totals.hired },
                  ].map((item) => (
                    <div key={item.label} className="rounded-2xl bg-white/10 p-4">
                      <dt className="text-xs font-semibold text-blue-100">{item.label}</dt>
                      <dd className="text-3xl font-black text-white">{item.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs text-slate-600 flex gap-2">
                <Lock className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span>
                  Nosotros gestionamos el reclutamiento completo. Por confidencialidad, los datos personales de cada candidato se
                  comparten con su empresa cuando el proceso llega a <strong>Contratación y Firma</strong>.
                </span>
              </div>

              {view.vacancies.length === 0 ? (
                <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-2">
                  <Briefcase className="w-8 h-8 text-slate-400 mx-auto" />
                  <p className="text-slate-800 font-bold">Aún no hay plazas asignadas a su empresa.</p>
                  <p className="text-xs text-slate-500">Cuando publiquemos sus vacantes, aquí verá el avance de cada una.</p>
                </div>
              ) : (
                view.vacancies.map((vacancy) => <VacancyCard key={vacancy.id} vacancy={vacancy} />)
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
