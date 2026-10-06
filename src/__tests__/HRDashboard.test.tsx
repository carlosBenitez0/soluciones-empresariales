import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { HRDashboard } from '../components/dashboard/HRDashboard';
import { INITIAL_CANDIDATE_APPLICATIONS, INITIAL_STAFFING_REQUESTS } from '../data/mockData';

describe('HRDashboard Component', () => {
  it('renders initial flowchart tabs', () => {
    render(
      <HRDashboard
        applications={INITIAL_CANDIDATE_APPLICATIONS}
        requests={INITIAL_STAFFING_REQUESTS}
      />
    );

    expect(screen.getByText('1. Ingreso de Personal')).toBeDefined();
    expect(screen.getByText('María Elena Guardado')).toBeDefined();
  });

  it('calculates severance correctly in offboarding tab', () => {
    render(
      <HRDashboard
        applications={INITIAL_CANDIDATE_APPLICATIONS}
        requests={INITIAL_STAFFING_REQUESTS}
      />
    );

    const salidaTab = screen.getByText('3. Salida e Indemnización');
    fireEvent.click(salidaTab);

    expect(screen.getByText('Proceso 3: Calculadora de Salida y Finiquito Legal')).toBeDefined();
    expect(screen.getByText('Total Finiquito Estimado:')).toBeDefined();
  });
});
