'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { Vacancy, JobCategory, WorkMode } from '@/types';
import { Plus, Search, Edit2, Trash2, Sparkles, CheckCircle2, X, Briefcase, MapPin, DollarSign, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AdminVacantesPage() {
  const { isAdmin } = useAuth();
  const { vacancies, addVacancy, updateVacancy, deleteVacancy } = useData();
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVacancy, setEditingVacancy] = useState<Vacancy | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('Empresa Cliente Confidencial');
  const [category, setCategory] = useState<JobCategory>('Administración');
  const [location, setLocation] = useState('Chalatenango Sur');
  const [workMode, setWorkMode] = useState<WorkMode>('Presencial');
  const [salaryRange, setSalaryRange] = useState('$500 - $700 USD');
  const [description, setDescription] = useState('');
  const [requirementsInput, setRequirementsInput] = useState('');
  const [responsibilitiesInput, setResponsibilitiesInput] = useState('');
  const [benefitsInput, setBenefitsInput] = useState('');
  const [isUrgent, setIsUrgent] = useState(false);

  useEffect(() => {
    if (!isAdmin) {
      router.push('/admin/login');
    }
  }, [isAdmin, router]);

  if (!isAdmin) return null;

  const categories = ['Todas', 'Finanzas y Contabilidad', 'Operaciones y Logística', 'Ventas y Atención al Cliente', 'Administración', 'Tecnología'];

  const filteredVacancies = vacancies.filter((vac) => {
    const matchesSearch = vac.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          vac.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          vac.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todas' || vac.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const openCreateModal = () => {
    setEditingVacancy(null);
    setTitle('');
    setCompany('Empresa Cliente Confidencial');
    setCategory('Administración');
    setLocation('Chalatenango Sur');
    setWorkMode('Presencial');
    setSalaryRange('$500 - $700 USD');
    setDescription('');
    setRequirementsInput('');
    setResponsibilitiesInput('');
    setBenefitsInput('');
    setIsUrgent(false);
    setIsModalOpen(true);
  };

  const openEditModal = (vac: Vacancy) => {
    setEditingVacancy(vac);
    setTitle(vac.title);
    setCompany(vac.company);
    setCategory(vac.category);
    setLocation(vac.location);
    setWorkMode(vac.workMode);
    setSalaryRange(vac.salaryRange);
    setDescription(vac.description);
    setRequirementsInput(vac.requirements.join('\n'));
    setResponsibilitiesInput(vac.responsibilities.join('\n'));
    setBenefitsInput(vac.benefits.join('\n'));
    setIsUrgent(Boolean(vac.isUrgent));
    setIsModalOpen(true);
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    const requirementsArr = requirementsInput.split('\n').filter((line) => line.trim().length > 0);
    const responsibilitiesArr = responsibilitiesInput.split('\n').filter((line) => line.trim().length > 0);
    const benefitsArr = benefitsInput.split('\n').filter((line) => line.trim().length > 0);

    const payload = {
      title,
      company: company || 'Empresa Cliente Confidencial',
      category,
      location,
      workMode,
      salaryRange,
      description,
      requirements: requirementsArr.length ? requirementsArr : ['Sin requisitos adicionales especificados'],
      responsibilities: responsibilitiesArr.length ? responsibilitiesArr : ['Cumplimiento de tareas asignadas'],
      benefits: benefitsArr.length ? benefitsArr : ['Prestaciones completas de ley'],
      isUrgent,
    };

    if (editingVacancy) {
      await updateVacancy(editingVacancy.id, payload);
    } else {
      await addVacancy(payload);
    }

    setIsModalOpen(false);
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`¿Está seguro de eliminar la vacante "${name}"?`)) {
      await deleteVacancy(id);
    }
  };

  const toggleUrgent = async (vac: Vacancy) => {
    await updateVacancy(vac.id, { isUrgent: !vac.isUrgent });
  };

  return (
    <div className="space-y-6 pb-10">
      {/* Header Action Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900">Gestión de Vacantes de Empleo</h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Cree, edite o desactive las plazas publicadas en la Bolsa de Trabajo de Soluciones Empresariales.
              </p>
            </div>

            <button
              onClick={openCreateModal}
              className="px-4 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-extrabold text-xs shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Publicar Nueva Vacante</span>
            </button>
          </div>

          {/* Search & Category Filters */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col md:flex-row gap-3 shadow-xs">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar vacante por título, empresa o ubicación..."
                className="w-full pl-9 pr-4 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-blue-600 font-medium"
              />
            </div>

            <div className="flex items-center gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="py-2 px-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold focus:outline-none"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Vacancies Table */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-[11px] uppercase tracking-wider text-slate-600 border-b border-slate-200">
                    <th className="py-3.5 px-4 font-bold">Título de la Plaza</th>
                    <th className="py-3.5 px-4 font-bold">Categoría & Modalidad</th>
                    <th className="py-3.5 px-4 font-bold">Empresa / Ubicación</th>
                    <th className="py-3.5 px-4 font-bold">Salario ($ USD)</th>
                    <th className="py-3.5 px-4 font-bold">Urgencia</th>
                    <th className="py-3.5 px-4 font-bold text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {filteredVacancies.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-slate-500 font-medium">
                        No se encontraron vacantes registradas.
                      </td>
                    </tr>
                  ) : (
                    filteredVacancies.map((vac) => (
                      <tr key={vac.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 px-4">
                          <span className="font-extrabold text-slate-900 block">{vac.title}</span>
                          <span className="text-[10px] text-slate-400">Publicado: {vac.postedAt}</span>
                        </td>
                        <td className="py-3.5 px-4 space-y-0.5">
                          <span className="font-bold text-blue-700 block">{vac.category}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-semibold inline-block">
                            {vac.workMode}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-semibold text-slate-800 block">{vac.company}</span>
                          <span className="text-slate-500 text-[11px]">{vac.location}</span>
                        </td>
                        <td className="py-3.5 px-4 font-bold text-slate-900">
                          {vac.salaryRange}
                        </td>
                        <td className="py-3.5 px-4">
                          <button
                            onClick={() => toggleUrgent(vac)}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-colors flex items-center gap-1 ${
                              vac.isUrgent
                                ? 'bg-amber-100 text-amber-900 border-amber-300'
                                : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                            }`}
                          >
                            <Sparkles className={`w-3 h-3 ${vac.isUrgent ? 'text-amber-700' : 'text-slate-400'}`} />
                            <span>{vac.isUrgent ? 'Urgente' : 'Normal'}</span>
                          </button>
                        </td>
                        <td className="py-3.5 px-4 text-right space-x-2">
                          <button
                            onClick={() => openEditModal(vac)}
                            className="p-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                            title="Editar Vacante"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(vac.id, vac.title)}
                            className="p-1.5 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 transition-colors"
                            title="Eliminar Vacante"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>

      {/* Modal Creación / Edición de Vacante */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in duration-200">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-blue-700" />
                <h3 className="text-lg font-extrabold text-slate-900">
                  {editingVacancy ? 'Editar Vacante de Empleo' : 'Publicar Nueva Vacante'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmitForm} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Título de la Plaza / Empleo</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="ej. Contador General o Asistente de Operaciones"
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm font-semibold shadow-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Empresa Cliente (o Confidencial)</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Empresa Cliente Confidencial"
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm font-semibold shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Categoría Laboral</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as JobCategory)}
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm font-semibold shadow-xs"
                  >
                    <option value="Finanzas y Contabilidad">Finanzas y Contabilidad</option>
                    <option value="Operaciones y Logística">Operaciones y Logística</option>
                    <option value="Ventas y Atención al Cliente">Ventas y Atención al Cliente</option>
                    <option value="Administración">Administración</option>
                    <option value="Tecnología">Tecnología</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Ubicación</label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Chalatenango Sur"
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm font-semibold shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Modalidad</label>
                  <select
                    value={workMode}
                    onChange={(e) => setWorkMode(e.target.value as WorkMode)}
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm font-semibold shadow-xs"
                  >
                    <option value="Presencial">Presencial</option>
                    <option value="Híbrido">Híbrido</option>
                    <option value="Remoto">Remoto</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Rango Salarial ($ USD)</label>
                  <input
                    type="text"
                    required
                    value={salaryRange}
                    onChange={(e) => setSalaryRange(e.target.value)}
                    placeholder="$600 - $800 USD"
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm font-semibold shadow-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Descripción de la Vacante</label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detalle la función principal del puesto..."
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm font-medium shadow-xs"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Requisitos (1 por línea)</label>
                  <textarea
                    rows={3}
                    value={requirementsInput}
                    onChange={(e) => setRequirementsInput(e.target.value)}
                    placeholder="Licenciatura o técnico&#10;Experiencia 2 años"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs font-medium shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Responsabilidades (1 por línea)</label>
                  <textarea
                    rows={3}
                    value={responsibilitiesInput}
                    onChange={(e) => setResponsibilitiesInput(e.target.value)}
                    placeholder="Elaborar informes&#10;Atención a clientes"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs font-medium shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Beneficios (1 por línea)</label>
                  <textarea
                    rows={3}
                    value={benefitsInput}
                    onChange={(e) => setBenefitsInput(e.target.value)}
                    placeholder="Seguro médico hospitalario&#10;Aguinaldo según ley"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs font-medium shadow-xs"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="urgentCheck"
                  checked={isUrgent}
                  onChange={(e) => setIsUrgent(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-700 border-slate-300"
                />
                <label htmlFor="urgentCheck" className="text-xs font-bold text-slate-800 cursor-pointer">
                  Marcar como Vacante Urgente (Destacada)
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-extrabold text-xs shadow-md"
                >
                  {editingVacancy ? 'Guardar Cambios' : 'Publicar Vacante'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}
    </div>
  );
}
