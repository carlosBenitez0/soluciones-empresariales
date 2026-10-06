'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { INITIAL_CANDIDATE_APPLICATIONS, INITIAL_STAFFING_REQUESTS } from '@/data/mockData';
import { CandidateApplication, StaffingRequest } from '@/types';
import { Search, ArrowLeft, CheckCircle2, Clock, Building2, UserCheck, ShieldCheck, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function SeguimientoPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedCandidate, setSearchedCandidate] = useState<CandidateApplication | null>(null);
  const [searchedRequest, setSearchedRequest] = useState<StaffingRequest | null>(null);
  const [searched, setSearched] = useState(false);

  const pipelineSteps = [
    'Solicitud Recibida',
    'Contacto Telefónico',
    'Entrevista Inicial',
    'Pruebas Técnicas y Psicométricas',
    'Entrevista con Cliente',
    'Expediente Aprobado',
    'Contratación y Firma',
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const query = searchQuery.trim().toLowerCase();

    const candidateMatch = INITIAL_CANDIDATE_APPLICATIONS.find(
      (app) => app.trackingCode.toLowerCase() === query || app.email.toLowerCase() === query || app.fullName.toLowerCase().includes(query)
    );

    const requestMatch = INITIAL_STAFFING_REQUESTS.find(
      (req) => req.trackingCode.toLowerCase() === query || req.email.toLowerCase() === query || req.companyName.toLowerCase().includes(query)
    );

    setSearchedCandidate(candidateMatch || null);
    setSearchedRequest(requestMatch || null);
    setSearched(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver a la Página Principal</span>
            </Link>
          </div>

          <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-emerald-900 text-white rounded-3xl p-8 lg:p-12 mb-10 shadow-xl text-center">
            <span className="px-3.5 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-bold uppercase tracking-wider inline-block mb-3">
              Portal de Consulta en Tiempo Real
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Seguimiento de Estado de Postulación y Solicitud
            </h1>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mt-2">
              Ingrese su <strong className="text-emerald-400 font-bold">Código de Rastreo</strong> (ej. APP-5011 o REQ-8810), o su correo electrónico registrado para verificar el progreso del proceso de staffing.
            </p>

            {/* Search Input */}
            <form onSubmit={handleSearch} className="mt-8 max-w-lg mx-auto flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ej. APP-5011, REQ-8810 o correo..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-semibold shadow-md"
                />
              </div>
              <button
                type="submit"
                className="py-3 px-6 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-extrabold text-sm shadow-md transition-colors"
              >
                Consultar Estado
              </button>
            </form>
          </div>

          {/* Results Display */}
          {searched && (
            <div className="space-y-8 animate-in fade-in duration-300">
              
              {/* Candidate Application Match */}
              {searchedCandidate && (
                <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-md space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
                    <div>
                      <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                        Código: {searchedCandidate.trackingCode}
                      </span>
                      <h3 className="text-2xl font-extrabold text-slate-900 mt-1">
                        {searchedCandidate.fullName}
                      </h3>
                      <p className="text-sm text-slate-600 font-medium">
                        Postulante para: <strong className="text-slate-900">{searchedCandidate.vacancyTitle}</strong>
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300 inline-block">
                        {searchedCandidate.status}
                      </span>
                      <p className="text-xs text-slate-400 mt-1">Postulado el: {searchedCandidate.appliedAt}</p>
                    </div>
                  </div>

                  {/* Visual 7-Step Pipeline Progress Tracker */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-4">
                      Progreso del Flujograma de Reclutamiento (Paso a Paso)
                    </h4>

                    <div className="space-y-3">
                      {pipelineSteps.map((step, idx) => {
                        const currentIdx = pipelineSteps.indexOf(searchedCandidate.status);
                        const isCompleted = idx <= currentIdx;
                        const isCurrent = idx === currentIdx;

                        return (
                          <div
                            key={step}
                            className={`p-3.5 rounded-xl border flex items-center justify-between text-sm transition-colors ${
                              isCurrent
                                ? 'bg-blue-50 border-blue-600 text-blue-950 font-extrabold shadow-xs'
                                : isCompleted
                                ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900 font-semibold'
                                : 'bg-slate-50 border-slate-200 text-slate-400'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                isCompleted ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
                              }`}>
                                {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                              </div>
                              <span>{step}</span>
                            </div>

                            {isCurrent && (
                              <span className="text-xs text-blue-700 font-bold bg-blue-100 px-2.5 py-0.5 rounded-full">
                                Etapa Actual
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Test Scores & Evaluation Details */}
                  {searchedCandidate.testScores && (
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                      <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Resultados de Evaluaciones Técnicas y Psicométricas
                      </h4>
                      <div className="grid grid-cols-2 gap-4 text-sm font-semibold pt-1">
                        <div className="text-slate-800">
                          Prueba Técnica: <span className="text-emerald-700 font-bold">{searchedCandidate.testScores.technicalScore}%</span>
                        </div>
                        <div className="text-slate-800">
                          Prueba Psicométrica: <span className="text-blue-700 font-bold">{searchedCandidate.testScores.psychometricScore}%</span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 italic pt-1">{searchedCandidate.testScores.testNotes}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Company Request Match */}
              {searchedRequest && (
                <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-md space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
                    <div>
                      <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                        Código: {searchedRequest.trackingCode}
                      </span>
                      <h3 className="text-2xl font-extrabold text-slate-900 mt-1">
                        {searchedRequest.companyName}
                      </h3>
                      <p className="text-sm text-slate-600 font-medium">
                        Solicitud: <strong className="text-slate-900">{searchedRequest.positionTitle}</strong> ({searchedRequest.numberOfPositions} plazas)
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-blue-100 text-blue-800 border border-blue-300 inline-block">
                        {searchedRequest.status}
                      </span>
                      <p className="text-xs text-slate-400 mt-1">Registrado el: {searchedRequest.submittedAt}</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-950 space-y-1">
                    <div className="font-bold flex items-center gap-1.5 text-sm">
                      <Clock className="w-4 h-4 text-blue-700" />
                      <span>Compromiso SLA de Respuesta: 24 a 48 horas hábiles</span>
                    </div>
                    <p className="text-slate-700">
                      Un especialista asignado de Soluciones Empresariales se encuentra revisando los perfiles idóneos para su vacante de {searchedRequest.positionTitle}.
                    </p>
                  </div>
                </div>
              )}

              {/* No Matches Found */}
              {!searchedCandidate && !searchedRequest && (
                <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-3">
                  <p className="text-slate-700 text-base font-semibold">
                    No se encontró ninguna postulación o solicitud asociada a "{searchQuery}".
                  </p>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    Asegúrese de escribir correctamente el código (ej. APP-5011 o REQ-8810) o el correo registrado.
                  </p>
                </div>
              )}

            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
