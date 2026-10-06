'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { CandidateApplication, PipelineStage } from '@/types';
import { Users, Search, ArrowLeft, CheckCircle2, Clock, FileCheck, Edit3, X, Calculator, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function AdminCandidatosPage() {
  const { isAdmin } = useAuth();
  const { candidateApplications, updateCandidateApplication } = useData();
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('Todos');
  const [evaluatingCandidate, setEvaluatingCandidate] = useState<CandidateApplication | null>(null);

  // Evaluation Form State
  const [techScore, setTechScore] = useState<number>(85);
  const [psychoScore, setPsychoScore] = useState<number>(90);
  const [evalNotes, setEvalNotes] = useState<string>('');

  useEffect(() => {
    if (!isAdmin) {
      router.push('/admin/login');
    }
  }, [isAdmin, router]);

  if (!isAdmin) return null;

  const pipelineSteps: PipelineStage[] = [
    'Solicitud Recibida',
    'Contacto Telefónico',
    'Entrevista Inicial',
    'Pruebas Técnicas y Psicométricas',
    'Entrevista con Cliente',
    'Expediente Aprobado',
    'Contratación y Firma',
  ];

  const filteredApplications = candidateApplications.filter((app) => {
    const matchesSearch = app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          app.trackingCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          app.vacancyTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'Todos' || app.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleStepChange = async (id: string, newStep: string) => {
    await updateCandidateApplication(id, { status: newStep as PipelineStage });
  };

  const openEvalModal = (app: CandidateApplication) => {
    setEvaluatingCandidate(app);
    setTechScore(app.testScores?.technicalScore ?? 85);
    setPsychoScore(app.testScores?.psychometricScore ?? 90);
    setEvalNotes(app.testScores?.testNotes ?? '');
  };

  const handleSaveEvaluation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!evaluatingCandidate) return;

    await updateCandidateApplication(evaluatingCandidate.id, {
      testScores: {
        technicalScore: Number(techScore),
        psychometricScore: Number(psychoScore),
        testNotes: evalNotes || 'Evaluación técnica completada por el área de RRHH.',
      },
    });

    setEvaluatingCandidate(null);
  };

  return (
    <>
      <div className="space-y-6 pb-10">
        {/* Header Bar */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900">Evaluaciones & Pipeline de Candidatos</h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Seguimiento de expedientes, registro de pruebas técnicas/psicométricas y avance de etapas.
              </p>
            </div>
            <div className="px-3.5 py-1.5 rounded-full bg-purple-100 border border-purple-300 text-purple-800 text-xs font-extrabold flex items-center gap-1.5 w-fit">
              <Users className="w-4 h-4 text-purple-700" />
              <span>Pipeline de 7 Pasos</span>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col md:flex-row gap-3 shadow-xs">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por código (ej. APP-5011), candidato, correo o vacante..."
                className="w-full pl-9 pr-4 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-blue-600 font-medium"
              />
            </div>

            <div className="flex items-center gap-2">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="py-2 px-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold focus:outline-none"
              >
                <option value="Todos">Todas las etapas</option>
                {pipelineSteps.map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Candidates Applications Grid */}
          <div className="space-y-4">
            {filteredApplications.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 text-slate-500 font-medium">
                No se encontraron postulaciones registradas con los criterios seleccionados.
              </div>
            ) : (
              filteredApplications.map((app) => (
                <div key={app.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 hover:border-purple-300 transition-all">
                  
                  {/* Top Bar Info */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">{app.trackingCode}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold border border-emerald-300">
                          {app.status}
                        </span>
                      </div>
                      <h3 className="text-lg font-extrabold text-slate-900 mt-0.5">{app.fullName}</h3>
                      <p className="text-xs text-slate-600 font-medium">
                        Postulante para: <strong className="text-blue-900">{app.vacancyTitle}</strong>
                      </p>
                    </div>

                    {/* Pipeline Stage Selector */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-500">Avanzar Etapa:</span>
                      <select
                        value={app.status}
                        onChange={(e) => handleStepChange(app.id, e.target.value)}
                        className="py-1.5 px-3 rounded-xl bg-purple-50 border border-purple-200 text-purple-950 text-xs font-extrabold focus:outline-none cursor-pointer"
                      >
                        {pipelineSteps.map((st) => (
                          <option key={st} value={st}>{st}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Candidate Specs & Scores */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-1">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Contacto Candidato</span>
                      <p className="font-semibold text-slate-800">{app.email}</p>
                      <p className="text-slate-600">Tel: {app.phone}</p>
                    </div>

                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-1">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Experiencia y Salario</span>
                      <p className="font-semibold text-slate-800">{app.experienceYears} años de experiencia</p>
                      <p className="text-emerald-700 font-bold">Pretensión: ${app.expectedSalary} USD</p>
                    </div>

                    {/* Test Scores Display / Button */}
                    <div className="bg-purple-50/70 p-3.5 rounded-xl border border-purple-100 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-purple-900 uppercase tracking-wider block mb-1">
                          Evaluaciones de RRHH
                        </span>
                        {app.testScores ? (
                          <div className="space-y-0.5 font-bold text-slate-800 text-[11px]">
                            <p>Técnica: <strong className="text-emerald-700">{app.testScores.technicalScore}%</strong> • Psicométrica: <strong className="text-blue-700">{app.testScores.psychometricScore}%</strong></p>
                            <p className="text-slate-500 font-normal italic text-[10px] truncate">{app.testScores.testNotes}</p>
                          </div>
                        ) : (
                          <p className="text-slate-500 text-[11px]">Sin pruebas registradas aún</p>
                        )}
                      </div>

                      <button
                        onClick={() => openEvalModal(app)}
                        className="mt-2 text-xs font-extrabold text-purple-700 hover:text-purple-900 flex items-center gap-1"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>{app.testScores ? 'Editar Notas' : 'Ingresar Evaluaciones'}</span>
                      </button>
                    </div>
                  </div>

                </div>
              ))
            )}
          </div>
        </div>

      {/* Evaluation Scores Modal */}
      {evaluatingCandidate && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in duration-200">
            
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-purple-700" />
                <h3 className="text-lg font-extrabold text-slate-900">
                  Ingresar Evaluaciones Técnicas
                </h3>
              </div>
              <button
                onClick={() => setEvaluatingCandidate(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEvaluation} className="p-6 space-y-4">
              <p className="text-xs text-slate-600 font-medium">
                Candidato: <strong className="text-slate-900">{evaluatingCandidate.fullName}</strong> ({evaluatingCandidate.vacancyTitle})
              </p>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Puntaje Prueba Técnica (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  required
                  value={techScore}
                  onChange={(e) => setTechScore(Number(e.target.value))}
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm font-semibold shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Puntaje Prueba Psicométrica (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  required
                  value={psychoScore}
                  onChange={(e) => setPsychoScore(Number(e.target.value))}
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm font-semibold shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Observaciones del Evaluador de RRHH</label>
                <textarea
                  rows={3}
                  value={evalNotes}
                  onChange={(e) => setEvalNotes(e.target.value)}
                  placeholder="Detalles sobre desempeño del candidato en las pruebas..."
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs font-medium shadow-xs"
                />
              </div>

              <div className="pt-3 flex justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEvaluatingCandidate(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-extrabold text-xs shadow-md"
                >
                  Guardar Evaluaciones
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </>
  );
}
