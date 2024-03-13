import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import EventCard from './EventCard'; 
import { BrowserRouter } from 'react-router-dom';

// Mock useNavigate
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), 
  useNavigate: () => mockedNavigate, 
}));

describe('EventCard', () => {
  const mockEvent = {
    id: '1',
    imageUrl: 'test-image-url.jpg',
    type: 'Concert',
    title: 'The Great Escape',
    rating: 4.5,
    reviews: 200,
    price: 50,
  };

  beforeEach(() => {
    render(
      <BrowserRouter>
        <EventCard event={mockEvent} />
      </BrowserRouter>
    );
  });

  test('renders without crashing', () => {
    expect(screen.getByRole('img', { name: mockEvent.title })).toBeInTheDocument();
  });

  test('displays event type, title, rating, reviews, and price correctly', () => {
    expect(screen.getByText(mockEvent.type.toUpperCase())).toBeInTheDocument();
    expect(screen.getByText(mockEvent.title)).toBeInTheDocument();
    expect(screen.getByText(mockEvent.rating.toString())).toBeInTheDocument();
    expect(screen.getByText(`(${mockEvent.reviews.toLocaleString()})`)).toBeInTheDocument();
    expect(screen.getByText(`£${mockEvent.price}`)).toBeInTheDocument();
  });

  test('navigates to event detail page on image click', () => {
    fireEvent.click(screen.getByRole('button'));
    expect(mockedNavigate).toHaveBeenCalledWith(`/event/${mockEvent.id}`);
  });
});
