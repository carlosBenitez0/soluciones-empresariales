'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import Link from 'next/link';
import {
  Briefcase,
  Building2,
  Users,
  CheckCircle2,
  Clock,
  Plus,
  ArrowRight,
  ShieldCheck,
  Database,
  TrendingUp,
  FileSpreadsheet,
  Zap,
  Award,
  ChevronRight,
  UserCheck,
} from 'lucide-react';
import { isSupabaseConfigured } from '@/lib/supabase';

export default function AdminDashboardPage() {
  const { isAdmin } = useAuth();
  const { vacancies, staffingRequests, candidateApplications } = useData();
  const router = useRouter();

  useEffect(() => {
    if (!isAdmin) {
      router.push('/admin/login');
    }
  }, [isAdmin, router]);

  if (!isAdmin) return null;

  const urgentVacanciesCount = vacancies.filter((v) => v.isUrgent).length;
  const pendingRequests = staffingRequests.filter((r) => r.status.includes('Pendiente'));
  const activeApplications = candidateApplications.filter((a) => a.status !== 'Contratación y Firma');

  // Category statistics breakdown
  const categoriesMap: Record<string, number> = {};
  vacancies.forEach((v) => {
    categoriesMap[v.category] = (categoriesMap[v.category] || 0) + 1;
  });

  return (
    <div className="space-y-8 pb-10">
      
      {/* Welcome & System Status Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-[11px] font-bold uppercase tracking-wider">
              Panel Ejecutivo Principal
            </span>
            {isSupabaseConfigured ? (
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                <Database className="w-3 h-3 text-emerald-400" />
                Base de Datos Supabase Conectada
              </span>
            ) : (
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-[10px] font-bold uppercase tracking-wider">
                Modo Evaluación Local
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Gestión Operativa de Reclutamiento & Staffing
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Control central de vacantes laborales, solicitudes de personal outsourcing B2B y avance de candidatos en El Salvador.
          </p>
        </div>

        <div className="shrink-0 flex flex-wrap items-center gap-3">
          <Link
            href="/admin/reportes"
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold backdrop-blur-md border border-white/20 transition-all flex items-center gap-2"
          >
            <FileSpreadsheet className="w-4 h-4 text-blue-400" />
            <span>Exportar PDF</span>
          </Link>
          <Link
            href="/admin/vacantes"
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Crear Vacante</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* KPI 1: Vacantes */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Bolsa de Empleo</span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <Briefcase className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900">{vacancies.length}</span>
              <span className="text-xs font-semibold text-emerald-600 flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" /> +15%
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-1">
              {urgentVacanciesCount} clasificadas como <strong className="text-amber-600">Urgentes</strong>
            </p>
          </div>
          <Link
            href="/admin/vacantes"
            className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1 pt-2 border-t border-slate-100"
          >
            <span>Gestionar Plazas</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* KPI 2: Solicitudes B2B */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Solicitudes B2B</span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900">{staffingRequests.length}</span>
              {pendingRequests.length > 0 && (
                <span className="text-xs font-extrabold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                  {pendingRequests.length} Pendientes
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Requerimientos de empresas clientes
            </p>
          </div>
          <Link
            href="/admin/solicitudes"
            className="text-xs font-bold text-amber-700 hover:text-amber-900 flex items-center gap-1 pt-2 border-t border-slate-100"
          >
            <span>Revisar Requerimientos</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* KPI 3: Postulantes */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Candidatos Activos</span>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900">{candidateApplications.length}</span>
              <span className="text-xs font-semibold text-indigo-600">7 Etapas</span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-1">
              {activeApplications.length} postulantes en proceso activo
            </p>
          </div>
          <Link
            href="/admin/candidatos"
            className="text-xs font-bold text-indigo-700 hover:text-indigo-900 flex items-center gap-1 pt-2 border-t border-slate-100"
          >
            <span>Ver Pipeline Reclutamiento</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* KPI 4: Tiempos */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Promedio Contratación</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900">14 Días</span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Tiempo medio desde postulación a contratación
            </p>
          </div>
          <div className="text-xs font-bold text-emerald-700 flex items-center gap-1 pt-2 border-t border-slate-100">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Optimizador de Tiempos Activo</span>
          </div>
        </div>

      </div>

      {/* Analytics & Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Category Breakdown (2 Cols) */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 space-y-5 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <span>Distribución de Plazas por Categoría</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Demanda de personal en el mercado de El Salvador</p>
            </div>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
              {Object.keys(categoriesMap).length} Sectores
            </span>
          </div>

          <div className="space-y-4">
            {Object.entries(categoriesMap).map(([category, count]) => {
              const percentage = Math.round((count / (vacancies.length || 1)) * 100);
              return (
                <div key={category} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-extrabold text-slate-800">{category}</span>
                    <span className="font-semibold text-slate-500">{count} vacantes ({percentage}%)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.max(percentage, 15)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recruitment Funnel Widget (1 Col) */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 space-y-5 shadow-xl border border-slate-800 flex flex-col justify-between">
          <div>
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-[10px] font-bold uppercase tracking-wider">
              Embudo de Selección
            </span>
            <h3 className="text-lg font-extrabold text-white mt-2">Pipeline de 7 Etapas</h3>
            <p className="text-slate-400 text-xs mt-1">Efectividad del proceso de filtros psicométricos y entrevistas.</p>
          </div>

          <div className="space-y-3 my-2">
            <div className="flex items-center justify-between text-xs py-1 border-b border-slate-800">
              <span className="text-slate-300">1. Recepción y CV</span>
              <span className="font-mono text-emerald-400 font-bold">100%</span>
            </div>
            <div className="flex items-center justify-between text-xs py-1 border-b border-slate-800">
              <span className="text-slate-300">2. Filtro Telefónico</span>
              <span className="font-mono text-emerald-400 font-bold">82%</span>
            </div>
            <div className="flex items-center justify-between text-xs py-1 border-b border-slate-800">
              <span className="text-slate-300">3. Pruebas Técnicas</span>
              <span className="font-mono text-emerald-400 font-bold">64%</span>
            </div>
            <div className="flex items-center justify-between text-xs py-1 border-b border-slate-800">
              <span className="text-slate-300">4. Pruebas Psicológicas</span>
              <span className="font-mono text-indigo-400 font-bold">48%</span>
            </div>
            <div className="flex items-center justify-between text-xs py-1 border-b border-slate-800">
              <span className="text-slate-300">5. Entrevista Cliente</span>
              <span className="font-mono text-indigo-400 font-bold">30%</span>
            </div>
            <div className="flex items-center justify-between text-xs py-1">
              <span className="text-slate-300">6. Contratación Final</span>
              <span className="font-mono text-amber-400 font-bold">18%</span>
            </div>
          </div>

          <Link
            href="/admin/candidatos"
            className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold text-center block transition-colors shadow-md"
          >
            Evaluar Candidatos Activos
          </Link>
        </div>

      </div>

      {/* Recent Candidate Applications Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-blue-600" />
              <span>Últimas Postulaciones Recibidas</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">Candidatos evaluados recientemente en el sistema</p>
          </div>
          <Link
            href="/admin/candidatos"
            className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            <span>Ver Todo el Pipeline</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-left border-collapse text-xs">
            <thead className="bg-slate-900 text-white font-bold">
              <tr>
                <th className="py-3 px-4">Código</th>
                <th className="py-3 px-4">Nombre del Candidato</th>
                <th className="py-3 px-4">Puesto Aplicado</th>
                <th className="py-3 px-4">Experiencia</th>
                <th className="py-3 px-4">Aspiración Salarial</th>
                <th className="py-3 px-4">Estado Actual</th>
                <th className="py-3 px-4 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              {candidateApplications.slice(0, 5).map((app) => (
                <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-slate-900">{app.trackingCode}</td>
                  <td className="py-3 px-4">
                    <p className="font-extrabold text-slate-900">{app.fullName}</p>
                    <p className="text-[11px] text-slate-400">{app.email}</p>
                  </td>
                  <td className="py-3 px-4 font-semibold text-blue-700">{app.vacancyTitle}</td>
                  <td className="py-3 px-4 font-medium">{app.experienceYears} años</td>
                  <td className="py-3 px-4 font-mono font-bold text-emerald-700">${app.expectedSalary}</td>
                  <td className="py-3 px-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 inline-block">
                      {app.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Link
                      href="/admin/candidatos"
                      className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-blue-600 text-white font-bold text-[11px] transition-colors inline-block"
                    >
                      Evaluar
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
