'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminHeaderTop } from '@/components/admin/AdminHeaderTop';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // On login page, render full screen without admin sidebar wrapper
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans flex flex-col">
      {/* Sidebar Aside */}
      <AdminSidebar />

      {/* Main Canvas Area (Offset by 260px on Desktop lg:) */}
      <div className="lg:pl-64 flex-1 flex flex-col min-w-0">
        <AdminHeaderTop />
        
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
}
