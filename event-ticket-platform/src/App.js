import React from 'react';



import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TheaterFrontPage from './components/EventList';
import TicketPurchase from './components/TicketPurchase';
import EventDetails from './components/EventDetails'; // Adjust the path as necessary

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


