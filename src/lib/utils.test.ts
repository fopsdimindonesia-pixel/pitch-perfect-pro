import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('cn - Class Name Utility', () => {
  it('should merge basic class names', () => {
    const result = cn('px-2 py-1', 'px-4');
    expect(result).toContain('px-4');
    expect(result).toContain('py-1');
  });

  it('should handle object conditionals', () => {
    const result = cn('px-2', { 'py-4': true, 'text-lg': false });
    expect(result).toContain('px-2');
    expect(result).toContain('py-4');
    expect(result).not.toContain('text-lg');
  });

  it('should ignore null and undefined values', () => {
    const result = cn('px-2', null, undefined, 'py-1');
    expect(result).toContain('px-2');
    expect(result).toContain('py-1');
    expect(result).not.toContain('null');
    expect(result).not.toContain('undefined');
  });

  it('should handle empty strings', () => {
    const result = cn('px-2', '', 'py-1');
    expect(result).toContain('px-2');
    expect(result).toContain('py-1');
  });

  it('should handle arrays of classes', () => {
    const result = cn(['px-2', 'py-1'], 'text-base');
    expect(result).toContain('px-2');
    expect(result).toContain('py-1');
    expect(result).toContain('text-base');
  });

  it('should resolve Tailwind conflicts correctly', () => {
    // When padding conflicts, the last one should win
    const result = cn('px-2', 'px-4');
    expect(result).toContain('px-4');
    expect(result).not.toContain('px-2');
  });
});
