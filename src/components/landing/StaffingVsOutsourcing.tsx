'use client';

import React from 'react';
import { UserCheck, Briefcase, CheckCircle, ArrowRight } from 'lucide-react';

interface StaffingVsOutsourcingProps {
  setActiveTab?: (tab: string) => void;
}

export const StaffingVsOutsourcing: React.FC<StaffingVsOutsourcingProps> = ({ setActiveTab }) => {
  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Diferencia Entre <span className="gradient-text">Staffing</span> y <span className="text-slate-500">Outsourcing</span>
          </h2>
          <p className="text-slate-600 mt-3 text-base">
            Conoce cómo nuestro servicio de <strong className="text-blue-700 font-bold">Staffing (Staff Augmentation)</strong> otorga a tu empresa control operativo completo mientras nosotros absorbemos la carga administrativa.
          </p>
        </div>

        {/* Comparison Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Staffing Card (Featured) */}
          <div className="bg-gradient-to-b from-blue-50/80 to-white p-8 rounded-2xl border-2 border-blue-600/40 relative shadow-md">
            <div className="absolute -top-3.5 right-6 px-4 py-1 rounded-full bg-blue-700 text-white text-xs font-bold uppercase tracking-wider shadow-sm">
              Nuestro Modelo Principal
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="p-3.5 rounded-xl bg-blue-600 text-white shadow-md">
                <UserCheck className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Staffing (Dotación de Personal)</h3>
                <p className="text-sm text-blue-700 font-semibold">Staff Augmentation especializado</p>
              </div>
            </div>

            <p className="text-slate-700 text-sm leading-relaxed mb-6">
              Consiste en contratar talento externo especializado para que <strong className="text-slate-900 font-bold">se integre directamente a tu equipo de trabajo</strong>.
            </p>

            <ul className="space-y-4 text-sm text-slate-700">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block font-bold">Control y Liderazgo:</strong>
                  Tú asignas las tareas, diriges la operación diaria y supervisas directamente los resultados.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block font-bold">Integración de Equipo:</strong>
                  El profesional opera como un miembro más de tu empresa, adoptando tu cultura e indicación técnica.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block font-bold">Gestión por Soluciones Empresariales:</strong>
                  Nosotros nos encargamos del reclutamiento, contratación, nómina y cumplimiento legal.
                </div>
              </li>
            </ul>

            <div className="mt-8 pt-6 border-t border-slate-200">
              <button
                onClick={() => setActiveTab?.('solicitud-empresa')}
                className="w-full py-3.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-extrabold text-center flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <span>Solicitar Personal mediante Staffing</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Outsourcing Card */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3.5 rounded-xl bg-slate-100 text-slate-600 border border-slate-200">
                <Briefcase className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-800">Outsourcing (Subcontratación)</h3>
                <p className="text-sm text-slate-500 font-semibold">Delegación completa de proyectos</p>
              </div>
            </div>

            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              Consiste en delegar un proceso o proyecto completo a un proveedor externo especializado que lo realiza de principio a fin.
            </p>

            <ul className="space-y-4 text-sm text-slate-600">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-slate-400 shrink-0 mt-2" />
                <div>
                  <strong className="text-slate-800 block font-bold">Control y Liderazgo:</strong>
                  El proveedor externo tiene total autonomía para organizar personal, herramientas y métodos.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-slate-400 shrink-0 mt-2" />
                <div>
                  <strong className="text-slate-800 block font-bold">Responsabilidad:</strong>
                  La empresa externa asume la ejecución total del servicio sin intervención diaria del cliente.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-slate-400 shrink-0 mt-2" />
                <div>
                  <strong className="text-slate-800 block font-bold">Enfoque de Pago:</strong>
                  Se paga por entregables o servicios cerrados, no por horas directas de personal integrado.
                </div>
              </li>
            </ul>

            <div className="mt-8 pt-6 border-t border-slate-200 text-center">
              <p className="text-xs text-slate-500">
                Si buscas mantener la supervisión técnica y flexibilidad de equipo sin sobrecargar a RRHH, <span className="text-blue-700 font-bold">el modelo de Staffing es la mejor opción.</span>
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
