import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Navbar } from '../components/layout/Navbar';

describe('Navbar Component', () => {
  it('renders branding and title correctly', () => {
    render(<Navbar activeTab="inicio" />);
    expect(screen.getByText('Soluciones Empresariales')).toBeDefined();
    expect(screen.getByText('Staffing SV')).toBeDefined();
  });

  it('triggers active tab callback on click', () => {
    const setActiveTabMock = vi.fn();
    render(<Navbar activeTab="inicio" setActiveTab={setActiveTabMock} />);
    
    const vacantesBtn = screen.getByText('Bolsa de Trabajo');
    fireEvent.click(vacantesBtn);
    
    expect(setActiveTabMock).toHaveBeenCalledWith('vacantes');
  });
});
