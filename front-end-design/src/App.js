import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TheaterFrontPage from './Front-Page/HomePage';
import TicketPurchase from './Purchase-Page/TicketPurchase';
import EventDetails from './EventDetail-Page/EventDetails';
import Signin from "./pages/Signin/signin"
import Signup from "./pages/Signup/signup"

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<TheaterFrontPage />} />
      <Route path="/purchase" element={<TicketPurchase />} />
      <Route path="/login" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/event/:eventId" element={<EventDetails />} />
    </Routes>
  </BrowserRouter>
);

export default App;
