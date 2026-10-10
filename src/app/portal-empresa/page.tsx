'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { normalizeCode } from '@/lib/codes';
import { readCompanySession, saveCompanySession, useCompanyPortal } from '@/hooks/useCompanyPortal';
import { ArrowLeft, Building2, KeyRound, Lock } from 'lucide-react';

export default function PortalEmpresaLoginPage() {
  const router = useRouter();
  const [codeInput, setCodeInput] = useState('');
  const [submittedCode, setSubmittedCode] = useState<string | null>(null);
  const { state } = useCompanyPortal(submittedCode);

  // Already signed in on this device: go straight to the panel
  useEffect(() => {
    if (readCompanySession()) router.replace('/portal-empresa/panel');
  }, [router]);

  useEffect(() => {
    if (submittedCode && state.status === 'ok') {
      saveCompanySession(submittedCode);
      router.push('/portal-empresa/panel');
    }
  }, [submittedCode, state.status, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!codeInput.trim()) return;
    setSubmittedCode(normalizeCode(codeInput));
  };

  const isChecking = submittedCode !== null && state.status === 'loading';
  const isInvalid = submittedCode !== null && state.status === 'invalid';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="max-w-md mx-auto px-4 sm:px-6">
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver a la Página Principal</span>
            </Link>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-md space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-blue-700 text-white flex items-center justify-center mx-auto">
                <Building2 className="w-6 h-6" />
              </div>
              <h1 className="text-2xl font-extrabold text-slate-900">Portal de Empresas</h1>
              <p className="text-sm text-slate-600 leading-relaxed">
                Ingrese el código de acceso que le enviamos por correo para ver el avance de sus plazas.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="accessCode" className="block text-xs font-bold text-slate-700 mb-1">
                  Código de Acceso
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="accessCode"
                    type="text"
                    required
                    autoComplete="off"
                    value={codeInput}
                    onChange={(e) => {
                      setCodeInput(e.target.value);
                      setSubmittedCode(null);
                    }}
                    placeholder="EMP-XXXXXX"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-blue-700 text-sm font-bold tracking-wider uppercase shadow-xs"
                  />
                </div>
                {isInvalid && (
                  <p role="alert" className="text-xs text-red-600 font-semibold mt-1.5">
                    Código inválido o empresa sin acceso activo. Verifique el código o contáctenos.
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isChecking}
                className="w-full py-3 rounded-xl bg-blue-700 hover:bg-blue-800 disabled:opacity-60 text-white font-extrabold text-sm shadow-md transition-colors"
              >
                {isChecking ? 'Verificando...' : 'Entrar al Portal'}
              </button>
            </form>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex gap-2">
              <Lock className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
              <span>
                Por confidencialidad, los datos de los candidatos se comparten únicamente cuando el proceso llega a la contratación.
              </span>
            </div>

            <p className="text-xs text-slate-500 text-center">
              ¿Aún no tiene código?{' '}
              <Link href="/registro-empresa" className="font-bold text-blue-700 hover:text-blue-900 underline">
                Registre su empresa
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
