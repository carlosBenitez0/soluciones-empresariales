'use client';

import React, { useState } from 'react';
import { StaffingRequest, RequestType, JobCategory } from '../../types';
import { Building2, CheckCircle2 } from 'lucide-react';

interface StaffingRequestFormProps {
  onAddRequest: (request: Omit<StaffingRequest, 'id' | 'submittedAt' | 'status'>) => void;
}

export const StaffingRequestForm: React.FC<StaffingRequestFormProps> = ({ onAddRequest }) => {
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [requestType, setRequestType] = useState<RequestType>('Plaza Nueva');
  const [positionTitle, setPositionTitle] = useState('');
  const [category, setCategory] = useState<JobCategory>('Administración');
  const [numberOfPositions, setNumberOfPositions] = useState<number>(1);
  const [salaryBudget, setSalaryBudget] = useState('');
  const [keyRequirements, setKeyRequirements] = useState('');
  const [urgent, setUrgent] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !contactName || !email || !phone || !positionTitle) return;

    onAddRequest({
      companyName,
      contactName,
      email,
      phone,
      requestType,
      positionTitle,
      category,
      numberOfPositions: Number(numberOfPositions),
      salaryBudget: salaryBudget || 'A convenir segun perfil',
      keyRequirements,
      urgent,
    });

    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setCompanyName('');
    setContactName('');
    setEmail('');
    setPhone('');
    setPositionTitle('');
    setKeyRequirements('');
  };

  return (
    <section className="py-12 lg:py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 border border-blue-200 text-blue-800 text-xs font-bold uppercase tracking-wider mb-3">
            Atención Especializada para Empresas
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Solicitud de <span className="text-blue-700">Staffing y Personal</span>
          </h2>
          <p className="text-slate-600 mt-2 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Delegue su proceso de búsqueda y selección. Nos encargamos de la evaluación, reclutamiento y gestión de planillas con garantía de atención en 1 a 2 días.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-md">
          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto border border-emerald-300 shadow-xs">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900">¡Solicitud de Staffing Registrada!</h3>
              <p className="text-slate-600 max-w-lg mx-auto text-sm leading-relaxed">
                Hemos recibido la solicitud para la plaza <strong className="text-blue-700">{positionTitle}</strong> de <strong className="text-slate-900">{companyName}</strong>. Un especialista en Recursos Humanos asignado responderá en menos de <strong className="text-emerald-700">24 a 48 horas</strong>.
              </p>
              <div className="pt-4">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm shadow-md transition-colors"
                >
                  Registrar Otra Solicitud
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Section 1: Tipo de Movimiento (PDF Page 11 Logic) */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <label className="block text-xs font-bold text-blue-900 uppercase tracking-wider">
                  Tipo de Solicitud de Personal (Flujograma RRHH)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className={`p-4 rounded-xl border cursor-pointer flex items-center gap-3 transition-colors ${
                    requestType === 'Plaza Nueva' ? 'bg-blue-50 border-blue-600 text-blue-950' : 'bg-white border-slate-200 text-slate-700'
                  }`}>
                    <input
                      type="radio"
                      name="requestType"
                      value="Plaza Nueva"
                      checked={requestType === 'Plaza Nueva'}
                      onChange={() => setRequestType('Plaza Nueva')}
                      className="sr-only"
                    />
                    <div className="w-4 h-4 rounded-full border border-blue-600 flex items-center justify-center shrink-0">
                      {requestType === 'Plaza Nueva' && <div className="w-2 h-2 rounded-full bg-blue-700" />}
                    </div>
                    <div>
                      <span className="font-bold block text-sm text-blue-950">Plaza Nueva</span>
                      <span className="text-xs text-slate-600">Creación de puesto por expansión de la empresa</span>
                    </div>
                  </label>

                  <label className={`p-4 rounded-xl border cursor-pointer flex items-center gap-3 transition-colors ${
                    requestType === 'Reemplazo' ? 'bg-blue-50 border-blue-600 text-blue-950' : 'bg-white border-slate-200 text-slate-700'
                  }`}>
                    <input
                      type="radio"
                      name="requestType"
                      value="Reemplazo"
                      checked={requestType === 'Reemplazo'}
                      onChange={() => setRequestType('Reemplazo')}
                      className="sr-only"
                    />
                    <div className="w-4 h-4 rounded-full border border-blue-600 flex items-center justify-center shrink-0">
                      {requestType === 'Reemplazo' && <div className="w-2 h-2 rounded-full bg-blue-700" />}
                    </div>
                    <div>
                      <span className="font-bold block text-sm text-blue-950">Reemplazo / Sustitución</span>
                      <span className="text-xs text-slate-600">Sustitución por rotación o indemnización previa</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Section 2: Datos del Puesto */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Título de la Plaza Requerida *</label>
                  <input
                    type="text"
                    required
                    value={positionTitle}
                    onChange={(e) => setPositionTitle(e.target.value)}
                    placeholder="Ej. Contador General, Ejecutivo de Ventas"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-blue-700 text-sm shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Categoría Operativa</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as JobCategory)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-blue-700 text-sm shadow-xs font-medium"
                  >
                    <option value="Administración">Administración</option>
                    <option value="Finanzas y Contabilidad">Finanzas y Contabilidad</option>
                    <option value="Operaciones y Logística">Operaciones y Logística</option>
                    <option value="Ventas y Atención al Cliente">Ventas y Atención al Cliente</option>
                    <option value="Tecnología">Tecnología</option>
                    <option value="Recursos Humanos">Recursos Humanos</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Número de Plazas Necesarias</label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={numberOfPositions}
                    onChange={(e) => setNumberOfPositions(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-blue-700 text-sm shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Presupuesto Salarial Estimado por Plaza</label>
                  <input
                    type="text"
                    value={salaryBudget}
                    onChange={(e) => setSalaryBudget(e.target.value)}
                    placeholder="Ej. $600 - $800 USD mensuales"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-blue-700 text-sm shadow-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Perfil y Requisitos Claves del Candidato</label>
                <textarea
                  rows={3}
                  value={keyRequirements}
                  onChange={(e) => setKeyRequirements(e.target.value)}
                  placeholder="Detalle experiencia requerida, grado académico, residencia en Chalatenango u otras especificaciones..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-blue-700 text-sm shadow-xs"
                />
              </div>

              {/* Urgency Checkbox */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="urgent"
                  checked={urgent}
                  onChange={(e) => setUrgent(e.target.checked)}
                  className="w-4 h-4 rounded bg-white border-slate-300 text-blue-700 focus:ring-0"
                />
                <label htmlFor="urgent" className="text-xs font-medium text-slate-700 cursor-pointer">
                  Marcar como solicitud urgente (requiere contratación acelerada &lt; 20 días)
                </label>
              </div>

              {/* Section 3: Datos de Contacto de la Empresa */}
              <div className="pt-4 border-t border-slate-200 space-y-4">
                <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                  Datos de Contacto Institucional
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Nombre de la Empresa *</label>
                    <input
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Ej. Industrias del Norte S.A."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-blue-700 text-sm shadow-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Nombre de la Persona de Contacto *</label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Ej. Lic. Carlos Rivera"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-blue-700 text-sm shadow-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Correo Corporativo *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="contacto@empresa.sv"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-blue-700 text-sm shadow-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Teléfono Directo *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+503 2000-0000"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-blue-700 text-sm shadow-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-extrabold text-sm shadow-lg shadow-blue-700/20 transition-all flex items-center justify-center gap-2"
                >
                  <Building2 className="w-5 h-5" />
                  <span>Enviar Solicitud de Staffing a Soluciones Empresariales</span>
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </section>
  );
};
