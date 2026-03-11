import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Home from '@/app/page';

describe('home page baseline shell', () => {
  it('renders the placeholder shell content', () => {
    render(<Home />);

    expect(
      screen.getByRole('heading', { level: 1, name: 'Calcolatrice Lievitazione' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Phase 1 baseline')).toBeInTheDocument();
    expect(screen.getByText('App Router root shell')).toBeInTheDocument();
    expect(screen.getByText('Repo pronto per quality tooling')).toBeInTheDocument();
  });
});
