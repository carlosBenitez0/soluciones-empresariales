'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { StaffingVsOutsourcing } from '@/components/landing/StaffingVsOutsourcing';
import { ArrowLeft, UserCheck, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function StaffingVsOutsourcingPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver a la Página Principal</span>
            </Link>
          </div>

          <div className="bg-gradient-to-r from-blue-900 to-slate-900 text-white rounded-3xl p-8 lg:p-12 mb-10 shadow-xl">
            <div className="max-w-3xl space-y-4">
              <span className="px-3.5 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-bold uppercase tracking-wider">
                Metodología de Contratación
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                Staffing (Staff Augmentation) vs. Outsourcing
              </h1>
              <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-normal">
                Comprenda las diferencias clave entre mantener la supervisión operativa y liderazgo técnico con Staffing frente a la delegación total por entregables de Outsourcing.
              </p>
            </div>
          </div>

          <StaffingVsOutsourcing />

        </div>
      </main>

      <Footer />
    </div>
  );
}
