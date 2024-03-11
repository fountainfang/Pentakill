import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TheaterFrontPage from '../src/Page/Front-Page/EventList';
import TicketPurchase from '../src/Page/Purchase-Page/TicketPurchase';
import Signup from "../src/Page/Signup-Page/signup"
import Signin from "../src/Page/Signin-page/signin"
import FlashMessage from './component/Flash/FlashMessage';
import UserProfile from '../src/Page/userprofile-page/Userprofile';

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
