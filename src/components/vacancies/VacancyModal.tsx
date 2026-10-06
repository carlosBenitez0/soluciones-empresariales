'use client';

import React, { useState } from 'react';
import { Vacancy, CandidateApplication } from '../../types';
import { X, Briefcase, MapPin, DollarSign, CheckCircle2, Upload, Send } from 'lucide-react';

interface VacancyModalProps {
  vacancy: Vacancy | null;
  onClose: () => void;
  onSubmitApplication: (app: Omit<CandidateApplication, 'id' | 'appliedAt' | 'status'>) => void;
}

export const VacancyModal: React.FC<VacancyModalProps> = ({ vacancy, onClose, onSubmitApplication }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [experienceYears, setExperienceYears] = useState<number>(2);
  const [expectedSalary, setExpectedSalary] = useState<number>(600);
  const [coverLetter, setCoverLetter] = useState('');
  const [fileName, setFileName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!vacancy) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) return;

    onSubmitApplication({
      vacancyId: vacancy.id,
      vacancyTitle: vacancy.title,
      fullName,
      email,
      phone,
      location: location || 'El Salvador',
      experienceYears: Number(experienceYears),
      expectedSalary: Number(expectedSalary),
      resumeFileName: fileName || 'curriculum_vitae.pdf',
      coverLetter,
    });

    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white w-full max-w-3xl rounded-2xl border border-slate-200 shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-6 bg-slate-50 border-b border-slate-200 flex items-start justify-between">
          <div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
              {vacancy.category}
            </span>
            <h3 className="text-2xl font-extrabold text-slate-900 mt-1">{vacancy.title}</h3>
            <p className="text-sm text-slate-600 font-medium">{vacancy.company} • {vacancy.location}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-700 text-sm">
          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto border border-emerald-300 shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-extrabold text-slate-900">¡Postulación Enviada con Éxito!</h4>
              <p className="text-slate-600 max-w-md mx-auto">
                Hemos recibido tus datos para la vacante <strong className="text-blue-700">{vacancy.title}</strong>. Nuestro equipo de Talento Humano se pondrá en contacto contigo en un plazo estimado de <strong className="text-emerald-700">1 a 2 días hábiles</strong>.
              </p>
              <div className="pt-4">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold shadow-md"
                >
                  Cerrar Ventana
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Job Details Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 text-slate-800 font-semibold">
                  <MapPin className="w-4 h-4 text-blue-700" />
                  <span>{vacancy.location}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-800 font-semibold">
                  <Briefcase className="w-4 h-4 text-emerald-700" />
                  <span>Modalidad: {vacancy.workMode}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-800 font-semibold">
                  <DollarSign className="w-4 h-4 text-amber-700" />
                  <span>Salario: {vacancy.salaryRange}</span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-2 text-base">Descripción de la Plaza</h4>
                <p className="text-slate-600 leading-relaxed">{vacancy.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-bold text-slate-900 mb-2">Requisitos</h4>
                  <ul className="space-y-1 text-slate-600 list-disc list-inside">
                    {vacancy.requirements.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-2">Beneficios Ofrecidos</h4>
                  <ul className="space-y-1 text-slate-600 list-disc list-inside">
                    {vacancy.benefits.map((ben, i) => (
                      <li key={i}>{ben}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Form Section */}
              <div className="pt-6 border-t border-slate-200">
                <h4 className="text-lg font-extrabold text-slate-900 mb-4 flex items-center gap-2">
                  <Send className="w-5 h-5 text-blue-700" />
                  Formulario de Postulación de Candidato
                </h4>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Nombre Completo *</label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Ej. Juan Carlos Pérez"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-blue-700 text-sm shadow-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Correo Electrónico *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ejemplo@correo.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-blue-700 text-sm shadow-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Teléfono de Contacto *</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+503 7000-0000"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-blue-700 text-sm shadow-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Años de Experiencia</label>
                      <input
                        type="number"
                        min="0"
                        value={experienceYears}
                        onChange={(e) => setExperienceYears(Number(e.target.value))}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-blue-700 text-sm shadow-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Aspiración Salarial ($ USD)</label>
                      <input
                        type="number"
                        min="300"
                        value={expectedSalary}
                        onChange={(e) => setExpectedSalary(Number(e.target.value))}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-blue-700 text-sm shadow-xs"
                      />
                    </div>
                  </div>

                  {/* Resume Upload Simulation */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Adjuntar Currículum Vitae (PDF / Word)</label>
                    <div className="relative border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-xl p-4 text-center cursor-pointer bg-slate-50 transition-colors">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                      <Upload className="w-6 h-6 text-slate-500 mx-auto mb-1" />
                      <span className="text-xs text-slate-700 font-medium block">
                        {fileName ? `Archivo seleccionado: ${fileName}` : 'Haz clic para subir tu CV o arrástralo aquí'}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Comentarios o Breve Carta de Presentación</label>
                    <textarea
                      rows={3}
                      value={coverLetter}
                      onChange={(e) => setCoverLetter(e.target.value)}
                      placeholder="Menciona brevemente tus principales fortalezas o disponibilidad de horario..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-blue-700 text-sm shadow-xs"
                    />
                  </div>

                  <div className="pt-3 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2.5 rounded-xl text-slate-600 hover:text-slate-900 font-semibold text-sm"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm shadow-md"
                    >
                      Enviar Postulación
                    </button>
                  </div>
                </form>
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
};
