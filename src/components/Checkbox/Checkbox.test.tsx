import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Checkbox from '.';

describe('<Checkbox />', () => {
  test('it should mount', () => {
    render(<Checkbox />);

    const checkbox = screen.getByTestId('Checkbox');

    expect(checkbox).toBeInTheDocument();
  });
});
