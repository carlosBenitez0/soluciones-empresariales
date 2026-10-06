import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Navbar } from '../components/layout/Navbar';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

describe('Navbar Component', () => {
  it('renders branding and title correctly', () => {
    render(<Navbar />);
    expect(screen.getByText('Soluciones Empresariales')).toBeDefined();
  });

  it('renders navigation links with Next.js hrefs', () => {
    render(<Navbar />);
    
    const vacantesLink = screen.getByRole('link', { name: /Bolsa de Trabajo/i });
    expect(vacantesLink.getAttribute('href')).toBe('/vacantes');
    
    const empresaLink = screen.getByRole('link', { name: /Solicitar Personal/i });
    expect(empresaLink.getAttribute('href')).toBe('/solicitar-personal');
  });
});
