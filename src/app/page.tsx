'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/landing/Hero';
import { CompetitorMatrix } from '@/components/landing/CompetitorMatrix';
import { VacancyList } from '@/components/vacancies/VacancyList';
import { StaffingRequestForm } from '@/components/enterprise/StaffingRequestForm';
import { HRDashboard } from '@/components/dashboard/HRDashboard';
import { useData } from '@/context/DataContext';
import { StaffingRequest, CandidateApplication } from '@/types';

export default function Home() {
  const { vacancies, activeCategoryNames, addCandidateApplication, addStaffingRequest } = useData();
  const activeVacancies = vacancies.filter((v) => v.isActive !== false);

  const handleAddApplication = async (newApp: Omit<CandidateApplication, 'id' | 'appliedAt' | 'status'>) => {
    await addCandidateApplication(newApp);
  };

  const handleAddRequest = async (newReq: Omit<StaffingRequest, 'id' | 'submittedAt' | 'status'>) => {
    await addStaffingRequest(newReq);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      
      {/* Executive Navbar with Next.js router integration */}
      <Navbar />

      {/* Main Multi-Section Scroll Homepage */}
      <main className="flex-1">
        <Hero />
        <CompetitorMatrix />
        <VacancyList vacancies={activeVacancies} categories={activeCategoryNames} onAddApplication={handleAddApplication} />
        
        {/* Formulario de Solicitud de Staffing integrado siempre en la landing page */}
        <div id="solicitud">
          <StaffingRequestForm categories={activeCategoryNames} onAddRequest={handleAddRequest} />
        </div>

        <HRDashboard />
      </main>

      {/* Corporate Footer */}
      <Footer />
    </div>
  );
}
