'use client';

import React from 'react';
import { UserCheck, Briefcase, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';

interface StaffingVsOutsourcingProps {
  setActiveTab?: (tab: string) => void;
}

export const StaffingVsOutsourcing: React.FC<StaffingVsOutsourcingProps> = ({ setActiveTab }) => {
  return (
    <section className="py-16 bg-slate-900 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Diferencia Entre <span className="gradient-text">Staffing</span> y <span className="text-slate-400">Outsourcing</span>
          </h2>
          <p className="text-slate-300 mt-3 text-base">
            Conoce cómo nuestro servicio de <strong className="text-blue-400 font-semibold">Staffing (Staff Augmentation)</strong> otorga a tu empresa control operativo completo mientras nosotros absorbemos la carga administrativa.
          </p>
        </div>

        {/* Comparison Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Staffing Card (Featured) */}
          <div className="glass-panel p-8 rounded-2xl border-2 border-blue-500/40 relative shadow-2xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-blue-950/30">
            <div className="absolute -top-3.5 right-6 px-4 py-1 rounded-full bg-blue-600 text-white text-xs font-bold uppercase tracking-wider shadow-md">
              Nuestro Modelo Principal
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="p-3.5 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
                <UserCheck className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Staffing (Dotación de Personal)</h3>
                <p className="text-sm text-blue-400 font-medium">Staff Augmentation especializado</p>
              </div>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              Consiste en contratar talento externo especializado para que <strong className="text-white">se integre directamente a tu equipo de trabajo</strong>.
            </p>

            <ul className="space-y-4 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">Control y Liderazgo:</strong>
                  Tú asignas las tareas, diriges la operación diaria y supervisas directamente los resultados.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">Integración de Equipo:</strong>
                  El profesional opera como un miembro más de tu empresa, adoptando tu cultura e indicación técnica.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">Gestión por Soluciones Empresariales:</strong>
                  Nosotros nos encargamos del reclutamiento, contratación, nómina y cumplimiento legal.
                </div>
              </li>
            </ul>

            <div className="mt-8 pt-6 border-t border-slate-800">
              <button
                onClick={() => setActiveTab?.('solicitud-empresa')}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-center flex items-center justify-center gap-2 transition-colors"
              >
                <span>Solicitar Personal mediante Staffing</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Outsourcing Card */}
          <div className="glass-card p-8 rounded-2xl border border-slate-800 bg-slate-950/40">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3.5 rounded-xl bg-slate-800 text-slate-400 border border-slate-700">
                <Briefcase className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-200">Outsourcing (Subcontratación)</h3>
                <p className="text-sm text-slate-400 font-medium">Delegación completa de proyectos</p>
              </div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Consiste en delegar un proceso o proyecto completo a un proveedor externo especializado que lo realiza de principio a fin.
            </p>

            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-slate-500 shrink-0 mt-2" />
                <div>
                  <strong className="text-slate-300 block font-semibold">Control y Liderazgo:</strong>
                  El proveedor externo tiene total autonomía para organizar personal, herramientas y métodos.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-slate-500 shrink-0 mt-2" />
                <div>
                  <strong className="text-slate-300 block font-semibold">Responsabilidad:</strong>
                  La empresa externa asume la ejecución total del servicio sin intervención diaria del cliente.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-slate-500 shrink-0 mt-2" />
                <div>
                  <strong className="text-slate-300 block font-semibold">Enfoque de Pago:</strong>
                  Se paga por entregables o servicios cerrados, no por horas directas de personal integrado.
                </div>
              </li>
            </ul>

            <div className="mt-8 pt-6 border-t border-slate-800/80 text-center">
              <p className="text-xs text-slate-400">
                Si buscas mantener la supervisión técnica y flexibilidad de equipo sin sobrecargar a RRHH, <span className="text-blue-400 font-semibold">el modelo de Staffing es la mejor opción.</span>
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
