import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TheaterFrontPage from './pages/Front-Page/HomePage';
import TicketPurchase from './pages/Purchase-Page/TicketPurchase';
import EventDetails from './pages/EventDetail-Page/EventDetails';
import Signin from "./pages/Signin/signin"
import Signup from "./pages/Signup/signup"
import PurchasingPage from './pages/Purchasing-Page/PurchasingPage';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<TheaterFrontPage />} />
      <Route path="/purchase" element={<TicketPurchase />} />
      <Route path="/purchase/:eventId" element={<PurchasingPage />} />
      <Route path="/login" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/event/:eventId" element={<EventDetails />} />
    </Routes>
  </BrowserRouter>
);

export default App;
