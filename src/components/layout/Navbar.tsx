'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Building2, FileText, Menu, X, ArrowRight, ShieldCheck, ChevronRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Prevent background scroll when side slide menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Staffing vs Outsourcing', href: '/staffing-vs-outsourcing' },
    { name: 'Bolsa de Trabajo', href: '/vacantes' },
    { name: 'Por Qué Elegirnos', href: '/competitividad' },
    { name: 'Gestión RRHH', href: '/gestion-rrhh', icon: FileText },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo & Brand Name */}
            <Link href="/" className="flex items-center space-x-3 shrink-0">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-emerald-600 p-0.5 flex items-center justify-center shadow-xs">
                <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-blue-700" />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-extrabold text-slate-900 tracking-tight">
                    Soluciones Empresariales
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-bold uppercase tracking-wider">
                    Staffing
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium">Prestación de Servicios de Talentos</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    {Icon && <Icon className="w-4 h-4 text-emerald-600" />}
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Action Button */}
            <div className="hidden lg:flex items-center space-x-3">
              <Link
                href="/solicitar-personal"
                className="px-4 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-sm font-bold shadow-md transition-all flex items-center gap-2"
              >
                <Building2 className="w-4 h-4" />
                <span>Solicitar Personal</span>
              </Link>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2.5 rounded-xl bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200 transition-colors focus:outline-none"
                aria-label="Abrir Menú Lateral"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Side Slide Drawer Overlay & Drawer Container */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          
          {/* Backdrop Blur Overlay */}
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Side Slide Panel (Right to Left) */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-sm bg-white shadow-2xl border-l border-slate-200 flex flex-col justify-between animate-in slide-in-from-right duration-300">
              
              {/* Drawer Header */}
              <div>
                <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-9 h-9 rounded-lg bg-blue-700 flex items-center justify-center text-white shadow-xs">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-extrabold text-slate-900 text-base block leading-tight">
                        Soluciones Empresariales
                      </span>
                      <span className="text-[10px] text-blue-700 font-bold uppercase tracking-wider">
                        Menú de Navegación
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-200 transition-colors"
                    aria-label="Cerrar Menú"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Drawer Links */}
                <div className="p-6 space-y-2">
                  {navLinks.map((link) => {
                    const isActive = pathname === link.href;
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`w-full px-4 py-3 rounded-xl font-bold text-sm flex items-center justify-between transition-colors ${
                          isActive
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {Icon && <Icon className="w-4 h-4 text-emerald-600" />}
                          <span>{link.name}</span>
                        </div>
                        <ChevronRight className={`w-4 h-4 ${isActive ? 'text-blue-700' : 'text-slate-400'}`} />
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Drawer Footer & Action Button */}
              <div className="p-6 border-t border-slate-100 bg-slate-50 space-y-4">
                <Link
                  href="/solicitar-personal"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-extrabold text-sm text-center flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <Building2 className="w-4 h-4" />
                  <span>Solicitar Personal para Empresas</span>
                </Link>

                <div className="flex items-center gap-2 text-xs text-slate-500 justify-center">
                  <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0" />
                  <span>Atención directa en 1 a 2 días</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      )}
    </>
  );
};
