'use client';

import React, { useState } from 'react';
import { COMPETITOR_COMPARISON } from '../../data/mockData';
import { Zap, ShieldCheck, CheckCircle2, Clock } from 'lucide-react';

export const CompetitorMatrix: React.FC = () => {
  const [activeMobileTab, setActiveMobileTab] = useState<'vinculos' | 'latin'>('vinculos');

  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            Análisis de Competitividad & Ventaja Ágil
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            ¿Por Qué Elegir <span className="gradient-text">Soluciones Empresariales</span>?
          </h2>
          <p className="text-slate-600 mt-3 text-base">
            Comparativa basada en el estudio de mercado regional frente a agencias tradicionales en El Salvador.
          </p>
        </div>

        {/* Mobile Tabbed Switcher View (Visible on Small Screens) */}
        <div className="block md:hidden mb-8">
          
          {/* Tab Selector Buttons */}
          <div className="bg-slate-100 p-1 rounded-xl flex gap-1 mb-4 border border-slate-200">
            <button
              onClick={() => setActiveMobileTab('vinculos')}
              className={`flex-1 py-2 px-3 rounded-lg text-xs transition-all text-center ${
                activeMobileTab === 'vinculos'
                  ? 'bg-blue-700 text-white shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 font-medium'
              }`}
            >
              vs. Vínculos Estratégicos
            </button>

            <button
              onClick={() => setActiveMobileTab('latin')}
              className={`flex-1 py-2 px-3 rounded-lg text-xs transition-all text-center ${
                activeMobileTab === 'latin'
                  ? 'bg-blue-700 text-white shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 font-medium'
              }`}
            >
              vs. Latin Top Jobs
            </button>
          </div>

          {/* Clean Comparison Container */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200 flex justify-between items-center text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <span>Criterio Evaluado</span>
              <span>Comparativa Directa</span>
            </div>

            <div className="divide-y divide-slate-100">
              {COMPETITOR_COMPARISON.map((row, idx) => {
                const competitorValue = activeMobileTab === 'vinculos' ? row.vinculosEstrategicos : row.latinTopJobs;
                const competitorName = activeMobileTab === 'vinculos' ? 'Vínculos Estratégicos' : 'Latin Top Jobs';

                return (
                  <div key={idx} className="p-3.5 space-y-2 hover:bg-slate-50/30 transition-colors">
                    <span className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      {row.attribute}
                    </span>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {/* Soluciones Empresariales Highlight */}
                      <div className="bg-emerald-50/70 border border-emerald-200/70 p-2.5 rounded-xl flex flex-col justify-between">
                        <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-tight flex items-center gap-1 mb-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                          Soluciones Emp.
                        </span>
                        <span className="font-semibold text-slate-900 text-xs leading-snug">
                          {row.solucionesEmpresariales}
                        </span>
                      </div>

                      {/* Selected Competitor */}
                      <div className="bg-slate-50 border border-slate-200/70 p-2.5 rounded-xl flex flex-col justify-between">
                        <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-tight block truncate mb-1">
                          {competitorName}
                        </span>
                        <span className="font-normal text-slate-600 text-xs leading-snug">
                          {competitorValue}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Desktop Table View (Visible on Medium & Larger Screens) */}
        <div className="hidden md:block bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-xs uppercase tracking-wider text-slate-600 border-b border-slate-200">
                  <th className="py-4 px-6 font-bold">Atributo / Criterio</th>
                  <th className="py-4 px-6 font-semibold text-slate-700">Vínculos Estratégicos</th>
                  <th className="py-4 px-6 font-semibold text-slate-700">Latin Top Jobs</th>
                  <th className="py-4 px-6 font-bold text-blue-900 bg-blue-50 border-l border-r border-blue-200">
                    Soluciones Empresariales
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-sm">
                {COMPETITOR_COMPARISON.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6 font-bold text-slate-900 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                      {row.attribute}
                    </td>
                    <td className="py-4 px-6 text-slate-600">{row.vinculosEstrategicos}</td>
                    <td className="py-4 px-6 text-slate-600">{row.latinTopJobs}</td>
                    <td className="py-4 px-6 font-bold text-emerald-700 bg-blue-50/50 border-l border-r border-blue-200">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        {row.solucionesEmpresariales}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Highlights Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div className="glass-card p-6 rounded-2xl border border-slate-200">
            <h4 className="text-slate-900 font-extrabold text-base mb-2 flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-600" />
              Mayor Disponibilidad
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Las grandes agencias tradicionales manejan portafolios masivos que ralentizan la atención. Nosotros dedicamos prioridad inmediata a cada caso empresarial.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-slate-200">
            <h4 className="text-slate-900 font-extrabold text-base mb-2 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              Reducción de Costos Operativos
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Eliminamos el gasto fijo de mantener personal interno de reclutamiento y evitamos multas por inconsistencias legales o de indemnizaciones.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-slate-200">
            <h4 className="text-slate-900 font-extrabold text-base mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-amber-600" />
              Acompañamiento Cercano
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Orientamos tanto a la empresa en los perfiles idóneos como al candidato durante su proceso de integración.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
