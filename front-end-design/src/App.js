import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TheaterFrontPage from './Front-Page/EventList';
import TicketPurchase from './Purchase-Page/TicketPurchase';
import EventDetails from './EventDetail-Page/EventDetails';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<TheaterFrontPage />} />
      <Route path="/purchase" element={<TicketPurchase />} />
      <Route path="/event/:eventId" element={<EventDetails />} />
    </Routes>
  </BrowserRouter>
);

export default App;
