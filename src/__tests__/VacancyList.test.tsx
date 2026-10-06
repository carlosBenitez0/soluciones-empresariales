import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { VacancyList } from '../components/vacancies/VacancyList';
import { INITIAL_VACANCIES } from '../data/mockData';

describe('VacancyList Component', () => {
  it('renders active job vacancies', () => {
    const handleAddApplication = vi.fn();
    render(
      <VacancyList
        vacancies={INITIAL_VACANCIES}
        onAddApplication={handleAddApplication}
      />
    );

    expect(screen.getByText('Bolsa de Trabajo para')).toBeDefined();
    expect(screen.getByPlaceholderText('Buscar por puesto, requisito o ubicación...')).toBeDefined();
  });

  it('filters vacancies by search term', () => {
    const handleAddApplication = vi.fn();
    render(
      <VacancyList
        vacancies={INITIAL_VACANCIES}
        onAddApplication={handleAddApplication}
      />
    );

    const searchInput = screen.getByPlaceholderText('Buscar por puesto, requisito o ubicación...');
    fireEvent.change(searchInput, { target: { value: 'Analista' } });

    expect(screen.getByText('Analista Contable y de Planillas')).toBeDefined();
  });
});
