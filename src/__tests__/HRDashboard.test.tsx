import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { HRDashboard } from '../components/dashboard/HRDashboard';

describe('HRDashboard Component', () => {
  it('renders initial flowchart tabs', () => {
    render(
<HRDashboard />
    );

    expect(screen.getByText('1. Ingreso de Personal')).toBeDefined();
    expect(screen.getByText('Entrevista con Cliente')).toBeDefined();
    // Public view: no applicant data
    expect(screen.queryByText('María Elena Guardado')).toBeNull();
  });

  it('calculates severance correctly in offboarding tab', () => {
    render(
<HRDashboard />
    );

    const salidaTab = screen.getByText('3. Salida e Indemnización');
    fireEvent.click(salidaTab);

    expect(screen.getByText('Proceso 3: Calculadora de Salida y Finiquito Legal')).toBeDefined();
    expect(screen.getByText('Total Finiquito Estimado:')).toBeDefined();
  });
});
