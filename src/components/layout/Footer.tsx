'use client';

import React from 'react';
import Link from 'next/link';
import { Building2, MapPin, Phone, Mail, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-300 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Company identity & Slogan */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-emerald-500 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
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

          {/* Corporate Values & Vision (Clean & Perfectly Aligned Grid Layout) */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Nuestra Empresa</h3>
            <div className="space-y-3 text-xs text-slate-300">
              <div>
                <span className="font-bold text-emerald-400 block mb-0.5">Misión:</span>
                <p className="leading-relaxed text-slate-400">Contribuir al crecimiento de las empresas mediante selección eficaz.</p>
              </div>
              <div>
                <span className="font-bold text-blue-400 block mb-0.5">Visión:</span>
                <p className="leading-relaxed text-slate-400">Liderar el mercado de staffing conectando oportunidades en Chalatenango y la región.</p>
              </div>
              <div>
                <span className="font-bold text-amber-400 block mb-0.5">Valores:</span>
                <p className="leading-relaxed text-slate-400">Efectividad, Innovación, Competitividad y Constancia.</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Inicio & Presentación
                </Link>
              </li>
              <li>
                <Link href="/staffing-vs-outsourcing" className="hover:text-white transition-colors">
                  Staffing vs. Outsourcing
                </Link>
              </li>
              <li>
                <Link href="/vacantes" className="hover:text-white transition-colors">
                  Bolsa de Empleo Activa
                </Link>
              </li>
              <li>
                <Link href="/solicitar-personal" className="hover:text-white transition-colors">
                  Solicitar Personal para Empresas
                </Link>
              </li>
              <li>
                <Link href="/gestion-rrhh" className="hover:text-emerald-400 transition-colors">
                  Panel de Flujogramas RRHH
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Location */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Ubicación y Contacto</h3>
            <div className="space-y-2.5 text-sm text-slate-400">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <span>Colonia Los Pinares, pasaje 2, casa #30, Chalatenango Sur, El Salvador.</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>+503 2300-9988</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-amber-400 shrink-0" />
                <span>contacto@solucionesempresariales.sv</span>
              </div>
            </div>
            <a
              href="https://maps.google.com/maps?q=14.0374975%2C-88.935842&z=17&hl=es"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs text-blue-400 hover:text-blue-300 underline pt-2 font-semibold"
            >
              Ver en Google Maps →
            </a>
          </div>

        </div>

        <div className="border-t border-slate-800 mt-12 pt-6 text-center text-xs text-slate-500">
          <p>© 2026 Soluciones Empresariales. Todos los derechos reservados. Proyecto de Inversión y Staffing.</p>
        </div>
      </div>
    </footer>
  );
};
