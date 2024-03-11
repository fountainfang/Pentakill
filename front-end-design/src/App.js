import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TheaterFrontPage from './Front-Page/HomePage';
import TicketPurchase from './Purchase-Page/TicketPurchase';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<TheaterFrontPage />} />
      <Route path="/purchase" element={<TicketPurchase />} />
    </Routes>
  </BrowserRouter>
);

export default App;
