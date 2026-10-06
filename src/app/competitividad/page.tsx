'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CompetitorMatrix } from '@/components/landing/CompetitorMatrix';
import { ArrowLeft, Clock, ShieldCheck, Zap } from 'lucide-react';
import Link from 'next/link';

export default function CompetitividadPage() {
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

          <div className="bg-gradient-to-r from-emerald-900 via-slate-900 to-blue-900 text-white rounded-3xl p-8 lg:p-12 mb-10 shadow-xl">
            <div className="max-w-3xl space-y-4">
              <span className="px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold uppercase tracking-wider">
                Estudio de Mercado y Ventajas Competitivas
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                Ventaja Ágil frente a Agencias Tradicionales
              </h1>
              <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-normal">
                Nuestra propuesta de valor garantiza atención en 1 a 2 días y un proceso completo de incorporación en ~24 días, superando los tiempos de 30 a 45 días del mercado tradicional.
              </p>
            </div>
          </div>

          <CompetitorMatrix />

        </div>
      </main>

      <Footer />
    </div>
  );
}
