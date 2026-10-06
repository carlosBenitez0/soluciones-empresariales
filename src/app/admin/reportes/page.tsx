'use client';

import React, { useState } from 'react';
import { useData } from '@/context/DataContext';
import {
  generateExecutiveReportPDF,
  generateVacanciesReportPDF,
  generateStaffingRequestsReportPDF,
  generateCandidatesReportPDF,
} from '@/lib/pdfReportGenerator';
import {
  FileSpreadsheet,
  Download,
  CheckCircle2,
  Briefcase,
  Building2,
  Users,
  Sparkles,
  Filter,
  FileText,
  Clock,
  Printer,
  ShieldCheck,
} from 'lucide-react';

export default function AdminReportsPage() {
  const { vacancies, staffingRequests, candidateApplications, isLoading } = useData();
  const [selectedReport, setSelectedReport] = useState<'executive' | 'vacancies' | 'requests' | 'candidates'>('executive');
  const [generatedByName, setGeneratedByName] = useState('Lic. Carlos Benítez - Director RH');
  const [isGenerating, setIsGenerating] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleGeneratePDF = () => {
    setIsGenerating(true);
    setSuccessMessage(null);

    setTimeout(() => {
      try {
        if (selectedReport === 'executive') {
          generateExecutiveReportPDF({
            vacancies,
            staffingRequests,
            candidateApplications,
            generatedBy: generatedByName,
          });
          setSuccessMessage('¡Informe Ejecutivo Completo generado y descargado correctamente!');
        } else if (selectedReport === 'vacancies') {
          generateVacanciesReportPDF(vacancies, generatedByName);
          setSuccessMessage('¡Reporte de Vacantes Laborales descargado en formato PDF!');
        } else if (selectedReport === 'requests') {
          generateStaffingRequestsReportPDF(staffingRequests, generatedByName);
          setSuccessMessage('¡Reporte de Solicitudes Corporativas B2B descargado!');
        } else if (selectedReport === 'candidates') {
          generateCandidatesReportPDF(candidateApplications, generatedByName);
          setSuccessMessage('¡Reporte de Pipeline de Reclutamiento descargado!');
        }
      } catch (err) {
        console.error('Error al generar PDF:', err);
      } finally {
        setIsGenerating(false);
      }
    }, 400);
  };

  return (
    <div className="space-y-8 pb-10">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            Módulo de Exportación & Documentos Oficiales
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Centro de Reportes Ejecutivos en PDF
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Genera e imprime informes gerenciales de selección, métricas corporativas y matrices de candidatos listos para auditorías, clientes o juntas directivas.
          </p>
        </div>

        <div className="shrink-0 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 text-center min-w-[180px]">
          <span className="text-xs text-slate-300 uppercase tracking-wider font-semibold block">Total Documentos</span>
          <span className="text-3xl font-black text-white mt-1 block">4 Tipos</span>
          <span className="text-[11px] text-emerald-300 font-medium block mt-1">Formato PDF Vectorial</span>
        </div>
      </div>

      {/* Success Notification Alert */}
      {successMessage && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 p-4 rounded-2xl flex items-center gap-3 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="text-xs sm:text-sm font-bold">{successMessage}</span>
        </div>
      )}

      {/* Grid Selection */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        {/* Option 1: Executive */}
        <button
          type="button"
          onClick={() => setSelectedReport('executive')}
          className={`p-5 rounded-2xl border text-left transition-all relative overflow-hidden ${
            selectedReport === 'executive'
              ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-600/25 ring-2 ring-blue-600/30'
              : 'bg-white text-slate-800 border-slate-200 hover:border-blue-400 hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`p-2.5 rounded-xl ${selectedReport === 'executive' ? 'bg-white/20 text-white' : 'bg-blue-50 text-blue-600'}`}>
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            {selectedReport === 'executive' && (
              <span className="px-2 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-extrabold uppercase">Seleccionado</span>
            )}
          </div>
          <h3 className="font-extrabold text-sm mb-1">Informe Ejecutivo Consolidado</h3>
          <p className={`text-xs leading-relaxed ${selectedReport === 'executive' ? 'text-blue-100' : 'text-slate-500'}`}>
            Resumen global de KPIs, bolsa de empleos, clientes corporativos y tasa de efectividad.
          </p>
        </button>

        {/* Option 2: Vacancies */}
        <button
          type="button"
          onClick={() => setSelectedReport('vacancies')}
          className={`p-5 rounded-2xl border text-left transition-all relative overflow-hidden ${
            selectedReport === 'vacancies'
              ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-600/25 ring-2 ring-blue-600/30'
              : 'bg-white text-slate-800 border-slate-200 hover:border-blue-400 hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`p-2.5 rounded-xl ${selectedReport === 'vacancies' ? 'bg-white/20 text-white' : 'bg-blue-50 text-blue-600'}`}>
              <Briefcase className="w-5 h-5" />
            </div>
            {selectedReport === 'vacancies' && (
              <span className="px-2 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-extrabold uppercase">Seleccionado</span>
            )}
          </div>
          <h3 className="font-extrabold text-sm mb-1">Bolsa de Vacantes Activas</h3>
          <p className={`text-xs leading-relaxed ${selectedReport === 'vacancies' ? 'text-blue-100' : 'text-slate-500'}`}>
            Listado completo de plazas abiertas, presupuestos salariales y nivel de urgencia.
          </p>
        </button>

        {/* Option 3: Requests */}
        <button
          type="button"
          onClick={() => setSelectedReport('requests')}
          className={`p-5 rounded-2xl border text-left transition-all relative overflow-hidden ${
            selectedReport === 'requests'
              ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-600/25 ring-2 ring-blue-600/30'
              : 'bg-white text-slate-800 border-slate-200 hover:border-blue-400 hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`p-2.5 rounded-xl ${selectedReport === 'requests' ? 'bg-white/20 text-white' : 'bg-blue-50 text-blue-600'}`}>
              <Building2 className="w-5 h-5" />
            </div>
            {selectedReport === 'requests' && (
              <span className="px-2 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-extrabold uppercase">Seleccionado</span>
            )}
          </div>
          <h3 className="font-extrabold text-sm mb-1">Solicitudes B2B de Clientes</h3>
          <p className={`text-xs leading-relaxed ${selectedReport === 'requests' ? 'text-blue-100' : 'text-slate-500'}`}>
            Registro de requerimientos de empresas clientes, plazas contratadas y estado de atención.
          </p>
        </button>

        {/* Option 4: Candidates */}
        <button
          type="button"
          onClick={() => setSelectedReport('candidates')}
          className={`p-5 rounded-2xl border text-left transition-all relative overflow-hidden ${
            selectedReport === 'candidates'
              ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-600/25 ring-2 ring-blue-600/30'
              : 'bg-white text-slate-800 border-slate-200 hover:border-blue-400 hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`p-2.5 rounded-xl ${selectedReport === 'candidates' ? 'bg-white/20 text-white' : 'bg-blue-50 text-blue-600'}`}>
              <Users className="w-5 h-5" />
            </div>
            {selectedReport === 'candidates' && (
              <span className="px-2 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-extrabold uppercase">Seleccionado</span>
            )}
          </div>
          <h3 className="font-extrabold text-sm mb-1">Pipeline de Reclutamiento</h3>
          <p className={`text-xs leading-relaxed ${selectedReport === 'candidates' ? 'text-blue-100' : 'text-slate-500'}`}>
            Matriz de postulantes, avance en las 7 etapas de evaluación y puntuaciones.
          </p>
        </button>

      </div>

      {/* Main Configuration Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <span>Configuración del Documento PDF</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Personaliza los membretes y firmas que aparecerán impresos en el encabezado oficial.
            </p>
          </div>

          <button
            type="button"
            onClick={handleGeneratePDF}
            disabled={isGenerating}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-xs shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Generando PDF...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Descargar Reporte en PDF</span>
              </>
            )}
          </button>
        </div>

        {/* Form Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Emitido / Generado por (Firma Autorizada)
            </label>
            <input
              type="text"
              value={generatedByName}
              onChange={(e) => setGeneratedByName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs font-semibold text-slate-900 bg-slate-50/50"
              placeholder="Ej: Lic. Carlos Benítez - Director RH"
            />
            <span className="text-[11px] text-slate-400 block">
              Este nombre se colocará en la esquina superior derecha de cada hoja del reporte.
            </span>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Encabezado del Documento
            </label>
            <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-700 font-mono">
              SOLUCIONES EMPRESARIALES SV &bull; MEMBRETE OFICIAL CONFIDENCIAL
            </div>
          </div>
        </div>

        {/* Data Preview Snapshot Table */}
        <div className="space-y-3 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Vista Previa de Registros a Incluir ({selectedReport === 'executive' ? 'Global' : selectedReport === 'vacancies' ? vacancies.length : selectedReport === 'requests' ? staffingRequests.length : candidateApplications.length} filas)</span>
            </h3>
            <span className="text-[11px] text-slate-400">Paginación automática habilitada</span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-slate-50/50 max-h-72">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-slate-900 text-white font-bold sticky top-0">
                <tr>
                  <th className="py-2.5 px-4">Identificador / Registro</th>
                  <th className="py-2.5 px-4">Entidad / Empresa / Candidato</th>
                  <th className="py-2.5 px-4">Detalle Principal</th>
                  <th className="py-2.5 px-4 text-right">Estado / Condición</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                {selectedReport === 'vacancies' &&
                  vacancies.slice(0, 6).map((v) => (
                    <tr key={v.id} className="hover:bg-white">
                      <td className="py-2.5 px-4 font-bold text-blue-700">{v.title}</td>
                      <td className="py-2.5 px-4">{v.company}</td>
                      <td className="py-2.5 px-4 text-slate-500">{v.category} &bull; {v.salaryRange}</td>
                      <td className="py-2.5 px-4 text-right">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${v.isUrgent ? 'bg-amber-100 text-amber-800' : 'bg-slate-200 text-slate-700'}`}>
                          {v.isUrgent ? 'Urgente' : 'Activa'}
                        </span>
                      </td>
                    </tr>
                  ))}

                {selectedReport === 'requests' &&
                  staffingRequests.slice(0, 6).map((r) => (
                    <tr key={r.id} className="hover:bg-white">
                      <td className="py-2.5 px-4 font-mono text-slate-900 font-bold">{r.trackingCode}</td>
                      <td className="py-2.5 px-4 font-bold">{r.companyName}</td>
                      <td className="py-2.5 px-4 text-slate-500">{r.positionTitle} ({r.numberOfPositions} plaz.)</td>
                      <td className="py-2.5 px-4 text-right">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                          {r.status}
                        </span>
                      </td>
                    </tr>
                  ))}

                {selectedReport === 'candidates' &&
                  candidateApplications.slice(0, 6).map((c) => (
                    <tr key={c.id} className="hover:bg-white">
                      <td className="py-2.5 px-4 font-mono text-slate-900 font-bold">{c.trackingCode}</td>
                      <td className="py-2.5 px-4 font-bold">{c.fullName}</td>
                      <td className="py-2.5 px-4 text-slate-500">{c.vacancyTitle}</td>
                      <td className="py-2.5 px-4 text-right">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">
                          {c.status}
                        </span>
                      </td>
                    </tr>
                  ))}

                {selectedReport === 'executive' && (
                  <>
                    <tr className="hover:bg-white">
                      <td className="py-2.5 px-4 font-bold text-blue-700">Métricas Globales</td>
                      <td className="py-2.5 px-4">Soluciones Empresariales SV</td>
                      <td className="py-2.5 px-4 text-slate-500">{vacancies.length} Vacantes | {staffingRequests.length} Solicitudes B2B</td>
                      <td className="py-2.5 px-4 text-right font-bold text-emerald-600">88% Efectividad</td>
                    </tr>
                    {vacancies.slice(0, 4).map((v) => (
                      <tr key={v.id} className="hover:bg-white">
                        <td className="py-2.5 px-4 font-bold text-slate-800">{v.title}</td>
                        <td className="py-2.5 px-4">{v.company}</td>
                        <td className="py-2.5 px-4 text-slate-500">{v.category}</td>
                        <td className="py-2.5 px-4 text-right text-slate-600">{v.salaryRange}</td>
                      </tr>
                    ))}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
}
