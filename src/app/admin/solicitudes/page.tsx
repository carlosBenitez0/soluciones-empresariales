'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { Footer } from '@/components/layout/Footer';
import { StaffingRequest, StaffingRequestStatus } from '@/types';
import { Building2, Search, ArrowLeft, Clock, Sparkles, CheckCircle2, ArrowRight, ExternalLink, Plus } from 'lucide-react';
import Link from 'next/link';

export default function AdminSolicitudesPage() {
  const { isAdmin } = useAuth();
  const { staffingRequests, updateStaffingRequest, addVacancy } = useData();
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('Todos');
  const [convertingRequest, setConvertingRequest] = useState<StaffingRequest | null>(null);

  useEffect(() => {
    if (!isAdmin) {
      router.push('/admin/login');
    }
  }, [isAdmin, router]);

  if (!isAdmin) return null;

  const statuses = [
    'Todos',
    'Pendiente (1-2 días)',
    'En Revisión',
    'Candidatos Presentados',
    'Completada',
    'Cancelada',
  ];

  const filteredRequests = staffingRequests.filter((req) => {
    const matchesSearch = req.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          req.positionTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          req.trackingCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          req.contactName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'Todos' || req.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = async (id: string, newStatus: string) => {
    await updateStaffingRequest(id, { status: newStatus as StaffingRequestStatus });
  };

  // Convert Staffing Request to Public Vacancy with 1 Click
  const handleConvertToVacancy = async (req: StaffingRequest) => {
    if (confirm(`¿Desea publicar la solicitud "${req.positionTitle}" de ${req.companyName} como vacante pública en la bolsa de trabajo?`)) {
      const newVac = await addVacancy({
        title: req.positionTitle,
        company: req.companyName,
        category: req.category,
        location: 'Chalatenango Sur / El Salvador',
        workMode: 'Presencial',
        salaryRange: req.salaryBudget,
        description: `Búsqueda ejecutiva para ${req.companyName}. Puesto: ${req.positionTitle}. Requisitos clave: ${req.keyRequirements}`,
        requirements: [req.keyRequirements, 'Disponibilidad inmediata', 'Experiencia en posiciones similares'],
        responsibilities: ['Gestión operativa de la plaza', 'Cumplimiento de objetivos del área'],
        benefits: ['Prestaciones completas de ley desde el primer día', 'Estabilidad laboral'],
        isUrgent: req.urgent,
      });

      await updateStaffingRequest(req.id, { status: 'Candidatos Presentados' });
      alert(`¡Vacante "${newVac.title}" creada y publicada con éxito en /vacantes!`);
      router.push('/admin/vacantes');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <AdminHeader />

      <main className="flex-1 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          {/* Breadcrumb Link */}
          <div>
            <Link href="/admin" className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 hover:underline">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Volver al Dashboard Principal</span>
            </Link>
          </div>

          {/* Header Bar */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900">Solicitudes de Empresas Clientes</h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Atención operativa SLA (1-2 días), seguimiento de clientes corporativos y publicación de vacantes.
              </p>
            </div>
            <div className="px-3.5 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-extrabold flex items-center gap-1.5 w-fit">
              <Clock className="w-4 h-4 text-emerald-700" />
              <span>Garantía SLA 24-48 hrs</span>
            </div>
          </div>

          {/* Search & Status Filters */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col md:flex-row gap-3 shadow-xs">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por código (ej. REQ-8810), empresa, contacto o puesto..."
                className="w-full pl-9 pr-4 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-blue-600 font-medium"
              />
            </div>

            <div className="flex items-center gap-2">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="py-2 px-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold focus:outline-none"
              >
                {statuses.map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Requests List Grid */}
          <div className="space-y-4">
            {filteredRequests.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 text-slate-500 font-medium">
                No se encontraron solicitudes registradas con los criterios seleccionados.
              </div>
            ) : (
              filteredRequests.map((req) => (
                <div key={req.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 hover:border-blue-300 transition-all">
                  
                  {/* Top Bar Info */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">{req.trackingCode}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-bold">
                            {req.requestType}
                          </span>
                          {req.urgent && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold border border-amber-300">
                              Urgente
                            </span>
                          )}
                        </div>
                        <h3 className="text-lg font-extrabold text-slate-900 mt-0.5">{req.companyName}</h3>
                      </div>
                    </div>

                    {/* Status Changer */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-500">Estado SLA:</span>
                      <select
                        value={req.status}
                        onChange={(e) => handleStatusChange(req.id, e.target.value)}
                        className="py-1.5 px-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs font-extrabold focus:outline-none cursor-pointer"
                      >
                        <option value="Pendiente (1-2 días)">Pendiente (1-2 días)</option>
                        <option value="En Revisión">En Revisión</option>
                        <option value="Candidatos Presentados">Candidatos Presentados</option>
                        <option value="Completada">Completada</option>
                        <option value="Cancelada">Cancelada</option>
                      </select>
                    </div>
                  </div>

                  {/* Request Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-1">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Contacto Ejecutivo</span>
                      <p className="font-extrabold text-slate-900">{req.contactName}</p>
                      <p className="text-slate-600">{req.email} • {req.phone}</p>
                    </div>

                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-1">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Detalles de la Plaza</span>
                      <p className="font-extrabold text-blue-900">{req.positionTitle} ({req.numberOfPositions} plazas)</p>
                      <p className="text-slate-600">Presupuesto: {req.salaryBudget}</p>
                    </div>

                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-1">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Requisitos Clave</span>
                      <p className="text-slate-700 line-clamp-2">{req.keyRequirements}</p>
                    </div>
                  </div>

                  {/* Convert to Public Vacancy Action */}
                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">Ingresado el: {req.submittedAt}</span>

                    <button
                      onClick={() => handleConvertToVacancy(req)}
                      className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs shadow-xs transition-colors flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Convertir en Vacante Pública (Bolsa de Empleo)</span>
                    </button>
                  </div>

                </div>
              ))
            )}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
