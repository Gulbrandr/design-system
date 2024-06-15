import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ChildrenModal from '.';

describe('<ChildrenModal />', () => {
  test('it should mount', () => {
    render(<ChildrenModal />);

    const childrenModal = screen.getByTestId('ChildrenModal');

    expect(childrenModal).toBeInTheDocument();
  });
});
