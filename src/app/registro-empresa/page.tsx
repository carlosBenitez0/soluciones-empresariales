'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useData } from '@/context/DataContext';
import { ArrowLeft, Building2, CheckCircle2, ClipboardList, KeyRound, Users } from 'lucide-react';

export default function RegistroEmpresaPage() {
  const { registerClientCompany } = useData();

  const [name, setName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !contactName || !email || !phone) return;

    setIsSubmitting(true);
    await registerClientCompany({
      name: name.trim(),
      contactName: contactName.trim(),
      email: email.trim(),
      phone: phone.trim(),
    });
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const steps = [
    { icon: ClipboardList, title: 'Registre su empresa', text: 'Complete sus datos de contacto. Revisamos cada registro en 1 a 2 días hábiles.' },
    { icon: KeyRound, title: 'Reciba su código', text: 'Al aprobarla le enviamos por correo un código de acceso al Portal de Empresas.' },
    { icon: Users, title: 'Siga sus procesos', text: 'Vea cuántos postulantes tiene cada plaza y en qué etapa va cada uno, mientras nosotros hacemos todo el proceso.' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver a la Página Principal</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Value proposition */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200 text-xs font-bold uppercase tracking-wider">
                  Empresas Clientes
                </span>
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-3">
                  Registre su empresa y delegue todo el proceso de contratación
                </h1>
                <p className="text-slate-600 text-sm leading-relaxed mt-2">
                  Usted nos comparte las plazas; nosotros las publicamos, reclutamos, evaluamos y le presentamos a los candidatos idóneos.
                </p>
              </div>

              <ol className="space-y-4">
                {steps.map((step, idx) => {
                  const Icon = step.icon;
                  return (
                    <li key={step.title} className="flex gap-3">
                      <div className="w-9 h-9 rounded-xl bg-blue-700 text-white flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-extrabold text-slate-900">
                          {idx + 1}. {step.title}
                        </p>
                        <p className="text-xs text-slate-600 leading-relaxed">{step.text}</p>
                      </div>
                    </li>
                  );
                })}
              </ol>

              <p className="text-xs text-slate-500">
                ¿Ya tiene su código?{' '}
                <Link href="/portal-empresa" className="font-bold text-blue-700 hover:text-blue-900 underline">
                  Ingrese al Portal de Empresas
                </Link>
              </p>
            </div>

            {/* Form */}
            <div className="lg:col-span-3 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-md">
              {submitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto border border-emerald-300">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h2 className="text-2xl font-extrabold text-slate-900">¡Registro recibido!</h2>
                  <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                    Revisaremos los datos de <strong className="text-slate-900">{name}</strong> y enviaremos el código de acceso al Portal de Empresas a{' '}
                    <strong className="text-slate-900">{email}</strong> en un plazo de 1 a 2 días hábiles.
                  </p>
                  <Link
                    href="/solicitar-personal"
                    className="inline-block px-6 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow-md"
                  >
                    Solicitar personal ahora
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                    <Building2 className="w-5 h-5 text-blue-700" />
                    <h2 className="text-lg font-extrabold text-slate-900">Datos de la empresa</h2>
                  </div>

                  <div>
                    <label htmlFor="companyName" className="block text-xs font-bold text-slate-700 mb-1">
                      Nombre de la Empresa
                    </label>
                    <input
                      id="companyName"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ej. Industrias del Norte S.A. de C.V."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-blue-700 text-sm shadow-xs"
                    />
                  </div>

                  <div>
                    <label htmlFor="contactName" className="block text-xs font-bold text-slate-700 mb-1">
                      Persona de Contacto
                    </label>
                    <input
                      id="contactName"
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Ej. Lic. Ana Martínez"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-blue-700 text-sm shadow-xs"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="companyEmail" className="block text-xs font-bold text-slate-700 mb-1">
                        Correo Corporativo
                      </label>
                      <input
                        id="companyEmail"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="rrhh@empresa.sv"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-blue-700 text-sm shadow-xs"
                      />
                    </div>
                    <div>
                      <label htmlFor="companyPhone" className="block text-xs font-bold text-slate-700 mb-1">
                        Teléfono
                      </label>
                      <input
                        id="companyPhone"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+503 2000-0000"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-blue-700 text-sm shadow-xs"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-xl bg-blue-700 hover:bg-blue-800 disabled:opacity-60 text-white font-extrabold text-sm shadow-md transition-colors"
                  >
                    {isSubmitting ? 'Enviando...' : 'Registrar mi Empresa'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
