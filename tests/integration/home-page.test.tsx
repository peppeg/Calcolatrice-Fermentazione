import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Home from '@/app/page';
import { calculateFreshYeast, convertFreshToDryYeastGrams, roundPracticalYeast } from '@/lib/calc';

function fillCoreInputs({
  temperatureC,
  timeHours,
  flourValue,
}: {
  temperatureC: string;
  timeHours: string;
  flourValue: string;
}) {
  fireEvent.change(screen.getByLabelText('Temperatura ambiente (\u00B0C)'), {
    target: { value: temperatureC },
  });
  fireEvent.change(screen.getByLabelText('Tempo di lievitazione (ore)'), {
    target: { value: timeHours },
  });
  fireEvent.change(screen.getByLabelText('Quantita di farina'), {
    target: { value: flourValue },
  });
}

function formatGrams(value: number) {
  return new Intl.NumberFormat('it-IT', {
    maximumFractionDigits: value < 1 ? 3 : 2,
    minimumFractionDigits: 0,
  }).format(value);
}

describe('home page calculator flow', () => {
  it('renders the editorial hero, transparency block, and initial guidance state', () => {
    render(<Home />);

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Una stima pratica del lievito fresco, con il modello sempre leggibile.',
      }),
    ).toBeInTheDocument();
    expect(screen.getByText('Formula base')).toBeInTheDocument();
    expect(
      screen.getByText(/Il numero restituito e una stima pratica, non una verita assoluta/i),
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Temperatura ambiente (\u00B0C)')).toHaveValue('');
    expect(
      screen.getByText(
        /Per vedere la stima, completa temperatura ambiente, tempo di lievitazione e quantita di farina/i,
      ),
    ).toBeInTheDocument();
  });

  it('updates the result live and shows trust context when input becomes valid', () => {
    render(<Home />);
    fillCoreInputs({ temperatureC: '24', timeHours: '8', flourValue: '500' });

    const expected = calculateFreshYeast({
      temperatureC: 24,
      timeHours: 8,
      flourValue: 500,
      flourUnit: 'g',
    });

    expect(expected.status).toBe('ok');
    const expectedFresh = expected.status === 'ok' ? expected.gramsForRecipe : 0;
    const expectedDry = roundPracticalYeast(convertFreshToDryYeastGrams(expectedFresh));

    expect(screen.getByTestId('grams-for-recipe-value')).toHaveTextContent(
      `${formatGrams(expectedFresh)} g`,
    );
    expect(screen.getByTestId('dry-yeast-for-recipe-value')).toHaveTextContent(
      `${formatGrams(expectedDry)} g`,
    );
    expect(screen.getByText('Scenario attivo')).toBeInTheDocument();
    expect(screen.getByText('Modello empirico ambiente v1')).toBeInTheDocument();
    expect(screen.getByText('Correttivi sperimentali inattivi nella v1.')).toBeInTheDocument();
    expect(screen.getByText('24 \u00B0C')).toBeInTheDocument();
    expect(screen.getByText('8 h')).toBeInTheDocument();
    expect(screen.getByText('500 g')).toBeInTheDocument();
  });

  it('recalculates correctly when the flour unit changes and keeps the scenario summary aligned', () => {
    render(<Home />);
    fillCoreInputs({ temperatureC: '24', timeHours: '8', flourValue: '1' });
    fireEvent.change(screen.getByLabelText('Unita farina'), {
      target: { value: 'kg' },
    });

    const expected = calculateFreshYeast({
      temperatureC: 24,
      timeHours: 8,
      flourValue: 1,
      flourUnit: 'kg',
    });

    expect(expected.status).toBe('ok');
    const expectedFresh = expected.status === 'ok' ? expected.gramsForRecipe : 0;
    const expectedDry = roundPracticalYeast(convertFreshToDryYeastGrams(expectedFresh));

    expect(screen.getByTestId('grams-for-recipe-value')).toHaveTextContent(
      `${formatGrams(expectedFresh)} g`,
    );
    expect(screen.getByTestId('dry-yeast-for-recipe-value')).toHaveTextContent(
      `${formatGrams(expectedDry)} g`,
    );
    expect(screen.getByText('1 kg')).toBeInTheDocument();
  });

  it('shows malformed input feedback and clears the numeric result', () => {
    render(<Home />);
    fillCoreInputs({ temperatureC: '24', timeHours: '8', flourValue: '500' });

    fireEvent.change(screen.getByLabelText('Temperatura ambiente (\u00B0C)'), {
      target: { value: 'vento' },
    });

    expect(screen.queryByTestId('grams-for-recipe-value')).not.toBeInTheDocument();
    expect(screen.getAllByText('La temperatura deve essere un numero valido.')).toHaveLength(2);
    expect(
      screen.getByText(/Correggi temperatura ambiente per vedere la stima/i),
    ).toBeInTheDocument();
  });

  it('shows field-level and summary-level feedback for domain-invalid values', () => {
    render(<Home />);
    fillCoreInputs({ temperatureC: '0', timeHours: '8', flourValue: '500' });

    expect(screen.queryByTestId('grams-for-recipe-value')).not.toBeInTheDocument();
    expect(screen.getAllByText('La temperatura deve essere maggiore di zero.')).toHaveLength(2);
    expect(
      screen.getByText(/Correggi temperatura ambiente per vedere la stima/i),
    ).toBeInTheDocument();
  });

  it('keeps the result visible when the model emits an empirical warning', () => {
    render(<Home />);
    fillCoreInputs({ temperatureC: '37', timeHours: '8', flourValue: '500' });

    expect(screen.getByTestId('grams-for-recipe-value')).toBeInTheDocument();
    expect(screen.getByTestId('dry-yeast-for-recipe-value')).toBeInTheDocument();
    expect(screen.getByText(/fuori dall'intervallo empirico di riferimento/i)).toBeInTheDocument();
  });

  it('applies presets without overwriting flour fields and resets to the initial state', () => {
    render(<Home />);
    fireEvent.change(screen.getByLabelText('Quantita di farina'), {
      target: { value: '750' },
    });
    fireEvent.change(screen.getByLabelText('Unita farina'), {
      target: { value: 'kg' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Impasto piu rapido/i }));

    expect(screen.getByLabelText('Temperatura ambiente (\u00B0C)')).toHaveValue('26');
    expect(screen.getByLabelText('Tempo di lievitazione (ore)')).toHaveValue('6');
    expect(screen.getByLabelText('Quantita di farina')).toHaveValue('750');
    expect(screen.getByLabelText('Unita farina')).toHaveValue('kg');

    fireEvent.click(screen.getByRole('button', { name: /Reset completo/i }));

    expect(screen.getByLabelText('Temperatura ambiente (\u00B0C)')).toHaveValue('');
    expect(screen.getByLabelText('Tempo di lievitazione (ore)')).toHaveValue('');
    expect(screen.getByLabelText('Quantita di farina')).toHaveValue('');
    expect(screen.getByLabelText('Unita farina')).toHaveValue('g');
    expect(screen.queryByTestId('grams-for-recipe-value')).not.toBeInTheDocument();
    expect(
      screen.getByText(
        /Per vedere la stima, completa temperatura ambiente, tempo di lievitazione e quantita di farina/i,
      ),
    ).toBeInTheDocument();
  });
});
