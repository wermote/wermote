import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import PrimaryButton from './index';

describe('<PrimaryButton/>', () => {
  test('should mount', () => {
    render(<PrimaryButton onClick={jest.fn()}>hola</PrimaryButton>);

    expect(screen.getByText('hola')).toBeVisible();
  });

  test('Should call the onClick', () => {
    const onClick = jest.fn();

    render(<PrimaryButton onClick={onClick}>Hola</PrimaryButton>);

    fireEvent.click(screen.getByText('Hola'));

    expect(onClick).toBeCalled();
  });
});
