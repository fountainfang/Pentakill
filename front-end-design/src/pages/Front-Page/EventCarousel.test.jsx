import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import EventCarousel from './EventCarousel'; 

describe('EventCarousel', () => {
  const mockItems = [
    { imageUrl: 'http://example.com/image1.jpg', name: 'Image 1' },
    { imageUrl: 'http://example.com/image2.jpg', name: 'Image 2' },
    { imageUrl: 'http://example.com/image3.jpg', name: 'Image 3' },
  ];

  test('renders without crashing', () => {
    render(<EventCarousel items={mockItems} />);
    expect(screen.getByAltText(mockItems[0].name)).toBeInTheDocument();
  });

  test('renders all carousel items', () => {
    render(<EventCarousel items={mockItems} />);
    mockItems.forEach((item) => {
      expect(screen.getByAltText(item.name)).toBeInTheDocument();
      expect(screen.getByAltText(item.name)).toHaveAttribute('src', item.imageUrl);
    });
  });
});
