import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CompetitorMatrix } from '../components/landing/CompetitorMatrix';

describe('CompetitorMatrix Component', () => {
  it('renders competitor analysis matrix and toggles mobile tabs', () => {
    render(<CompetitorMatrix />);

    expect(screen.getByText(/Análisis de Competitividad/i)).toBeDefined();

    const latinTab = screen.getByRole('button', { name: /vs. Latin Top Jobs/i });
    fireEvent.click(latinTab);

    expect(latinTab.className).toContain('bg-blue-700');
  });
});
