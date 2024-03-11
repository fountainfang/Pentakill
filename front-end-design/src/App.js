import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TheaterFrontPage from './Front-Page/EventList';
import TicketPurchase from './Purchase-Page/TicketPurchase';
import Signup from "./pages/Signup/signup"
import Signin from "./pages/Signin/signin"
import FlashMessage from './component/Flash/FlashMessage';
import UserProfile from './pages/userprofile/Userprofile';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<TheaterFrontPage />} />
      <Route path="/purchase" element={<TicketPurchase />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/userprofile" element={<UserProfile />} />
    </Routes>
  </BrowserRouter>
);

export default App;
