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
          <div className="bg-slate-200/80 p-1.5 rounded-2xl flex gap-1 mb-4 shadow-inner">
            <button
              onClick={() => setActiveMobileTab('vinculos')}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-extrabold transition-all text-center ${
                activeMobileTab === 'vinculos'
                  ? 'bg-blue-700 text-white shadow-md'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              vs. Vínculos Estratégicos
            </button>

            <button
              onClick={() => setActiveMobileTab('latin')}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-extrabold transition-all text-center ${
                activeMobileTab === 'latin'
                  ? 'bg-blue-700 text-white shadow-md'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              vs. Latin Top Jobs
            </button>
          </div>

          {/* Compact Comparison Card Container */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="bg-slate-100 px-4 py-3 border-b border-slate-200 flex justify-between items-center text-xs font-extrabold text-slate-700">
              <span>CRITERIO EVALUADO</span>
              <span>COMPARATIVA DIRECTA</span>
            </div>

            <div className="divide-y divide-slate-100">
              {COMPETITOR_COMPARISON.map((row, idx) => {
                const competitorValue = activeMobileTab === 'vinculos' ? row.vinculosEstrategicos : row.latinTopJobs;
                const competitorName = activeMobileTab === 'vinculos' ? 'Vínculos Estratégicos' : 'Latin Top Jobs';

                return (
                  <div key={idx} className="p-4 space-y-2.5 hover:bg-slate-50/50 transition-colors">
                    <span className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      {row.attribute}
                    </span>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {/* Soluciones Empresariales Highlight */}
                      <div className="bg-emerald-50/90 border border-emerald-200 p-2.5 rounded-xl space-y-1">
                        <span className="text-[9px] font-black text-emerald-800 uppercase tracking-wider block">
                          Soluciones Emp.
                        </span>
                        <span className="font-extrabold text-emerald-950 text-xs block leading-tight flex items-start gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{row.solucionesEmpresariales}</span>
                        </span>
                      </div>

                      {/* Selected Competitor */}
                      <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-xl space-y-1">
                        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block truncate">
                          {competitorName}
                        </span>
                        <span className="font-semibold text-slate-700 text-xs block leading-tight">
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
