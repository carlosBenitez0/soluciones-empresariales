'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { Pagination, paginate, usePageState } from '@/components/admin/Pagination';
import { Vacancy, JobCategory, WorkMode, CONFIDENTIAL_COMPANY_NAME } from '@/types';
import { Plus, Search, Edit2, Trash2, Sparkles, X, Briefcase, Power } from 'lucide-react';

export default function AdminVacantesPage() {
  const { isAdmin } = useAuth();
  const { vacancies, categories: allCategories, activeCategoryNames, clientCompanies, addVacancy, updateVacancy, deleteVacancy } = useData();
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [selectedStatus, setSelectedStatus] = useState<'Todas' | 'Activas' | 'Inactivas'>('Todas');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVacancy, setEditingVacancy] = useState<Vacancy | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [isConfidential, setIsConfidential] = useState(false);
  // Name of vacancies created before companies were registered (no companyId)
  const [legacyCompany, setLegacyCompany] = useState('');
  const [category, setCategory] = useState<JobCategory>('Administración');
  const [location, setLocation] = useState('Chalatenango Sur');
  const [workMode, setWorkMode] = useState<WorkMode>('Presencial');
  const [salaryRange, setSalaryRange] = useState('$500 - $700 USD');
  const [description, setDescription] = useState('');
  const [requirementsInput, setRequirementsInput] = useState('');
  const [responsibilitiesInput, setResponsibilitiesInput] = useState('');
  const [benefitsInput, setBenefitsInput] = useState('');
  const [isUrgent, setIsUrgent] = useState(false);

  const { page, setPage } = usePageState(`${searchTerm}|${selectedCategory}|${selectedStatus}`);

  useEffect(() => {
    if (!isAdmin) {
      router.push('/admin/login');
    }
  }, [isAdmin, router]);

  if (!isAdmin) return null;

  const categories = ['Todas', ...allCategories.map((c) => c.name)];

  const companyName = (vac: Vacancy) =>
    clientCompanies.find((c) => c.id === vac.companyId)?.name ?? vac.company;

  const selectableCompanies = clientCompanies.filter((c) => c.status === 'Aprobada' || c.id === companyId);

  const filteredVacancies = vacancies.filter((vac) => {
    const matchesSearch = vac.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          companyName(vac).toLowerCase().includes(searchTerm.toLowerCase()) ||
                          vac.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todas' || vac.category === selectedCategory;
    const isActive = vac.isActive !== false;
    const matchesStatus =
      selectedStatus === 'Todas' || (selectedStatus === 'Activas' ? isActive : !isActive);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const openCreateModal = () => {
    setEditingVacancy(null);
    setTitle('');
    setCompanyId('');
    setIsConfidential(false);
    setLegacyCompany('');
    setCategory(activeCategoryNames[0] ?? '');
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
    setCompanyId(vac.companyId ?? '');
    setIsConfidential(Boolean(vac.isConfidential) || (!vac.companyId && vac.company === CONFIDENTIAL_COMPANY_NAME));
    setLegacyCompany(vac.companyId ? '' : vac.company === CONFIDENTIAL_COMPANY_NAME ? '' : vac.company);
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

    const selectedCompany = clientCompanies.find((c) => c.id === companyId);
    const publicCompanyName = isConfidential
      ? CONFIDENTIAL_COMPANY_NAME
      : selectedCompany?.name || legacyCompany || CONFIDENTIAL_COMPANY_NAME;

    const payload = {
      title,
      company: publicCompanyName,
      companyId: companyId || undefined,
      isConfidential: publicCompanyName === CONFIDENTIAL_COMPANY_NAME,
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

  const toggleActive = async (vac: Vacancy) => {
    await updateVacancy(vac.id, { isActive: vac.isActive === false });
  };

  const pageSlice = paginate(filteredVacancies, page);

  return (
    <>
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
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as 'Todas' | 'Activas' | 'Inactivas')}
                className="py-2 px-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold focus:outline-none"
              >
                <option value="Todas">Todos los estados</option>
                <option value="Activas">Activas</option>
                <option value="Inactivas">Inactivas</option>
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
                    <th className="py-3.5 px-4 font-bold">Estado</th>
                    <th className="py-3.5 px-4 font-bold">Urgencia</th>
                    <th className="py-3.5 px-4 font-bold text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {filteredVacancies.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-slate-500 font-medium">
                        No se encontraron vacantes registradas.
                      </td>
                    </tr>
                  ) : (
                    pageSlice.pageItems.map((vac) => (
                      <tr
                        key={vac.id}
                        className={`hover:bg-slate-50/70 transition-colors ${vac.isActive === false ? 'opacity-60' : ''}`}
                      >
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
                          <span className="font-semibold text-slate-800 block">
                            {companyName(vac)}
                            {vac.isConfidential && vac.companyId && (
                              <span className="ml-1.5 text-[9px] px-1.5 py-0.5 rounded bg-slate-200 text-slate-600 font-bold uppercase">
                                Confidencial
                              </span>
                            )}
                          </span>
                          <span className="text-slate-500 text-[11px]">{vac.location}</span>
                        </td>
                        <td className="py-3.5 px-4 font-bold text-slate-900">
                          {vac.salaryRange}
                        </td>
                        <td className="py-3.5 px-4">
                          <button
                            onClick={() => toggleActive(vac)}
                            title={vac.isActive === false ? 'Activar vacante' : 'Desactivar vacante'}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-colors flex items-center gap-1 ${
                              vac.isActive === false
                                ? 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                                : 'bg-emerald-100 text-emerald-900 border-emerald-300'
                            }`}
                          >
                            <Power className={`w-3 h-3 ${vac.isActive === false ? 'text-slate-400' : 'text-emerald-700'}`} />
                            <span>{vac.isActive === false ? 'Inactiva' : 'Activa'}</span>
                          </button>
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
            <Pagination slice={pageSlice} onPageChange={setPage} label="vacantes" />
          </div>
        </div>

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
                  <label className="block text-xs font-bold text-slate-700 mb-1">Empresa Cliente</label>
                  <select
                    value={companyId}
                    onChange={(e) => {
                      setCompanyId(e.target.value);
                      if (e.target.value) setLegacyCompany('');
                    }}
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm font-semibold shadow-xs"
                  >
                    <option value="">{legacyCompany ? `${legacyCompany} (sin registrar)` : '— Sin empresa registrada —'}</option>
                    {selectableCompanies.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}{c.status !== 'Aprobada' ? ` (${c.status})` : ''}
                      </option>
                    ))}
                  </select>
                  <label className="flex items-center gap-2 mt-2 text-[11px] font-semibold text-slate-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isConfidential}
                      onChange={(e) => setIsConfidential(e.target.checked)}
                      className="w-3.5 h-3.5 rounded border-slate-300"
                    />
                    Publicar como &quot;{CONFIDENTIAL_COMPANY_NAME}&quot;
                  </label>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Categoría Laboral</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as JobCategory)}
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm font-semibold shadow-xs"
                  >
                    {activeCategoryNames.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                    {/* Keep the current value selectable when editing a vacancy whose category was deactivated */}
                    {category && !activeCategoryNames.includes(category) && (
                      <option value={category}>{category} (inactiva)</option>
                    )}
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
    </>
  );
}
