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

  it('renders the category filter from the categories prop', () => {
    render(
      <VacancyList
        vacancies={INITIAL_VACANCIES}
        categories={['Salud y Enfermería']}
        onAddApplication={vi.fn()}
      />
    );

    expect(screen.getByRole('option', { name: 'Salud y Enfermería' })).toBeDefined();
    expect(screen.queryByRole('option', { name: 'Tecnología' })).toBeNull();
  });
});

describe('VacancyList progressive loading', () => {
  const many = Array.from({ length: 40 }, (_, i) => ({
    ...INITIAL_VACANCIES[0],
    id: `vac-test-${i}`,
    title: `Plaza de prueba ${i + 1}`,
  }));
  const titles = () => screen.queryAllByRole('heading', { level: 3, name: /^Plaza de prueba/ });

  it('shows 27 vacancies first and loads the rest on demand', () => {
    render(<VacancyList vacancies={many} onAddApplication={vi.fn()} />);

    expect(titles()).toHaveLength(27);
    expect(screen.getByText('Mostrando 27 de 40 vacantes')).toBeDefined();

    fireEvent.click(screen.getByRole('button', { name: 'Cargar más vacantes' }));

    expect(titles()).toHaveLength(40);
    expect(screen.queryByRole('button', { name: 'Cargar más vacantes' })).toBeNull();
  });

  it('goes back to the first batch when the filters change', () => {
    render(<VacancyList vacancies={many} onAddApplication={vi.fn()} />);
    fireEvent.click(screen.getByRole('button', { name: 'Cargar más vacantes' }));

    fireEvent.change(screen.getByPlaceholderText('Buscar por puesto, requisito o ubicación...'), {
      target: { value: 'Plaza de prueba' },
    });

    expect(titles()).toHaveLength(27);
  });
});
