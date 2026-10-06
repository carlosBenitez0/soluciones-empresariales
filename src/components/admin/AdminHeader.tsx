'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { LayoutDashboard, Briefcase, Building2, Users, LogOut, ExternalLink } from 'lucide-react';

export const AdminHeader: React.FC = () => {
  const pathname = usePathname();
  const { logout } = useAuth();
  const router = useRouter();

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Vacantes de Empleo', href: '/admin/vacantes', icon: Briefcase },
    { name: 'Solicitudes Empresas', href: '/admin/solicitudes', icon: Building2 },
    { name: 'Candidatos & Evaluaciones', href: '/admin/candidatos', icon: Users },
  ];

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Admin Badge */}
          <div className="flex items-center space-x-3">
            <Link href="/admin" className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-white p-1 flex items-center justify-center shadow-xs">
                <Image
                  src="/logos/se-isotipo-no-bg.png"
                  alt="Soluciones Empresariales Logo"
                  width={28}
                  height={28}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-extrabold text-base tracking-tight text-white hidden sm:inline-block">
                Soluciones Empresariales
              </span>
            </Link>

            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold uppercase tracking-wider">
              Panel Admin
            </span>
          </div>

          {/* Navigation Items */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Actions: View Public Site & Logout */}
          <div className="flex items-center space-x-2">
            <Link
              href="/"
              target="_blank"
              className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-colors flex items-center gap-1"
            >
              <span>Sitio Web</span>
              <ExternalLink className="w-3 h-3" />
            </Link>

            <button
              onClick={handleLogout}
              className="px-2.5 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-bold transition-colors flex items-center gap-1"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline-block">Cerrar Sesión</span>
            </button>
          </div>

        </div>

        {/* Mobile Navigation Row */}
        <div className="md:hidden flex items-center justify-around py-2 border-t border-slate-800 text-xs">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-2 py-1 rounded-md text-[11px] font-bold flex items-center gap-1 ${
                  isActive ? 'bg-blue-600 text-white' : 'text-slate-400'
                }`}
              >
                <Icon className="w-3 h-3" />
                <span>{item.name.split(' ')[0]}</span>
              </Link>
            );
          })}
        </div>

      </div>
    </header>
  );
};
