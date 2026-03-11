import { describe, expect, it } from 'vitest';
import { metadata } from '@/app/layout';

describe('app metadata baseline', () => {
  it('exposes the Italian product identity', () => {
    expect(metadata.title).toBe('Calcolatrice Lievitazione');
    expect(metadata.description).toContain('stima del lievito fresco');
  });
});
