import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Vacancy, StaffingRequest, CandidateApplication } from '@/types';

interface ReportData {
  vacancies: Vacancy[];
  staffingRequests: StaffingRequest[];
  candidateApplications: CandidateApplication[];
  generatedBy?: string;
}

// Format Date string
const formatDate = (d: Date) => {
  return d.toLocaleDateString('es-SV', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Add standard header & footer to PDF
const applyHeaderFooter = (doc: jsPDF, title: string, generatedBy = 'Administrador de Reclutamiento') => {
  const totalPages = doc.getNumberOfPages();
  
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    
    // Header Bar
    doc.setFillColor(15, 23, 42); // Navy Dark #0F172A
    doc.rect(0, 0, 210, 24, 'F');
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(255, 255, 255);
    doc.text('SOLUCIONES EMPRESARIALES SV', 14, 13);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(148, 163, 184); // Slate 400
    doc.text(title, 14, 19);

    doc.setFontSize(8);
    doc.text(`Generado: ${formatDate(new Date())}`, 196, 13, { align: 'right' });
    doc.text(`Por: ${generatedBy}`, 196, 19, { align: 'right' });

    // Footer Bar
    doc.setDrawColor(226, 232, 240);
    doc.line(14, 280, 196, 280);

    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text('Soluciones Empresariales SV - Documento Oficial Confidencial de Recursos Humanos', 14, 286);
    doc.text(`Página ${i} de ${totalPages}`, 196, 286, { align: 'right' });
  }
};

/**
 * 1. Informe Ejecutivo Completo de Reclutamiento
 */
export const generateExecutiveReportPDF = ({ vacancies, staffingRequests, candidateApplications, generatedBy }: ReportData) => {
  const doc = new jsPDF('p', 'mm', 'a4');

  // Title Banner
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(15, 23, 42);
  doc.text('INFORME EJECUTIVO DE GESTIÓN Y RECLUTAMIENTO', 14, 35);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(71, 85, 105);
  doc.text('Resumen estadístico de vacantes activas, solicitudes de clientes corporativos y postulantes procesados.', 14, 42);

  // Executive Metrics Summary Box
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(14, 48, 182, 32, 3, 3, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  
  // KPI 1
  doc.text('Vacantes Activas:', 22, 58);
  doc.setFontSize(16);
  doc.setTextColor(37, 99, 235); // Blue
  doc.text(`${vacancies.length}`, 22, 70);

  // KPI 2
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text('Solicitudes B2B:', 70, 58);
  doc.setFontSize(16);
  doc.setTextColor(217, 119, 6); // Amber
  doc.text(`${staffingRequests.length}`, 70, 70);

  // KPI 3
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text('Candidatos Activos:', 120, 58);
  doc.setFontSize(16);
  doc.setTextColor(16, 185, 129); // Emerald
  doc.text(`${candidateApplications.length}`, 120, 70);

  // KPI 4
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text('Tasa Selección:', 168, 58);
  doc.setFontSize(16);
  doc.setTextColor(99, 102, 241); // Indigo
  doc.text('88%', 168, 70);

  // Table 1: Vacantes Destacadas
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('1. Vacantes Laborales en Gestión', 14, 90);

  const vacancyRows = vacancies.map((v) => [
    v.title,
    v.company,
    v.category,
    v.workMode,
    v.salaryRange,
    v.isUrgent ? 'URGENTE' : 'Normal',
  ]);

  autoTable(doc, {
    startY: 94,
    head: [['Puesto / Título', 'Empresa', 'Categoría', 'Modalidad', 'Rango Salarial', 'Prioridad']],
    body: vacancyRows,
    headStyles: { fillColor: [15, 23, 42], textColor: 255, fontStyle: 'bold', fontSize: 9 },
    bodyStyles: { fontSize: 8, textColor: [51, 65, 85] },
    alternateRowStyles: { fillColor: [248, 250, 252] },
    margin: { left: 14, right: 14 },
  });

  // Table 2: Solicitudes Corporativas B2B
  const finalY1 = (doc as any).lastAutoTable.finalY || 140;
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('2. Requerimientos de Empresas Clientes (Staffing & Outsourcing)', 14, finalY1 + 12);

  const requestRows = staffingRequests.map((r) => [
    r.trackingCode,
    r.companyName,
    r.positionTitle,
    `${r.numberOfPositions} plaz.`,
    r.salaryBudget,
    r.status,
  ]);

  autoTable(doc, {
    startY: finalY1 + 16,
    head: [['Código', 'Empresa Cliente', 'Cargo Solicitado', 'Vacantes', 'Presupuesto', 'Estado']],
    body: requestRows,
    headStyles: { fillColor: [30, 58, 138], textColor: 255, fontStyle: 'bold', fontSize: 9 },
    bodyStyles: { fontSize: 8, textColor: [51, 65, 85] },
    alternateRowStyles: { fillColor: [248, 250, 252] },
    margin: { left: 14, right: 14 },
  });

  // Headers and Footers
  applyHeaderFooter(doc, 'Informe Ejecutivo Consolidado de Reclutamiento', generatedBy);

  doc.save(`Reporte_Ejecutivo_SE_${new Date().toISOString().split('T')[0]}.pdf`);
};

/**
 * 2. Reporte Detallado de Vacantes
 */
export const generateVacanciesReportPDF = (vacancies: Vacancy[], generatedBy?: string) => {
  const doc = new jsPDF('p', 'mm', 'a4');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(15, 23, 42);
  doc.text('REPORTE DETALLADO DE VACANTES LABORALES', 14, 35);

  const vacancyRows = vacancies.map((v) => [
    v.title,
    v.company,
    v.category,
    v.location,
    v.workMode,
    v.salaryRange,
    v.postedAt,
    v.isUrgent ? 'SÍ' : 'NO',
  ]);

  autoTable(doc, {
    startY: 42,
    head: [['Título del Puesto', 'Empresa', 'Categoría', 'Ubicación', 'Modalidad', 'Salario', 'Publicado', 'Urgente']],
    body: vacancyRows,
    headStyles: { fillColor: [15, 23, 42], textColor: 255, fontStyle: 'bold', fontSize: 9 },
    bodyStyles: { fontSize: 8, textColor: [51, 65, 85] },
    alternateRowStyles: { fillColor: [248, 250, 252] },
    margin: { left: 14, right: 14 },
  });

  applyHeaderFooter(doc, 'Reporte Oficial de Vacantes Publicadas', generatedBy);
  doc.save(`Reporte_Vacantes_SE_${new Date().toISOString().split('T')[0]}.pdf`);
};

/**
 * 3. Reporte de Solicitudes Corporativas B2B
 */
export const generateStaffingRequestsReportPDF = (requests: StaffingRequest[], generatedBy?: string) => {
  const doc = new jsPDF('p', 'mm', 'a4');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(15, 23, 42);
  doc.text('REPORTE DE SOLICITUDES CORPORATIVAS B2B', 14, 35);

  const rows = requests.map((r) => [
    r.trackingCode,
    r.companyName,
    r.contactName,
    r.positionTitle,
    r.requestType,
    `${r.numberOfPositions}`,
    r.salaryBudget,
    r.submittedAt,
    r.status,
  ]);

  autoTable(doc, {
    startY: 42,
    head: [['Código', 'Empresa', 'Contacto', 'Cargo Solicitado', 'Servicio', 'Plazas', 'Presupuesto', 'Fecha', 'Estado']],
    body: rows,
    headStyles: { fillColor: [30, 58, 138], textColor: 255, fontStyle: 'bold', fontSize: 9 },
    bodyStyles: { fontSize: 8, textColor: [51, 65, 85] },
    alternateRowStyles: { fillColor: [248, 250, 252] },
    margin: { left: 14, right: 14 },
  });

  applyHeaderFooter(doc, 'Reporte Oficial de Requerimientos Empresariales', generatedBy);
  doc.save(`Reporte_Solicitudes_B2B_SE_${new Date().toISOString().split('T')[0]}.pdf`);
};

/**
 * 4. Reporte de Candidatos & Pipeline Reclutamiento
 */
export const generateCandidatesReportPDF = (applications: CandidateApplication[], generatedBy?: string) => {
  const doc = new jsPDF('p', 'mm', 'a4');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(15, 23, 42);
  doc.text('REPORTE DE CANDIDATOS Y PIPELINE DE RECLUTAMIENTO', 14, 35);

  const rows = applications.map((a) => [
    a.trackingCode,
    a.fullName,
    a.vacancyTitle,
    `${a.experienceYears} años`,
    `$${a.expectedSalary}`,
    a.appliedAt,
    a.status,
  ]);

  autoTable(doc, {
    startY: 42,
    head: [['Código', 'Candidato', 'Puesto a que Aplica', 'Experiencia', 'Aspiración', 'Fecha', 'Etapa Actual']],
    body: rows,
    headStyles: { fillColor: [16, 185, 129], textColor: 255, fontStyle: 'bold', fontSize: 9 },
    bodyStyles: { fontSize: 8, textColor: [51, 65, 85] },
    alternateRowStyles: { fillColor: [248, 250, 252] },
    margin: { left: 14, right: 14 },
  });

  applyHeaderFooter(doc, 'Matriz de Candidatos en Evaluación', generatedBy);
  doc.save(`Reporte_Candidatos_Pipeline_SE_${new Date().toISOString().split('T')[0]}.pdf`);
};
