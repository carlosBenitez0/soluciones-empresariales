'use client';

import React from 'react';
import { COMPETITOR_COMPARISON } from '../../data/mockData';
import { Zap, ShieldCheck, CheckCircle2, Clock } from 'lucide-react';

export const CompetitorMatrix: React.FC = () => {
  return (
    <section className="py-16 bg-slate-950 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
            Análisis de Competitividad & Ventaja Ágil
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            ¿Por Qué Elegir <span className="gradient-text">Soluciones Empresariales</span>?
          </h2>
          <p className="text-slate-300 mt-3 text-base">
            Comparativa basada en el estudio de mercado regional frente a agencias tradicionales en El Salvador.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="glass-panel rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900/90 text-xs uppercase tracking-wider text-slate-400 border-b border-slate-800">
                  <th className="py-4 px-6 font-semibold">Atributo / Criterio</th>
                  <th className="py-4 px-6 font-semibold text-slate-300">Vínculos Estratégicos</th>
                  <th className="py-4 px-6 font-semibold text-slate-300">Latin Top Jobs</th>
                  <th className="py-4 px-6 font-bold text-blue-400 bg-blue-950/40 border-l border-r border-blue-500/30">
                    Soluciones Empresariales
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-sm">
                {COMPETITOR_COMPARISON.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-4 px-6 font-medium text-white flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-400 shrink-0" />
                      {row.attribute}
                    </td>
                    <td className="py-4 px-6 text-slate-400">{row.vinculosEstrategicos}</td>
                    <td className="py-4 px-6 text-slate-400">{row.latinTopJobs}</td>
                    <td className="py-4 px-6 font-bold text-emerald-400 bg-blue-950/30 border-l border-r border-blue-500/20">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
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
          <div className="glass-card p-6 rounded-xl border border-slate-800">
            <h4 className="text-white font-bold text-base mb-2 flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-400" />
              Mayor Disponibilidad
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Las grandes agencias tradicionales manejan portafolios masivos que ralentizan la atención. Nosotros dedicamos prioridad inmediata a cada caso empresarial.
            </p>
          </div>

          <div className="glass-card p-6 rounded-xl border border-slate-800">
            <h4 className="text-white font-bold text-base mb-2 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              Reducción de Costos Operativos
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Eliminamos el gasto fijo de mantener personal interno de reclutamiento y evitamos multas por inconsistencias legales o de indemnizaciones.
            </p>
          </div>

          <div className="glass-card p-6 rounded-xl border border-slate-800">
            <h4 className="text-white font-bold text-base mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-amber-400" />
              Acompañamiento Cercano
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Orientamos tanto a la empresa en los perfiles idóneos como al candidato durante su proceso de integración.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
