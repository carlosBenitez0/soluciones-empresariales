'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { Category } from '@/types';
import { Plus, Search, Edit2, Trash2, X, Tags, Power } from 'lucide-react';

export default function AdminCategoriasPage() {
  const { isAdmin } = useAuth();
  const { categories, vacancies, addCategory, updateCategory, deleteCategory } = useData();
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [name, setName] = useState('');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (!isAdmin) {
      router.push('/admin/login');
    }
  }, [isAdmin, router]);

  if (!isAdmin) return null;

  const vacancyCount = (categoryName: string) => vacancies.filter((v) => v.category === categoryName).length;

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openCreateModal = () => {
    setEditingCategory(null);
    setName('');
    setFormError('');
    setIsModalOpen(true);
  };

  const openEditModal = (cat: Category) => {
    setEditingCategory(cat);
    setName(cat.name);
    setFormError('');
    setIsModalOpen(true);
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;

    const duplicate = categories.some(
      (c) => c.name.toLowerCase() === trimmed.toLowerCase() && c.id !== editingCategory?.id
    );
    if (duplicate) {
      setFormError('Ya existe una categoría con ese nombre.');
      return;
    }

    if (editingCategory) {
      await updateCategory(editingCategory.id, { name: trimmed });
    } else {
      await addCategory(trimmed);
    }
    setIsModalOpen(false);
  };

  const handleDelete = async (cat: Category) => {
    const count = vacancyCount(cat.name);
    if (count > 0) {
      alert(
        `La categoría "${cat.name}" tiene ${count} vacante(s) asignada(s). Reasígnelas o desactive la categoría en lugar de eliminarla.`
      );
      return;
    }
    if (confirm(`¿Está seguro de eliminar la categoría "${cat.name}"?`)) {
      await deleteCategory(cat.id);
    }
  };

  const statusToggle = (cat: Category) => (
    <button
      onClick={() => updateCategory(cat.id, { isActive: !cat.isActive })}
      title={cat.isActive ? 'Desactivar categoría' : 'Activar categoría'}
      className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-colors inline-flex items-center gap-1 whitespace-nowrap ${
        cat.isActive
          ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
          : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
      }`}
    >
      <Power className={`w-3 h-3 ${cat.isActive ? 'text-emerald-700' : 'text-slate-400'}`} />
      <span>{cat.isActive ? 'Activa' : 'Inactiva'}</span>
    </button>
  );

  const rowActions = (cat: Category) => (
    <div className="flex items-center justify-end gap-2">
      <button
        onClick={() => openEditModal(cat)}
        className="p-2 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
        title="Editar Categoría"
        aria-label={`Editar ${cat.name}`}
      >
        <Edit2 className="w-3.5 h-3.5" />
      </button>
      <button
        onClick={() => handleDelete(cat)}
        className="p-2 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 transition-colors"
        title="Eliminar Categoría"
        aria-label={`Eliminar ${cat.name}`}
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
            <h1 className="text-2xl font-extrabold text-slate-900">Gestión de Categorías</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Áreas laborales disponibles para vacantes, filtros de la Bolsa de Trabajo y solicitudes de empresas.
            </p>
          </div>

          <button
            onClick={openCreateModal}
            className="px-4 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-extrabold text-xs shadow-md transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Nueva Categoría</span>
          </button>
        </div>

        {/* Search */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar categoría..."
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-blue-600 font-medium"
            />
          </div>
        </div>

        {/* Categories: table from sm, cards on phones */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          {filteredCategories.length === 0 ? (
            <p className="py-8 text-center text-xs text-slate-500 font-medium">No se encontraron categorías.</p>
          ) : (
            <>
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-[11px] uppercase tracking-wider text-slate-600 border-b border-slate-200">
                      <th className="py-3.5 px-4 font-bold">Categoría</th>
                      <th className="py-3.5 px-4 font-bold">Vacantes</th>
                      <th className="py-3.5 px-4 font-bold">Estado</th>
                      <th className="py-3.5 px-4 font-bold text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {filteredCategories.map((cat) => (
                      <tr
                        key={cat.id}
                        className={`hover:bg-slate-50/70 transition-colors ${cat.isActive ? '' : 'opacity-60'}`}
                      >
                        <td className="py-3.5 px-4 font-extrabold text-slate-900">{cat.name}</td>
                        <td className="py-3.5 px-4 font-semibold text-slate-700">{vacancyCount(cat.name)}</td>
                        <td className="py-3.5 px-4">{statusToggle(cat)}</td>
                        <td className="py-3.5 px-4">{rowActions(cat)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <ul className="sm:hidden divide-y divide-slate-100">
                {filteredCategories.map((cat) => (
                  <li key={cat.id} className={`p-4 flex items-center justify-between gap-3 ${cat.isActive ? '' : 'opacity-60'}`}>
                    <div className="min-w-0 space-y-1.5">
                      <h3 className="text-sm font-extrabold text-slate-900">{cat.name}</h3>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500">
                        {statusToggle(cat)}
                        <span className="whitespace-nowrap">{vacancyCount(cat.name)} vacantes</span>
                      </div>
                    </div>
                    {rowActions(cat)}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>

      {/* Modal Creación / Edición */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in duration-200">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <Tags className="w-5 h-5 text-blue-700" />
                <h3 className="text-lg font-extrabold text-slate-900">
                  {editingCategory ? 'Editar Categoría' : 'Nueva Categoría'}
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
                <label className="block text-xs font-bold text-slate-700 mb-1">Nombre de la Categoría</label>
                <input
                  type="text"
                  required
                  autoFocus
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setFormError('');
                  }}
                  placeholder="ej. Salud y Enfermería"
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm font-semibold shadow-xs"
                />
                {formError && <p className="text-xs text-red-600 font-semibold mt-1.5">{formError}</p>}
                {editingCategory && vacancyCount(editingCategory.name) > 0 && (
                  <p className="text-[11px] text-slate-500 mt-1.5">
                    Al renombrarla, las {vacancyCount(editingCategory.name)} vacante(s) de esta categoría se actualizarán.
                  </p>
                )}
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
                  {editingCategory ? 'Guardar Cambios' : 'Crear Categoría'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
