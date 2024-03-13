import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from './Navbar';
import { BrowserRouter } from 'react-router-dom';

// Mock useNavigate
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

describe('Navbar Component', () => {
  // Resets
  beforeEach(() => mockedNavigate.mockClear());

  test('renders navbar and checks for presence of all navigation buttons', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    // Check for button texts indicating rendering
    const buttonLabels = ['Home', "What's On", 'Tickets', 'News & Interviews', 'Reviews', 'Locations', 'Info', 'Login', 'Sign-up'];
    buttonLabels.forEach(label => {
      expect(screen.getByRole('button', { name: label })).toBeInTheDocument();
    });

    // Check for the search input
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test('navigates to correct path on button click', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    //clicking the 'Home' button
    const homeButton = screen.getByRole('button', { name: 'Home' });
    fireEvent.click(homeButton);
    expect(mockedNavigate).toHaveBeenCalledWith('/');

  });

  test('search input has correct adornment', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    const searchInput = screen.getByRole('textbox');
    expect(searchInput).toHaveAttribute('aria-describedby'); // Checks if adornment is present
    // This assertion is quite basic. Depending on your setup, you may want to check the adornment more thoroughly.
  });
});
