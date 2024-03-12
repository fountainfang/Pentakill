import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TheaterFrontPage from './pages/Front-Page/HomePage';
import TicketPurchase from './pages/Purchase-Page/TicketPurchase';
import EventDetails from './pages/EventDetail-Page/EventDetails';
import Signin from "./pages/Signin/signin"
import Signup from "./pages/Signup/signup"
import EventCreation from './pages/EventCreation-Page/EventCreation';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<TheaterFrontPage />} />
      <Route path="/purchase" element={<TicketPurchase />} />
      <Route path="/login" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/event/:eventId" element={<EventDetails />} />
      <Route path="/create-event" element={<EventCreation />} />
    </Routes>
  </BrowserRouter>
);

export default App;
