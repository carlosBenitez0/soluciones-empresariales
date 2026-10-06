'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { isSupabaseConfigured } from '@/lib/supabase';
import {
  LayoutDashboard,
  Briefcase,
  Building2,
  Users,
  FileSpreadsheet,
  LogOut,
  ExternalLink,
  Database,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();
  const { vacancies, staffingRequests, candidateApplications } = useData();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const pendingRequestsCount = staffingRequests.filter((r) => r.status.includes('Pendiente')).length;
  const activeApplicationsCount = candidateApplications.filter((a) => a.status !== 'Contratación y Firma').length;

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  const navItems = [
    {
      label: 'Dashboard Overview',
      href: '/admin',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      label: 'Gestión de Vacantes',
      href: '/admin/vacantes',
      icon: Briefcase,
      badge: vacancies.length,
    },
    {
      label: 'Solicitudes B2B',
      href: '/admin/solicitudes',
      icon: Building2,
      badge: pendingRequestsCount > 0 ? pendingRequestsCount : null,
      badgeColor: 'bg-amber-500 text-slate-950 font-black',
    },
    {
      label: 'Candidatos & Pipeline',
      href: '/admin/candidatos',
      icon: Users,
      badge: activeApplicationsCount > 0 ? activeApplicationsCount : null,
      badgeColor: 'bg-blue-500 text-white font-bold',
    },
    {
      label: 'Reportes',
      href: '/admin/reportes',
      icon: FileSpreadsheet,
      badge: null,
    },
  ];

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between bg-slate-900 text-slate-200 border-r border-slate-800">
      <div>
        {/* Brand Header: Original clean layout, adjusted padding & font size to prevent overflow */}
        <div className="p-4 border-b border-slate-800">
          <Link href="/admin" className="flex items-center gap-2.5 group min-w-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform shrink-0 p-1">
              <Image
                src="/logos/se-isotipo-no-bg.png"
                alt="Soluciones Empresariales"
                width={32}
                height={32}
                className="w-full h-full object-contain brightness-0 invert"
              />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[13px] font-black text-white tracking-tight block leading-tight whitespace-nowrap">
                Soluciones<span className="text-blue-400">Empresariales</span>
              </span>
              <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase block mt-0.5 whitespace-nowrap">
                Panel de Reclutamiento
              </span>
            </div>
          </Link>

          {/* Database Connection Status (Only when live) */}
          {isSupabaseConfigured && (
            <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] text-emerald-400 font-bold">Supabase Cloud</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                <Database className="w-3 h-3 text-emerald-400" />
                Live
              </span>
            </div>
          )}
        </div>

        {/* Navigation Menu */}
        <div className="px-3 py-5 space-y-1">
          <div className="px-3 pb-2 text-[10px] font-bold tracking-widest text-slate-500 uppercase">
            Módulos Principales
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname?.startsWith(item.href));
            
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/70'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== null && item.badge !== undefined && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full ${
                      item.badgeColor || (isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-300')
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Footer / Account Actions */}
      <div className="p-4 border-t border-slate-800 space-y-3 bg-slate-950/40">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-300 text-xs font-medium transition-colors"
        >
          <div className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
            <span>Ver Portal Público</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
        </Link>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-black text-xs flex items-center justify-center shadow-inner shrink-0">
              SE
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-white leading-tight truncate">Admin Master</p>
              <p className="text-[10px] text-slate-400 truncate max-w-[110px]">admin@soluciones.sv</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            title="Cerrar Sesión"
            className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors shrink-0"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Fixed Left) */}
      <aside className="hidden lg:block w-64 fixed inset-y-0 left-0 z-30 shadow-2xl">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Navigation Header */}
      <div className="lg:hidden bg-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-800 sticky top-0 z-40">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold shrink-0">
            <Image
              src="/logos/se-isotipo-no-bg.png"
              alt="Soluciones Empresariales"
              width={24}
              height={24}
              className="w-full h-full object-contain brightness-0 invert"
            />
          </div>
          <span className="font-extrabold text-sm text-white truncate">Soluciones Empresariales</span>
        </div>
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white shrink-0"
        >
          {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Backdrop & Drawer */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileOpen(false)}
          />
          <div className="relative flex-1 max-w-xs w-full bg-slate-900 h-full z-10 shadow-2xl">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
