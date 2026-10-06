'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import { Briefcase, Building2, Users, CheckCircle2, Clock, Plus, ArrowRight, ShieldCheck, Database } from 'lucide-react';
import { isSupabaseConfigured } from '@/lib/supabase';

export default function AdminDashboardPage() {
  const { isAdmin } = useAuth();
  const { vacancies, staffingRequests, candidateApplications, isLoading } = useData();
  const router = useRouter();

  useEffect(() => {
    if (!isAdmin) {
      router.push('/admin/login');
    }
  }, [isAdmin, router]);

  if (!isAdmin) return null;

  const urgentVacanciesCount = vacancies.filter((v) => v.isUrgent).length;
  const pendingRequestsCount = staffingRequests.filter((r) => r.status.includes('Pendiente')).length;
  const activeApplicationsCount = candidateApplications.filter((a) => a.status !== 'Contratación y Firma').length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <AdminHeader />

      <main className="flex-1 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-emerald-900 text-white p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="px-3 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-bold uppercase tracking-wider">
                  Panel Operativo Central
                </span>
                {isSupabaseConfigured ? (
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                    <Database className="w-3 h-3 text-emerald-400" />
                    Supabase Cloud Conectado
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-[10px] font-bold uppercase tracking-wider">
                    Persistencia Local (Fallback)
                  </span>
                )}
              </div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight">
                Bienvenido al Panel de Control de Soluciones Empresariales
              </h1>
              <p className="text-slate-300 text-sm leading-relaxed">
                Gestión en tiempo real de vacantes activas, requerimientos de empresas clientes y postulaciones de candidatos en El Salvador.
              </p>
            </div>

            <div className="shrink-0 flex flex-wrap items-center gap-3">
              <Link
                href="/admin/vacantes"
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Crear Nueva Vacante</span>
              </Link>
            </div>
          </div>

          {/* KPI Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            
            {/* Card 1: Vacantes */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Bolsa de Empleo</span>
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                  <Briefcase className="w-5 h-5" />
                </div>
              </div>
              <div>
                <span className="text-3xl font-extrabold text-slate-900">{vacancies.length}</span>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  {urgentVacanciesCount} marcadas como <strong className="text-amber-600">Urgentes</strong>
                </p>
              </div>
              <Link
                href="/admin/vacantes"
                className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1 pt-2 border-t border-slate-100"
              >
                <span>Administrar Vacantes</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Card 2: Solicitudes de Empresas */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Solicitudes Empresas</span>
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <Building2 className="w-5 h-5" />
                </div>
              </div>
              <div>
                <span className="text-3xl font-extrabold text-slate-900">{staffingRequests.length}</span>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  {pendingRequestsCount} pendientes por <strong className="text-emerald-700">SLA 24-48 hrs</strong>
                </p>
              </div>
              <Link
                href="/admin/solicitudes"
                className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 pt-2 border-t border-slate-100"
              >
                <span>Ver Solicitudes de Clientes</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Card 3: Postulaciones de Candidatos */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Candidatos</span>
                <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
              </div>
              <div>
                <span className="text-3xl font-extrabold text-slate-900">{candidateApplications.length}</span>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  {activeApplicationsCount} en evaluación activa
                </p>
              </div>
              <Link
                href="/admin/candidatos"
                className="text-xs font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1 pt-2 border-t border-slate-100"
              >
                <span>Evaluar Candidatos</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Card 4: Cumplimiento SLA */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Garantía SLA</span>
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
              </div>
              <div>
                <span className="text-3xl font-extrabold text-emerald-700">100%</span>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  Respuesta en menos de 48 hrs hábiles
                </p>
              </div>
              <div className="text-xs text-slate-400 pt-2 border-t border-slate-100 font-medium">
                Estándar Operativo Garantizado
              </div>
            </div>

          </div>

          {/* Quick Action Navigation Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <Link
              href="/admin/vacantes"
              className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all group space-y-3"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-blue-700 transition-colors">
                Gestión de Vacantes de Empleo
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Crear nuevas oportunidades laborales, editar requerimientos salariales, activar o cerrar plazas publicadas en la bolsa de trabajo.
              </p>
              <div className="text-xs font-bold text-blue-700 flex items-center gap-1 pt-2">
                <span>Ingresar al módulo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/admin/solicitudes"
              className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-emerald-400 hover:shadow-md transition-all group space-y-3"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors">
                Solicitudes de Empresas Clientes
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Revisar peticiones de staffing, cambiar estados de atención SLA y **convertir solicitudes directas en vacantes públicas** con 1 clic.
              </p>
              <div className="text-xs font-bold text-emerald-700 flex items-center gap-1 pt-2">
                <span>Ingresar al módulo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/admin/candidatos"
              className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-purple-400 hover:shadow-md transition-all group space-y-3"
            >
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-purple-700 transition-colors">
                Evaluaciones & Pipeline de Candidatos
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Revisar postulantes por plaza, registrar notas de pruebas técnicas y psicométricas y avanzar expedientes en las 7 etapas del proceso.
              </p>
              <div className="text-xs font-bold text-purple-700 flex items-center gap-1 pt-2">
                <span>Ingresar al módulo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

          </div>

          {/* Recent Corporate Requests Section */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">Solicitudes Recientes de Empresas</h3>
                <p className="text-xs text-slate-500">Últimas requerimientos ingresados por empresas clientes</p>
              </div>
              <Link href="/admin/solicitudes" className="text-xs font-bold text-blue-700 hover:underline">
                Ver Todas
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {staffingRequests.slice(0, 4).map((req) => (
                <div key={req.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">{req.trackingCode}</span>
                    <h4 className="font-extrabold text-slate-900 text-sm">{req.companyName}</h4>
                    <p className="text-xs text-slate-600">Puesto: <strong className="text-slate-900">{req.positionTitle}</strong> ({req.numberOfPositions} plazas)</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200">
                      {req.status}
                    </span>
                    <Link
                      href="/admin/solicitudes"
                      className="text-xs font-semibold text-slate-600 hover:text-blue-700 underline"
                    >
                      Gestionar
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
