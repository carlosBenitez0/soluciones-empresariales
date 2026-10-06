'use client';

import React, { useState } from 'react';
import { Building2, FileText, Menu, X } from 'lucide-react';

interface NavbarProps {
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab = 'inicio', setActiveTab }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tab: string) => {
    if (setActiveTab) {
      setActiveTab(tab);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Name */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleNavClick('inicio')}>
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-700 to-emerald-600 p-0.5 flex items-center justify-center shadow-md">
              <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                <Building2 className="w-6 h-6 text-blue-700" />
              </div>
            </div>
            <div>
              <span className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-1.5">
                Soluciones Empresariales
                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-semibold">
                  Staffing SV
                </span>
              </span>
              <p className="text-xs text-slate-500 font-medium">Prestación de Servicios de Talentos</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <button
              onClick={() => handleNavClick('inicio')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === 'inicio' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Inicio
            </button>
            <button
              onClick={() => handleNavClick('staffing-vs-outsourcing')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === 'staffing-vs-outsourcing' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Staffing vs Outsourcing
            </button>
            <button
              onClick={() => handleNavClick('vacantes')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === 'vacantes' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Bolsa de Trabajo
            </button>
            <button
              onClick={() => handleNavClick('competitividad')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === 'competitividad' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Por Qué Elegirnos
            </button>
            <button
              onClick={() => handleNavClick('dashboard')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                activeTab === 'dashboard' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <FileText className="w-4 h-4 text-emerald-600" />
              Gestión RRHH
            </button>
          </nav>

          {/* Action Callouts */}
          <div className="hidden lg:flex items-center space-x-3">
            <button
              onClick={() => handleNavClick('solicitud-empresa')}
              className="px-5 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-sm font-bold shadow-md transition-all flex items-center gap-2"
            >
              <Building2 className="w-4 h-4" />
              Solicitar Personal
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Alternar Menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2">
          <button
            onClick={() => handleNavClick('inicio')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-base font-semibold text-slate-800 hover:bg-slate-50"
          >
            Inicio
          </button>
          <button
            onClick={() => handleNavClick('staffing-vs-outsourcing')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-base font-semibold text-slate-800 hover:bg-slate-50"
          >
            Staffing vs Outsourcing
          </button>
          <button
            onClick={() => handleNavClick('vacantes')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-base font-semibold text-slate-800 hover:bg-slate-50"
          >
            Bolsa de Trabajo
          </button>
          <button
            onClick={() => handleNavClick('competitividad')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-base font-semibold text-slate-800 hover:bg-slate-50"
          >
            Por Qué Elegirnos
          </button>
          <button
            onClick={() => handleNavClick('dashboard')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-base font-semibold text-emerald-700 hover:bg-emerald-50"
          >
            Gestión RRHH (Flujogramas)
          </button>
          <div className="pt-2">
            <button
              onClick={() => handleNavClick('solicitud-empresa')}
              className="w-full py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-center flex items-center justify-center gap-2 shadow-sm"
            >
              <Building2 className="w-5 h-5" />
              Solicitar Personal Empresas
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
