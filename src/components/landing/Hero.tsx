'use client';

import React from 'react';
import { Building2, Users, Clock, ShieldCheck, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  setActiveTab?: (tab: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ setActiveTab }) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-20 lg:py-28 border-b border-slate-800/60">
      
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs sm:text-sm font-semibold tracking-wide shadow-sm">
            <Zap className="w-4 h-4 text-blue-400 animate-pulse" />
            <span>Staffing de Talento Humano en El Salvador & Chalatenango</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            El Intermediario Estratégico Entre <span className="gradient-text">Empresas en Crecimiento</span> y <span className="gradient-text-gold">Talento Calificado</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed font-normal max-w-3xl mx-auto">
            Mitigamos la sobrecarga operativa, legal y de costos que representa la contratación de personal. Brindamos a las empresas el talento especializado que integran directamente en su equipo, mientras conectamos a los candidatos con verdaderas oportunidades laborales.
          </p>

          {/* Dual Action CTA Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setActiveTab?.('solicitud-empresa')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold text-base shadow-xl shadow-blue-600/30 transition-all flex items-center justify-center gap-2 group"
            >
              <Building2 className="w-5 h-5" />
              <span>Soy Empresa: Solicitar Personal</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => setActiveTab?.('vacantes')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl glass-panel text-slate-200 hover:text-white hover:border-slate-500 font-bold text-base transition-all flex items-center justify-center gap-2"
            >
              <Users className="w-5 h-5 text-emerald-400" />
              <span>Soy Candidato: Ver Vacantes</span>
            </button>
          </div>

          {/* Metric Highlights (Data directly from project study) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 text-left">
            <div className="glass-card p-6 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">1 - 2 Días</div>
                  <div className="text-xs text-slate-400 font-medium">Respuesta Inicial Solicitudes</div>
                </div>
              </div>
              <p className="text-xs text-slate-400">
                Respuesta ultra-rápida frente a los 3 a 5 días de agencias tradicionales.
              </p>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">~24 Días</div>
                  <div className="text-xs text-slate-400 font-medium">Proceso de Incorporación</div>
                </div>
              </div>
              <p className="text-xs text-slate-400">
                Reclutamiento y evaluación integral acelerada (vs 30-45 días promedio).
              </p>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">Staff Augmentation</div>
                  <div className="text-xs text-slate-400 font-medium">Control Técnico Directo</div>
                </div>
              </div>
              <p className="text-xs text-slate-400">
                La empresa dirige las tareas mientras gestionamos la nómina y aspectos legales.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
