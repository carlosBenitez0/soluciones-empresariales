'use client';

import React from 'react';
import Link from 'next/link';
import { Building2, Users, Clock, ShieldCheck, ArrowRight, Zap } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 py-16 lg:py-24 border-b border-slate-200">
      
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-100/60 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs sm:text-sm font-bold tracking-wide shadow-xs">
            <Zap className="w-4 h-4 text-blue-600 animate-pulse" />
            <span>Staffing de Talento Humano</span>
          </div>

          {/* Main Title (Improved Phrasing: Removed 'El Intermediario') */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Conexión Estratégica Entre <span className="gradient-text">Empresas en Crecimiento</span> y <span className="gradient-text-gold">Talento Calificado</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-normal max-w-3xl mx-auto">
            Mitigamos la sobrecarga operativa, legal y de costos que representa la contratación de personal. Brindamos a las empresas el talento especializado que integran directamente en su equipo, mientras conectamos a los candidatos con verdaderas oportunidades laborales.
          </p>

          {/* Dual Action CTA Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/solicitar-personal"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-extrabold text-base shadow-lg shadow-blue-700/20 transition-all flex items-center justify-center gap-2 group"
            >
              <Building2 className="w-5 h-5" />
              <span>Soy Empresa: Solicitar Personal</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/vacantes"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 hover:text-slate-900 font-extrabold text-base transition-all flex items-center justify-center gap-2 shadow-xs"
            >
              <Users className="w-5 h-5 text-emerald-600" />
              <span>Soy Candidato: Ver Vacantes</span>
            </Link>
          </div>

          {/* Metric Highlights (Data directly from project study) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 text-left">
            <div className="glass-card p-6 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 rounded-xl bg-blue-50 text-blue-700 border border-blue-100">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-slate-900">1 - 2 Días</div>
                  <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Respuesta a Solicitudes</div>
                </div>
              </div>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Respuesta ultra-rápida frente a los 3 a 5 días de agencias tradicionales.
              </p>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-slate-900">~24 Días</div>
                  <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Proceso de Incorporación</div>
                </div>
              </div>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Reclutamiento y evaluación integral acelerada (vs 30-45 días promedio).
              </p>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 rounded-xl bg-amber-50 text-amber-700 border border-amber-100">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-slate-900">Staff Augmentation</div>
                  <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Control Técnico Directo</div>
                </div>
              </div>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                La empresa dirige las tareas mientras gestionamos la nómina y aspectos legales.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
