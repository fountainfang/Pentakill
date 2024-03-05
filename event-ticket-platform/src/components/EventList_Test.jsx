// TheaterFrontPage.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import TheaterFrontPage from './TheaterFrontPage'; // Adjust the import path as necessary
import TicketPurchase from './TicketPurchase'; // Adjust the import path as necessary
import '@testing-library/jest-dom/extend-expect';

describe('Navigation to the TicketPurchase page', () => {
  test('navigates to the TicketPurchase page when click on buy ticket', async () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<EventList />} />
          <Route path="/purchase" element={<TicketPurchase />} />
        </Routes>
      </MemoryRouter>
    );

    // "Buy Tickets" button
    fireEvent.click(getByText(/Buy Tickets/i));
    
    // wait for the TicketPurchase component to be rendered
    const purchasePageText = await findByText(/Purchase Tickets/i);

    // Check visibility
    expect(purchasePageText).toBeInTheDocument();
  });
});
