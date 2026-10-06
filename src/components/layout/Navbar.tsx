'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Briefcase, Building2, Users, FileText, Menu, X, ShieldCheck, ChevronRight } from 'lucide-react';

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
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Name */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleNavClick('inicio')}>
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-600 to-emerald-500 p-0.5 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Building2 className="w-6 h-6 text-blue-400" />
              </div>
            </div>
            <div>
              <span className="text-xl font-bold text-white tracking-tight flex items-center gap-1.5">
                Soluciones Empresariales
                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 font-medium">
                  Staffing SV
                </span>
              </span>
              <p className="text-xs text-slate-400">Prestación de Servicios de Talentos</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <button
              onClick={() => handleNavClick('inicio')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'inicio' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Inicio
            </button>
            <button
              onClick={() => handleNavClick('staffing-vs-outsourcing')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'staffing-vs-outsourcing' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Staffing vs Outsourcing
            </button>
            <button
              onClick={() => handleNavClick('vacantes')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'vacantes' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Bolsa de Trabajo
            </button>
            <button
              onClick={() => handleNavClick('competitividad')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'competitividad' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Por Qué Elegirnos
            </button>
            <button
              onClick={() => handleNavClick('dashboard')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === 'dashboard' ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <FileText className="w-4 h-4 text-emerald-400" />
              Gestión RRHH
            </button>
          </nav>

          {/* Action Callouts */}
          <div className="hidden lg:flex items-center space-x-3">
            <button
              onClick={() => handleNavClick('solicitud-empresa')}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white text-sm font-semibold shadow-lg shadow-blue-600/25 transition-all flex items-center gap-2"
            >
              <Building2 className="w-4 h-4" />
              Solicitar Personal
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-label="Alternar Menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-t border-slate-800 px-4 pt-2 pb-6 space-y-2">
          <button
            onClick={() => handleNavClick('inicio')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800"
          >
            Inicio
          </button>
          <button
            onClick={() => handleNavClick('staffing-vs-outsourcing')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800"
          >
            Staffing vs Outsourcing
          </button>
          <button
            onClick={() => handleNavClick('vacantes')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800"
          >
            Bolsa de Trabajo
          </button>
          <button
            onClick={() => handleNavClick('competitividad')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800"
          >
            Por Qué Elegirnos
          </button>
          <button
            onClick={() => handleNavClick('dashboard')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-base font-medium text-emerald-400 hover:bg-slate-800"
          >
            Gestión RRHH (Flujogramas)
          </button>
          <div className="pt-2">
            <button
              onClick={() => handleNavClick('solicitud-empresa')}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-center flex items-center justify-center gap-2 shadow-md"
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
