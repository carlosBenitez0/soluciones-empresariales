import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { VacancyModal } from '../components/vacancies/VacancyModal';
import { INITIAL_VACANCIES } from '../data/mockData';

const fillRequiredFields = () => {
  fireEvent.change(screen.getByPlaceholderText('Ej. Juan Carlos Pérez'), { target: { value: 'Ana López' } });
  fireEvent.change(screen.getByPlaceholderText('ejemplo@correo.com'), { target: { value: 'ana@test.sv' } });
  fireEvent.change(screen.getByPlaceholderText('+503 7000-0000'), { target: { value: '+503 7111-2222' } });
};

describe('VacancyModal Component', () => {
  it('requires availability before submitting an application', () => {
    const onSubmit = vi.fn();
    render(<VacancyModal vacancy={INITIAL_VACANCIES[0]} onClose={vi.fn()} onSubmitApplication={onSubmit} />);

    fillRequiredFields();
    fireEvent.click(screen.getByRole('button', { name: /Enviar Postulación/i }));

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('sends the selected availability with the application', () => {
    const onSubmit = vi.fn();
    render(<VacancyModal vacancy={INITIAL_VACANCIES[0]} onClose={vi.fn()} onSubmitApplication={onSubmit} />);

    fillRequiredFields();
    fireEvent.change(screen.getByLabelText(/Disponibilidad para Iniciar/i), { target: { value: 'Inmediata' } });
    fireEvent.click(screen.getByRole('button', { name: /Enviar Postulación/i }));

    expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ fullName: 'Ana López', availability: 'Inmediata' }));
  });
});
