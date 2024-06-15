import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';
import Toggle from '.';

describe('<Toggle /> ', () => {
  test('it should mount', () => {
    const toggle = render(<Toggle checked={true} />);

    expect(toggle).toBeInTheDocument();
  });
});
