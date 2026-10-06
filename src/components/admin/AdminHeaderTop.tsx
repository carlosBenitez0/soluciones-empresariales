'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell, Search, Plus, FileText, Sparkles, ExternalLink } from 'lucide-react';
import { useData } from '@/context/DataContext';

export const AdminHeaderTop: React.FC = () => {
  const pathname = usePathname();
  const { staffingRequests } = useData();

  const pendingRequestsCount = staffingRequests.filter((r) => r.status.includes('Pendiente')).length;

  const getPageTitle = () => {
    if (pathname === '/admin') return 'Panel General de Control';
    if (pathname?.startsWith('/admin/vacantes')) return 'Gestión de Vacantes Laborales';
    if (pathname?.startsWith('/admin/solicitudes')) return 'Solicitudes Corporativas B2B';
    if (pathname?.startsWith('/admin/candidatos')) return 'Pipeline de Reclutamiento & Evaluaciones';
    if (pathname?.startsWith('/admin/reportes')) return 'Generador de Reportes Ejecutivos PDF';
    return 'Panel de Administración';
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-xs">
      <div className="px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        
        {/* Title & Path */}
        <div>
          <h1 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
            {getPageTitle()}
          </h1>
          <p className="text-xs text-slate-500 hidden sm:block">
            Soluciones Empresariales SV &bull; Sistema Operativo de Gestión Reclutamiento
          </p>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          
          {/* Quick PDF button */}
          <Link
            href="/admin/reportes"
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-blue-600" />
            <span>Generar Reporte PDF</span>
          </Link>

          {/* New Vacancy Quick Action */}
          <Link
            href="/admin/vacantes"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Nueva Vacante</span>
          </Link>

          {/* Notifications */}
          <div className="relative">
            <Link
              href="/admin/solicitudes"
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors block relative"
              title="Solicitudes Pendientes"
            >
              <Bell className="w-4 h-4" />
              {pendingRequestsCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white animate-pulse" />
              )}
            </Link>
          </div>
        </div>

      </div>
    </header>
  );
};
