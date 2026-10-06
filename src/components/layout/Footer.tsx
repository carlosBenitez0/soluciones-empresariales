'use client';

import React from 'react';
import { Building2, MapPin, Phone, Mail, ShieldCheck, HeartHandshake } from 'lucide-react';

interface FooterProps {
  setActiveTab?: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 text-slate-400 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Company identity & Slogan */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-emerald-500 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-blue-400" />
                </div>
              </div>
              <span className="text-lg font-bold text-white tracking-tight">Soluciones Empresariales</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Agencia de Staffing especializada en dotación de talento humano en El Salvador y la región de Chalatenango. Mitigamos la gestión operativa y legal de contratación.
            </p>
            <div className="flex items-center gap-2 text-xs text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1.5 rounded-lg w-fit">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>Garantía de respuesta en 24 a 48 hrs</span>
            </div>
          </div>

          {/* Corporate Values & Vision */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Nuestra Empresa</h3>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-semibold">• Misión:</span>
                <span>Contribuir al crecimiento de las empresas mediante selección eficaz.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 font-semibold">• Visión:</span>
                <span>Liderar el mercado de staffing conectando oportunidades en Chalatenango y la región.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-semibold">• Valores:</span>
                <span>Efectividad, Innovación, Competitividad y Constancia.</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Enlaces Rápido</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => setActiveTab?.('inicio')} className="hover:text-white transition-colors">
                  Inicio & Presentación
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab?.('staffing-vs-outsourcing')} className="hover:text-white transition-colors">
                  Staffing vs. Outsourcing
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab?.('vacantes')} className="hover:text-white transition-colors">
                  Bolsa de Empleo Activa
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab?.('solicitud-empresa')} className="hover:text-white transition-colors">
                  Solicitar Personal para Empresas
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab?.('dashboard')} className="hover:text-emerald-400 transition-colors">
                  Panel de Flujogramas RRHH
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Location */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Ubicación y Contacto</h3>
            <div className="flex items-start gap-3 text-sm">
              <MapPin className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              <span>Colonia Los Pinares, pasaje 2, casa #30, Chalatenango Sur, El Salvador.</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Phone className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>+503 2300-9988</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Mail className="w-5 h-5 text-amber-400 shrink-0" />
              <span>contacto@solucionesempresariales.sv</span>
            </div>
            <a
              href="https://maps.google.com/maps?q=14.0374975%2C-88.935842&z=17&hl=es"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs text-blue-400 hover:text-blue-300 underline pt-2"
            >
              Ver en Google Maps →
            </a>
          </div>

        </div>

        <div className="border-t border-slate-800/60 mt-12 pt-6 text-center text-xs text-slate-500">
          <p>© 2026 Soluciones Empresariales. Todos los derechos reservados. Proyecto de Inversión y Staffing.</p>
        </div>
      </div>
    </footer>
  );
};
