import { describe, it, expect } from 'vitest';
import {
  validateCompetitionForm,
} from './validation';

describe('Validation Functions', () => {
  describe('validateCompetitionForm', () => {
    it('should reject form with missing name', () => {
      const result = validateCompetitionForm({
        name: '',
        format: 'league',
        ageGroup: 'U17',
        registrationFee: '100000',
        startDate: '2026-04-01',
      });

      expect(result.isValid).toBe(false);
      expect(result.errors.some(e => e.field === 'name')).toBe(true);
    });

    it('should reject form with name too short', () => {
      const result = validateCompetitionForm({
        name: 'ab',
        format: 'league',
        ageGroup: 'U17',
        registrationFee: '100000',
        startDate: '2026-04-01',
      });

      expect(result.isValid).toBe(false);
      expect(result.errors.some(e => e.field === 'name')).toBe(true);
    });

    it('should reject form with missing format', () => {
      const result = validateCompetitionForm({
        name: 'Liga Nasional',
        format: '',
        ageGroup: 'U17',
        registrationFee: '100000',
        startDate: '2026-04-01',
      });

      expect(result.isValid).toBe(false);
      expect(result.errors.some(e => e.field === 'format')).toBe(true);
    });

    it('should reject form with missing age group', () => {
      const result = validateCompetitionForm({
        name: 'Liga Nasional',
        format: 'league',
        ageGroup: '',
        registrationFee: '100000',
        startDate: '2026-04-01',
      });

      expect(result.isValid).toBe(false);
      expect(result.errors.some(e => e.field === 'ageGroup')).toBe(true);
    });

    it('should reject form with missing registration fee', () => {
      const result = validateCompetitionForm({
        name: 'Liga Nasional',
        format: 'league',
        ageGroup: 'U17',
        registrationFee: '',
        startDate: '2026-04-01',
      });

      expect(result.isValid).toBe(false);
      expect(result.errors.some(e => e.field === 'registrationFee')).toBe(true);
    });
  });
});
