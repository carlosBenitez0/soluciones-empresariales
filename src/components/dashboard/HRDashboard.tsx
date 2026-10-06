'use client';

import React, { useState } from 'react';
import { CandidateApplication, StaffingRequest } from '../../types';
import { FileText, Users, DollarSign, UserX, ShieldCheck, CheckCircle2, ChevronRight, Calculator, FileCheck, AlertCircle } from 'lucide-react';

interface HRDashboardProps {
  applications: CandidateApplication[];
  requests: StaffingRequest[];
}

export const HRDashboard: React.FC<HRDashboardProps> = ({ applications, requests }) => {
  const [activeTab, setActiveTab] = useState<'ingreso' | 'planilla' | 'salida' | 'prestaciones'>('ingreso');

  // Offboarding Calculator State
  const [exitType, setExitType] = useState<'Renuncia' | 'Despido'>('Renuncia');
  const [monthlySalary, setMonthlySalary] = useState<number>(600);
  const [yearsWorked, setYearsWorked] = useState<number>(2);
  const [pendingVacationDays, setPendingVacationDays] = useState<number>(15);

  // Severance calculation based on El Salvador Labor Code context in PDF
  const calculateSeverance = () => {
    const dailySalary = monthlySalary / 30;
    const vacationPay = pendingVacationDays * dailySalary * 1.3; // 30% vacation bonus
    let severancePay = 0;

    if (exitType === 'Despido') {
      // 1 month salary per year worked (up to legal cap standard)
      severancePay = monthlySalary * yearsWorked;
    } else {
      // Voluntary resignation benefit calculation (approx 15 days per year after 2+ years)
      severancePay = yearsWorked >= 2 ? (monthlySalary / 2) * yearsWorked : 0;
    }

    return {
      vacationPay: Math.round(vacationPay * 100) / 100,
      severancePay: Math.round(severancePay * 100) / 100,
      totalFiniquito: Math.round((vacationPay + severancePay) * 100) / 100,
    };
  };

  const calculationResult = calculateSeverance();

  return (
    <section className="py-16 bg-slate-900 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
            Centro de Operaciones y Flujogramas RRHH
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Panel de Gestión <span className="gradient-text">Talento Humano</span>
          </h2>
          <p className="text-slate-300 mt-2 text-base">
            Módulo basado estrictamente en los 4 flujogramas del manual de procesos de la empresa.
          </p>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8 glass-panel p-2 rounded-2xl border border-slate-800 max-w-4xl mx-auto">
          <button
            onClick={() => setActiveTab('ingreso')}
            className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'ingreso' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>1. Ingreso de Personal</span>
          </button>

          <button
            onClick={() => setActiveTab('planilla')}
            className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'planilla' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>2. Proceso de Planilla</span>
          </button>

          <button
            onClick={() => setActiveTab('salida')}
            className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'salida' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <UserX className="w-4 h-4" />
            <span>3. Salida e Indemnización</span>
          </button>

          <button
            onClick={() => setActiveTab('prestaciones')}
            className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'prestaciones' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>4. Prestaciones y Ley</span>
          </button>
        </div>

        {/* Tab Content 1: Ingreso de Personal */}
        {activeTab === 'ingreso' && (
          <div className="space-y-6">
            <div className="glass-panel p-6 rounded-2xl border border-slate-800">
              <h3 className="text-xl font-bold text-white mb-2">Flujograma 1: Ingreso de Personal y Evaluaciones</h3>
              <p className="text-slate-300 text-xs leading-relaxed mb-6">
                Proceso ordenado: Solicitud de cliente -&gt; Evaluación de Salario -&gt; Reclutamiento -&gt; Contacto -&gt; Entrevista -&gt; Pruebas Técnicas y Psicométricas -&gt; Entrevista con Cliente -&gt; Firma de Contrato.
              </p>

              {/* Active Pipeline List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {applications.map((app) => (
                  <div key={app.id} className="glass-card p-5 rounded-xl border border-slate-800 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-white">{app.fullName}</h4>
                        <p className="text-xs text-blue-400 font-medium">{app.vacancyTitle}</p>
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        {app.status}
                      </span>
                    </div>

                    <div className="text-xs text-slate-400 space-y-1">
                      <p>Email: {app.email} • Tel: {app.phone}</p>
                      <p>Experiencia: {app.experienceYears} años • Salario Esperado: ${app.expectedSalary} USD</p>
                    </div>

                    {app.testScores && (
                      <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs space-y-1">
                        <div className="flex justify-between text-slate-300">
                          <span>Prueba Técnica: <strong className="text-emerald-400">{app.testScores.technicalScore}%</strong></span>
                          <span>Prueba Psicométrica: <strong className="text-blue-400">{app.testScores.psychometricScore}%</strong></span>
                        </div>
                        <p className="text-slate-400 text-[11px] italic">{app.testScores.testNotes}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 2: Proceso de Planilla */}
        {activeTab === 'planilla' && (
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
            <h3 className="text-xl font-bold text-white mb-2">Flujograma 2: Proceso de Planilla e Incidencias</h3>
            <p className="text-slate-300 text-xs leading-relaxed mb-6">
              Movimientos de personal (Ingresos / Egresos) -&gt; Reporte de incidencias -&gt; Finanzas realiza los pagos -&gt; Analista de Planilla Regional envía la planilla al cliente.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-card p-5 rounded-xl border border-slate-800 text-center">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mx-auto mb-3">
                  <Users className="w-5 h-5" />
                </div>
                <h4 className="text-white font-bold text-sm">1. Registro Asistente TH</h4>
                <p className="text-xs text-slate-400 mt-1">Registra nuevos ingresos en la plataforma para emisión de nómina.</p>
              </div>

              <div className="glass-card p-5 rounded-xl border border-slate-800 text-center">
                <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-3">
                  <FileText className="w-5 h-5" />
                </div>
                <h4 className="text-white font-bold text-sm">2. Incidencias y Finanzas</h4>
                <p className="text-xs text-slate-400 mt-1">Reporte de horas extra, deducciones y reserva de fondos para desembolso.</p>
              </div>

              <div className="glass-card p-5 rounded-xl border border-slate-800 text-center">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h4 className="text-white font-bold text-sm">3. Despacho Regional</h4>
                <p className="text-xs text-slate-400 mt-1">El Analista Regional de Planilla envía el desglose oficial al cliente.</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 3: Salida e Indemnización (Interactive Calculator) */}
        {activeTab === 'salida' && (
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
            <div className="flex items-center gap-2">
              <Calculator className="w-6 h-6 text-emerald-400" />
              <h3 className="text-xl font-bold text-white">Flujograma 3: Calculadora de Salida y Finiquito Legal</h3>
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              Herramienta según el flujograma de salida: Revisión de vacaciones pendientes -&gt; Cálculo de indemnización -&gt; Finiquito Legal -&gt; Reserva de fondos en Finanzas.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Form Controls */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Tipo de Salida del Colaborador</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setExitType('Renuncia')}
                      className={`py-2 px-4 rounded-xl text-xs font-semibold border ${
                        exitType === 'Renuncia' ? 'bg-blue-600 text-white border-blue-500' : 'bg-slate-900 text-slate-400 border-slate-800'
                      }`}
                    >
                      Renuncia Voluntaria
                    </button>
                    <button
                      type="button"
                      onClick={() => setExitType('Despido')}
                      className={`py-2 px-4 rounded-xl text-xs font-semibold border ${
                        exitType === 'Despido' ? 'bg-amber-600 text-white border-amber-500' : 'bg-slate-900 text-slate-400 border-slate-800'
                      }`}
                    >
                      Despido Sin Causa
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Salario Mensual ($ USD)</label>
                  <input
                    type="number"
                    value={monthlySalary}
                    onChange={(e) => setMonthlySalary(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Años Laborados</label>
                    <input
                      type="number"
                      min="0"
                      value={yearsWorked}
                      onChange={(e) => setYearsWorked(Number(e.target.value))}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Días Vacación Pendientes</label>
                    <input
                      type="number"
                      min="0"
                      value={pendingVacationDays}
                      onChange={(e) => setPendingVacationDays(Number(e.target.value))}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Result Summary Card */}
              <div className="glass-card p-6 rounded-xl border border-slate-800 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-emerald-400" />
                    Resumen Estimado del Finiquito
                  </h4>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between py-2 border-b border-slate-800">
                      <span className="text-slate-400">Pago de Vacaciones + 30% Prima:</span>
                      <span className="font-bold text-white">${calculationResult.vacationPay} USD</span>
                    </div>

                    <div className="flex justify-between py-2 border-b border-slate-800">
                      <span className="text-slate-400">Indemnización por {exitType}:</span>
                      <span className="font-bold text-white">${calculationResult.severancePay} USD</span>
                    </div>

                    <div className="flex justify-between py-3 text-base">
                      <span className="font-bold text-emerald-400">Total Finiquito Estimado:</span>
                      <span className="font-extrabold text-emerald-400 text-lg">${calculationResult.totalFiniquito} USD</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 text-xs text-slate-500">
                  * El documento legal de finiquito es preparado por el Área Legal y los fondos son reservados por Finanzas antes del pago.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 4: Prestaciones */}
        {activeTab === 'prestaciones' && (
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
            <h3 className="text-xl font-bold text-white mb-2">Flujograma 4: Prestaciones (Vacaciones, Aguinaldo, Seguro Médico)</h3>
            <p className="text-slate-300 text-xs leading-relaxed mb-6">
              Reglas aplicadas según las especificaciones del cliente y normativas del manual.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-card p-6 rounded-xl border border-slate-800">
                <h4 className="text-white font-bold text-base mb-2 text-blue-400">1. Vacaciones</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Prima vacacional cancelada en la quincena del aniversario laboral. Los días de descanso se liquidan cuando el colaborador realmente los goza.
                </p>
              </div>

              <div className="glass-card p-6 rounded-xl border border-slate-800">
                <h4 className="text-white font-bold text-base mb-2 text-emerald-400">2. Aguinaldo</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Se evalúa si el contrato con el cliente define un aguinaldo propio o si se aplica el cálculo estándar estipulado por la ley.
                </p>
              </div>

              <div className="glass-card p-6 rounded-xl border border-slate-800">
                <h4 className="text-white font-bold text-base mb-2 text-amber-400">3. Seguro Médico</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Seguro médico hospitalario privado disponible cuando el cliente lo ofrece y el colaborador cumple 1 año de antigüedad.
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
