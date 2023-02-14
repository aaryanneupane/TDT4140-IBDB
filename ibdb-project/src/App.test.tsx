import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders addBook button', () => {
  render(<App />);
  const linkElement = screen.getByText(/Add Book/i);
  expect(linkElement).toBeInTheDocument();
});


