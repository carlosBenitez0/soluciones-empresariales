'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/landing/Hero';
import { StaffingVsOutsourcing } from '@/components/landing/StaffingVsOutsourcing';
import { CompetitorMatrix } from '@/components/landing/CompetitorMatrix';
import { VacancyList } from '@/components/vacancies/VacancyList';
import { StaffingRequestForm } from '@/components/enterprise/StaffingRequestForm';
import { HRDashboard } from '@/components/dashboard/HRDashboard';
import { INITIAL_VACANCIES, INITIAL_STAFFING_REQUESTS, INITIAL_CANDIDATE_APPLICATIONS } from '@/data/mockData';
import { Vacancy, StaffingRequest, CandidateApplication } from '@/types';

export default function Home() {
  const [vacancies] = useState<Vacancy[]>(INITIAL_VACANCIES);
  const [requests, setRequests] = useState<StaffingRequest[]>(INITIAL_STAFFING_REQUESTS);
  const [applications, setApplications] = useState<CandidateApplication[]>(INITIAL_CANDIDATE_APPLICATIONS);

  const handleAddApplication = (newApp: Omit<CandidateApplication, 'id' | 'appliedAt' | 'status'>) => {
    const created: CandidateApplication = {
      ...newApp,
      id: `app-${Date.now()}`,
      appliedAt: new Date().toISOString().split('T')[0],
      status: 'Solicitud Recibida',
    };
    setApplications([created, ...applications]);
  };

  const handleAddRequest = (newReq: Omit<StaffingRequest, 'id' | 'submittedAt' | 'status'>) => {
    const created: StaffingRequest = {
      ...newReq,
      id: `req-${Date.now()}`,
      submittedAt: new Date().toISOString().split('T')[0],
      status: 'Pendiente (1-2 días)',
    };
    setRequests([created, ...requests]);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      
      {/* Executive Navbar with Next.js router integration */}
      <Navbar />

      {/* Main Multi-Section Scroll Homepage */}
      <main className="flex-1">
        <Hero />
        <StaffingVsOutsourcing />
        <CompetitorMatrix />
        <VacancyList vacancies={vacancies} onAddApplication={handleAddApplication} />
        
        {/* Formulario de Solicitud de Staffing integrado siempre en la landing page */}
        <div id="solicitud">
          <StaffingRequestForm onAddRequest={handleAddRequest} />
        </div>

        <HRDashboard applications={applications} requests={requests} />
      </main>

      {/* Corporate Footer */}
      <Footer />
    </div>
  );
}
