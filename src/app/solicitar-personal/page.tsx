'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { StaffingRequestForm } from '@/components/enterprise/StaffingRequestForm';
import { INITIAL_STAFFING_REQUESTS } from '@/data/mockData';
import { StaffingRequest } from '@/types';
import { Building2, Clock, ShieldCheck, Zap, ArrowLeft, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function SolicitarPersonalPage() {
  const [requests, setRequests] = useState<StaffingRequest[]>(INITIAL_STAFFING_REQUESTS);

  const handleAddRequest = (newReq: Omit<StaffingRequest, 'id' | 'submittedAt' | 'status'>) => {
    const created: StaffingRequest = {
      ...newReq,
      id: `req-${Date.now()}`,
      submittedAt: new Date().toISOString().split('T')[0],
      status: 'Pendiente (1-2 días)',
    };
    setRequests([created, ...requests]);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb / Back Link */}
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver a la Página Principal</span>
            </Link>
          </div>

          {/* Page Banner */}
          <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-slate-900 text-white rounded-3xl p-8 lg:p-12 mb-12 shadow-xl relative overflow-hidden">
            <div className="max-w-3xl relative z-10 space-y-4">
              <span className="px-3.5 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-bold uppercase tracking-wider">
                Portal Corporativo de Staffing
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                Contrata el Talento Idóneo sin Sobrecarga Operativa ni de RRHH
              </h1>
              <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-normal">
                Complete el siguiente formulario oficial para solicitar personal calificado. Nuestro equipo inicia la evaluación y búsqueda inmediata con garantía de respuesta en <strong className="text-emerald-400 font-bold">1 a 2 días hábiles</strong>.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-700/60">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Respuesta en 24-48 hrs</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Incorporación ~24 días</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>100% Control y Liderazgo</span>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Request Form Component */}
          <StaffingRequestForm onAddRequest={handleAddRequest} />

          {/* Recent Submissions Track Record */}
          <div className="mt-12 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-xl font-extrabold text-slate-900 mb-4 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-blue-700" />
              Solicitudes Recientes en Gestión
            </h3>
            <div className="divide-y divide-slate-100">
              {requests.map((req) => (
                <div key={req.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-slate-900 text-base">{req.positionTitle}</span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200">
                        {req.requestType}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 font-medium">
                      {req.companyName} • Solicitado por: {req.contactName} ({req.numberOfPositions} plazas)
                    </p>
                  </div>
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      {req.status}
                    </span>
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
