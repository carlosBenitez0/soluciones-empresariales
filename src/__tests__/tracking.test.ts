import { describe, it, expect } from 'vitest';
import { findTracking } from '../lib/tracking';
import { INITIAL_CANDIDATE_APPLICATIONS, INITIAL_STAFFING_REQUESTS } from '../data/mockData';

describe('findTracking', () => {
  it('finds an application by exact code, case-insensitive, without personal data', () => {
    const result = findTracking('app-5011', INITIAL_CANDIDATE_APPLICATIONS, INITIAL_STAFFING_REQUESTS);

    expect(result).toMatchObject({ kind: 'application', firstName: 'María', status: 'Pruebas Técnicas y Psicométricas' });
    const serialized = JSON.stringify(result);
    expect(serialized).not.toContain('mguardado@gmail.com');
    expect(serialized).not.toContain('7234-5678');
    expect(serialized).not.toContain('750');
  });

  it('finds a staffing request by code', () => {
    expect(findTracking('REQ-8810', INITIAL_CANDIDATE_APPLICATIONS, INITIAL_STAFFING_REQUESTS)).toMatchObject({
      kind: 'request',
      companyName: 'Comercializadora El Norte S.A.',
    });
  });

  it('does not match by email or partial name anymore', () => {
    expect(findTracking('mguardado@gmail.com', INITIAL_CANDIDATE_APPLICATIONS, INITIAL_STAFFING_REQUESTS)).toBeNull();
    expect(findTracking('María', INITIAL_CANDIDATE_APPLICATIONS, INITIAL_STAFFING_REQUESTS)).toBeNull();
  });
});
