'use client';

import React, { useState } from 'react';
import { Vacancy, CandidateApplication } from '../../types';
import { VacancyModal } from './VacancyModal';
import { Search, Filter, Briefcase, MapPin, DollarSign, ArrowRight, Sparkles } from 'lucide-react';

interface VacancyListProps {
  vacancies: Vacancy[];
  onAddApplication: (app: Omit<CandidateApplication, 'id' | 'appliedAt' | 'status'>) => void;
}

export const VacancyList: React.FC<VacancyListProps> = ({ vacancies, onAddApplication }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [selectedWorkMode, setSelectedWorkMode] = useState<string>('Todos');
  const [selectedVacancy, setSelectedVacancy] = useState<Vacancy | null>(null);

  const categories = ['Todas', 'Finanzas y Contabilidad', 'Operaciones y Logística', 'Ventas y Atención al Cliente', 'Administración', 'Tecnología'];
  const workModes = ['Todos', 'Presencial', 'Híbrido', 'Remoto'];

  const filteredVacancies = vacancies.filter((vac) => {
    const matchesSearch = vac.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          vac.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          vac.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todas' || vac.category === selectedCategory;
    const matchesWorkMode = selectedWorkMode === 'Todos' || vac.workMode === selectedWorkMode;
    return matchesSearch && matchesCategory && matchesWorkMode;
  });

  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold uppercase tracking-wider mb-3">
            Oportunidades Laborales Activas
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Bolsa de Trabajo para <span className="gradient-text">Candidatos</span>
          </h2>
          <p className="text-slate-600 mt-2 text-base">
            Conectamos tus habilidades con vacantes verificadas en empresas formales de El Salvador.
          </p>
        </div>

        {/* Filters Bar */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:gap-4 shadow-xs">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por puesto, requisito o ubicación..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 text-sm shadow-xs"
            />
          </div>

          {/* Category Dropdown */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-blue-600 shrink-0" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="py-2.5 px-3 rounded-xl bg-white border border-slate-300 text-slate-800 text-sm focus:outline-none focus:border-blue-600 shadow-xs font-medium"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Work Mode Dropdown */}
          <div>
            <select
              value={selectedWorkMode}
              onChange={(e) => setSelectedWorkMode(e.target.value)}
              className="py-2.5 px-3 rounded-xl bg-white border border-slate-300 text-slate-800 text-sm focus:outline-none focus:border-blue-600 w-full shadow-xs font-medium"
            >
              {workModes.map((mode) => (
                <option key={mode} value={mode}>{mode}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Vacancies Grid */}
        {filteredVacancies.length === 0 ? (
          <div className="bg-slate-50 p-12 text-center rounded-2xl border border-slate-200">
            <p className="text-slate-600 text-base">No se encontraron vacantes con los criterios seleccionados.</p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedCategory('Todas'); setSelectedWorkMode('Todos'); }}
              className="mt-4 text-sm font-bold text-blue-700 hover:underline"
            >
              Restablecer Filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVacancies.map((vacancy) => (
              <div
                key={vacancy.id}
                className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-col justify-between relative group hover:shadow-md transition-all hover:border-blue-300"
              >
                {vacancy.isUrgent && (
                  <span className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300 text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-600" />
                    Urgente
                  </span>
                )}

                <div>
                  <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                    {vacancy.category}
                  </span>
                  <h3 className="text-xl font-extrabold text-slate-900 mt-1 group-hover:text-blue-700 transition-colors">
                    {vacancy.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-1">{vacancy.company}</p>

                  <p className="text-slate-600 text-xs leading-relaxed mt-3 line-clamp-3">
                    {vacancy.description}
                  </p>

                  <div className="space-y-2 mt-4 pt-4 border-t border-slate-100 text-xs text-slate-600 font-medium">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-blue-600" />
                      <span>{vacancy.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Modalidad: {vacancy.workMode}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-3.5 h-3.5 text-amber-600" />
                      <span className="font-extrabold text-slate-900">{vacancy.salaryRange}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    onClick={() => setSelectedVacancy(vacancy)}
                    className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-blue-700 text-slate-800 hover:text-white font-bold text-xs transition-all flex items-center justify-center gap-2 group-hover:bg-blue-700 group-hover:text-white shadow-xs"
                  >
                    <span>Postularme a esta Plaza</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Modal instance */}
      <VacancyModal
        vacancy={selectedVacancy}
        onClose={() => setSelectedVacancy(null)}
        onSubmitApplication={onAddApplication}
      />
    </section>
  );
};
