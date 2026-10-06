'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';
import Link from 'next/link';
import { Lock, Mail, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = login(email, password);
    if (success) {
      router.push('/admin');
    } else {
      setError('Credenciales incorrectas. Verifique correo y contraseña.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col justify-between font-sans">
      
      {/* Top Bar */}
      <header className="p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al Sitio Principal</span>
          </Link>

          <span className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full font-semibold">
            Acceso Administrativo Seguro
          </span>
        </div>
      </header>

      {/* Main Login Card */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-slate-800/80 backdrop-blur-md p-8 rounded-3xl border border-slate-700 shadow-2xl space-y-6">
          
          {/* Logo & Title */}
          <div className="text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-white p-1.5 flex items-center justify-center mx-auto shadow-md">
              <Image
                src="/logos/se-isotipo-no-bg.png"
                alt="Soluciones Empresariales Logo"
                width={48}
                height={48}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-white tracking-tight">
                Portal de Administración
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Soluciones Empresariales | Staffing & RRHH
              </p>
            </div>
          </div>

          {/* Alert Error */}
          {error && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs text-center font-medium">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@solucionesempresariales.sv"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-lg transition-colors flex items-center justify-center gap-2"
            >
              <span>Ingresar al Panel</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Credentials Help */}
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-700/60 text-[11px] text-slate-400 space-y-1">
            <div className="font-bold text-slate-300 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>Credenciales de Demostración:</span>
            </div>
            <p>• Correo: <code className="text-emerald-400">admin@solucionesempresariales.sv</code></p>
            <p>• Contraseña: <code className="text-emerald-400">admin123</code></p>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Soluciones Empresariales. Panel Operativo de Administración.
      </footer>
    </div>
  );
}
