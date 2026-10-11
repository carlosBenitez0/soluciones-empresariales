'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { Pagination, paginate, usePageState } from '@/components/admin/Pagination';
import { ClientCompany, ClientCompanyStatus } from '@/types';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  Building,
  CheckCircle2,
  Power,
  KeyRound,
  Copy,
  RefreshCw,
} from 'lucide-react';

const STATUS_STYLES: Record<ClientCompanyStatus, string> = {
  Pendiente: 'bg-amber-100 text-amber-900 border-amber-300',
  Aprobada: 'bg-emerald-100 text-emerald-900 border-emerald-300',
  Inactiva: 'bg-slate-100 text-slate-600 border-slate-200',
};

export default function AdminEmpresasPage() {
  const { isAdmin } = useAuth();
  const {
    clientCompanies,
    vacancies,
    candidateApplications,
    registerClientCompany,
    approveClientCompany,
    updateClientCompany,
    regenerateAccessCode,
    deleteClientCompany,
  } = useData();
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'Todas' | ClientCompanyStatus>('Todas');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState<ClientCompany | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const { page, setPage } = usePageState(`${searchTerm}|${selectedStatus}`);

  useEffect(() => {
    if (!isAdmin) {
      router.push('/admin/login');
    }
  }, [isAdmin, router]);

  if (!isAdmin) return null;

  const companyVacancyIds = (companyId: string) =>
    vacancies.filter((v) => v.companyId === companyId).map((v) => v.id);

  const applicantCount = (companyId: string) => {
    const ids = companyVacancyIds(companyId);
    return candidateApplications.filter((a) => a.vacancyId && ids.includes(a.vacancyId)).length;
  };

  const filteredCompanies = clientCompanies.filter((c) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      c.name.toLowerCase().includes(term) ||
      c.contactName.toLowerCase().includes(term) ||
      c.email.toLowerCase().includes(term);
    const matchesStatus = selectedStatus === 'Todas' || c.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const openCreateModal = () => {
    setEditingCompany(null);
    setName('');
    setContactName('');
    setEmail('');
    setPhone('');
    setIsModalOpen(true);
  };

  const openEditModal = (company: ClientCompany) => {
    setEditingCompany(company);
    setName(company.name);
    setContactName(company.contactName);
    setEmail(company.email);
    setPhone(company.phone);
    setIsModalOpen(true);
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !contactName || !email || !phone) return;

    const payload = { name: name.trim(), contactName: contactName.trim(), email: email.trim(), phone: phone.trim() };
    if (editingCompany) {
      await updateClientCompany(editingCompany.id, payload);
    } else {
      // Companies created by the admin are approved right away
      const created = await registerClientCompany(payload);
      await approveClientCompany(created.id);
    }
    setIsModalOpen(false);
  };

  const handleApprove = async (company: ClientCompany) => {
    await approveClientCompany(company.id);
  };

  const handleToggleActive = async (company: ClientCompany) => {
    await updateClientCompany(company.id, { status: company.status === 'Inactiva' ? 'Aprobada' : 'Inactiva' });
  };

  const handleRegenerate = async (company: ClientCompany) => {
    if (confirm(`¿Generar un nuevo código de acceso para "${company.name}"? El código anterior dejará de funcionar.`)) {
      await regenerateAccessCode(company.id);
    }
  };

  const handleCopy = async (company: ClientCompany) => {
    if (!company.accessCode) return;
    try {
      await navigator.clipboard.writeText(company.accessCode);
      setCopiedId(company.id);
      setTimeout(() => setCopiedId(null), 1500);
    } catch {
      prompt('Copie el código de acceso:', company.accessCode);
    }
  };

  const handleDelete = async (company: ClientCompany) => {
    const linked = companyVacancyIds(company.id).length;
    const warning = linked > 0 ? ` Sus ${linked} vacante(s) seguirán publicadas pero sin empresa asignada.` : '';
    if (confirm(`¿Está seguro de eliminar la empresa "${company.name}"?${warning}`)) {
      await deleteClientCompany(company.id);
    }
  };

  const pageSlice = paginate(filteredCompanies, page);

  const statusBadge = (company: ClientCompany) => (
    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border inline-block whitespace-nowrap ${STATUS_STYLES[company.status]}`}>
      {company.status}
    </span>
  );

  const accessCodeCell = (company: ClientCompany) =>
    company.accessCode ? (
      <div className="flex items-center gap-1">
        <code className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded whitespace-nowrap">
          {company.accessCode}
        </code>
        <button
          onClick={() => handleCopy(company)}
          className="p-1.5 rounded text-slate-500 hover:text-blue-700 hover:bg-blue-50"
          title="Copiar código"
          aria-label={`Copiar código de ${company.name}`}
        >
          {copiedId === company.id ? (
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
        </button>
        <button
          onClick={() => handleRegenerate(company)}
          className="p-1.5 rounded text-slate-500 hover:text-amber-700 hover:bg-amber-50"
          title="Generar nuevo código"
          aria-label={`Generar nuevo código para ${company.name}`}
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>
    ) : (
      <span className="text-slate-400 italic whitespace-nowrap">Se genera al aprobar</span>
    );

  const rowActions = (company: ClientCompany) => (
    <div className="flex items-center justify-end gap-2">
      {company.status === 'Pendiente' ? (
        <button
          onClick={() => handleApprove(company)}
          className="px-2.5 py-1.5 rounded-lg bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition-colors inline-flex items-center gap-1 whitespace-nowrap"
          title="Aprobar empresa y generar código"
        >
          <KeyRound className="w-3.5 h-3.5" />
          Aprobar
        </button>
      ) : (
        <button
          onClick={() => handleToggleActive(company)}
          className="p-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
          title={company.status === 'Inactiva' ? 'Reactivar empresa' : 'Desactivar acceso al portal'}
          aria-label={company.status === 'Inactiva' ? `Reactivar ${company.name}` : `Desactivar ${company.name}`}
        >
          <Power className="w-3.5 h-3.5" />
        </button>
      )}
      <button
        onClick={() => openEditModal(company)}
        className="p-2 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
        title="Editar Empresa"
        aria-label={`Editar ${company.name}`}
      >
        <Edit2 className="w-3.5 h-3.5" />
      </button>
      <button
        onClick={() => handleDelete(company)}
        className="p-2 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 transition-colors"
        title="Eliminar Empresa"
        aria-label={`Eliminar ${company.name}`}
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </div>
  );

  return (
    <>
      <div className="space-y-6 pb-10">
        {/* Header Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">Empresas Clientes</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Apruebe los registros de empresas y entrégueles su código de acceso al Portal de Empresas.
            </p>
          </div>

          <button
            onClick={openCreateModal}
            className="px-4 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-extrabold text-xs shadow-md transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Registrar Empresa</span>
          </button>
        </div>

        {/* Search & Status Filters */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col md:flex-row gap-3 shadow-xs">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por empresa, contacto o correo..."
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-blue-600 font-medium"
            />
          </div>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as 'Todas' | ClientCompanyStatus)}
            aria-label="Filtrar por estado"
            className="w-full md:w-auto py-2 px-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold focus:outline-none"
          >
            <option value="Todas">Todos los estados</option>
            <option value="Pendiente">Pendientes</option>
            <option value="Aprobada">Aprobadas</option>
            <option value="Inactiva">Inactivas</option>
          </select>
        </div>

        {/* Companies: table from xl, cards below */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          {filteredCompanies.length === 0 ? (
            <p className="py-8 text-center text-xs text-slate-500 font-medium">No hay empresas registradas.</p>
          ) : (
            <>
              <div className="hidden xl:block overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-[11px] uppercase tracking-wider text-slate-600 border-b border-slate-200">
                      <th className="py-3.5 px-4 font-bold">Empresa</th>
                      <th className="py-3.5 px-3 font-bold">Contacto</th>
                      <th className="py-3.5 px-3 font-bold">Plazas</th>
                      <th className="py-3.5 px-3 font-bold">Código de Acceso</th>
                      <th className="py-3.5 px-3 pr-4 font-bold text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {pageSlice.pageItems.map((company) => (
                      <tr
                        key={company.id}
                        className={`hover:bg-slate-50/70 transition-colors ${company.status === 'Inactiva' ? 'opacity-60' : ''}`}
                      >
                        <td className="py-3.5 px-4">
                          <span className="font-extrabold text-slate-900 block">{company.name}</span>
                          <div className="flex items-center gap-2 mt-1">
                            {statusBadge(company)}
                            <span className="text-[10px] text-slate-400 whitespace-nowrap">Registrada: {company.createdAt}</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-3">
                          <span className="font-semibold text-slate-800 block">{company.contactName}</span>
                          <span className="text-slate-500 text-[11px] block wrap-anywhere">{company.email}</span>
                          <span className="text-slate-500 text-[11px] whitespace-nowrap">{company.phone}</span>
                        </td>
                        <td className="py-3.5 px-3 font-semibold text-slate-700 whitespace-nowrap">
                          <span className="block">{companyVacancyIds(company.id).length} plazas</span>
                          <span className="block text-slate-500">{applicantCount(company.id)} postulantes</span>
                        </td>
                        <td className="py-3.5 px-3">{accessCodeCell(company)}</td>
                        <td className="py-3.5 px-3 pr-4">{rowActions(company)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <ul className="xl:hidden grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-100">
                {pageSlice.pageItems.map((company) => (
                  <li key={company.id} className={`bg-white p-4 space-y-3 text-xs ${company.status === 'Inactiva' ? 'opacity-60' : ''}`}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="text-sm font-extrabold text-slate-900">{company.name}</h3>
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          {statusBadge(company)}
                          <span className="text-[10px] text-slate-400">Registrada: {company.createdAt}</span>
                        </div>
                      </div>
                      <span className="font-semibold text-slate-700 text-right whitespace-nowrap">
                        {companyVacancyIds(company.id).length} plazas
                        <span className="block text-slate-500">{applicantCount(company.id)} postulantes</span>
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold text-slate-800 block">{company.contactName}</span>
                      <span className="text-slate-500 text-[11px] block wrap-anywhere">{company.email} · {company.phone}</span>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                      {accessCodeCell(company)}
                      {rowActions(company)}
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
          <Pagination slice={pageSlice} onPageChange={setPage} label="empresas" />
        </div>
      </div>

      {/* Modal Creación / Edición */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in duration-200">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <Building className="w-5 h-5 text-blue-700" />
                <h3 className="text-lg font-extrabold text-slate-900">
                  {editingCompany ? 'Editar Empresa' : 'Registrar Empresa Cliente'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nombre de la Empresa</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="ej. Industrias del Norte S.A. de C.V."
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm font-semibold shadow-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Persona de Contacto</label>
                <input
                  type="text"
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="ej. Lic. Ana Martínez"
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm font-semibold shadow-xs"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Correo</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="rrhh@empresa.sv"
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm font-semibold shadow-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Teléfono</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+503 2000-0000"
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm font-semibold shadow-xs"
                  />
                </div>
              </div>
              {!editingCompany && (
                <p className="text-[11px] text-slate-500">
                  Las empresas registradas desde el panel quedan aprobadas y reciben su código de acceso de inmediato.
                </p>
              )}

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
                  {editingCompany ? 'Guardar Cambios' : 'Registrar Empresa'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
