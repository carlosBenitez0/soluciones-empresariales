import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { StaffingRequestForm } from '../components/enterprise/StaffingRequestForm';

describe('StaffingRequestForm Component', () => {
  it('renders form inputs correctly', () => {
    const handleAddRequestMock = vi.fn();
    render(<StaffingRequestForm onAddRequest={handleAddRequestMock} />);

    expect(screen.getByText(/Staffing y Personal/i)).toBeDefined();
    expect(screen.getByPlaceholderText('Ej. Contador General, Ejecutivo de Ventas')).toBeDefined();
  });

  it('allows filling form and submitting a staffing request', () => {
    const handleAddRequestMock = vi.fn();
    render(<StaffingRequestForm onAddRequest={handleAddRequestMock} />);

    fireEvent.change(screen.getByPlaceholderText('Ej. Contador General, Ejecutivo de Ventas'), {
      target: { value: 'Gerente de Logística' }
    });
    fireEvent.change(screen.getByPlaceholderText('Ej. Industrias del Norte S.A.'), {
      target: { value: 'Empresa Test S.A.' }
    });
    fireEvent.change(screen.getByPlaceholderText('Ej. Lic. Carlos Rivera'), {
      target: { value: 'Carlos Rivera' }
    });
    fireEvent.change(screen.getByPlaceholderText('contacto@empresa.sv'), {
      target: { value: 'contacto@test.sv' }
    });
    fireEvent.change(screen.getByPlaceholderText('+503 2000-0000'), {
      target: { value: '+503 2222-3333' }
    });

    const submitBtn = screen.getByRole('button', { name: /Enviar Solicitud de Staffing/i });
    fireEvent.click(submitBtn);

    expect(handleAddRequestMock).toHaveBeenCalledWith(
      expect.objectContaining({
        positionTitle: 'Gerente de Logística',
        companyName: 'Empresa Test S.A.',
        contactName: 'Carlos Rivera',
        email: 'contacto@test.sv',
      })
    );
    expect(screen.getByText('¡Solicitud de Staffing Registrada!')).toBeDefined();
  });
});
