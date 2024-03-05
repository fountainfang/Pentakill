import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import EventDetails from './EventDetails';

// Mock useParams dynamically
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

// Test cases for EventDetails Component
describe('EventDetails Component', () => {
  beforeEach(() => {
    require('react-router-dom').useParams.mockImplementation(() => ({ eventId: '1' }));
    render(
      <BrowserRouter>
        <EventDetails />
      </BrowserRouter>
    );
  });

  test('event title is not null', () => {
    const titleElement = screen.queryByText('TAYLOR SWIFT CONCERT');
    expect(titleElement).not.toBeNull();
  });

  test('banner image is not null', () => {
    const bannerImage = screen.queryByTestId('banner-image');
    expect(bannerImage).not.toBeNull();
  });

  test('poster image is not null', () => {
    const profileImage = screen.queryByAltText('Event Poster');
    expect(profileImage).not.toBeNull();
  });

  test('displays event not found message for an invalid event ID', () => {
    require('react-router-dom').useParams.mockImplementation(() => ({ eventId: '999' }));
    render(
      <BrowserRouter>
        <EventDetails />
      </BrowserRouter>
    );

    const notFoundMessage = screen.queryByText('Event not found.');
    expect(notFoundMessage).not.toBeNull();
  });
});
