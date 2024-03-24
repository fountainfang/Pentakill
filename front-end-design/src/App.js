import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TheaterFrontPage from './pages/Front-Page/HomePage';
import TicketPurchase from './pages/Purchase-Page/TicketPurchase';
import EventDetails from './pages/EventDetail-Page/EventDetails';
import Signin from "./pages/Signin/signin";
import Signup from "./pages/Signup/signup";
import PurchasingPage from './pages/Purchasing-Page/PurchasingPage';
import EventTicketingPage from './pages/Event-Page/EventTicketingPage';
import EventCreation from './pages/EventCreation-Page/EventCreation';
import Notfound from "./pages/NotFound/Notfound"
import Userprofile from "./pages/userprofile/Userprofile"
import EventApproval from './pages/EventApproval-Page/EventApproval';
import NewsPage from './pages/News-Page/NewsPage';

const DataDisplay = ({ data }) => (
  <div>{data ? data : "Loading..."}</div>
);

const App = () => {
  const [data, setData] = useState(null); // State to store fetched data

  useEffect(() => {

    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message))
      .catch((error) => console.error("Error fetching data:", error));
  }, []); 

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TheaterFrontPage />} />
        <Route path="/purchase" element={<TicketPurchase />} />
        <Route path="/purchase/:eventId" element={<PurchasingPage />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/event/:eventId" element={<EventDetails />} />
        <Route path="/whats-on" element={<EventTicketingPage />} />
        <Route path="/whats-on" element={<EventTicketingPage />} />
        <Route path="/data" element={<DataDisplay data={data} />} />
        <Route path="/create-event" element={<EventCreation />} />
        <Route path="/userprofile" element={<Userprofile />} />
        <Route path="/event-approval" element={<EventApproval />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/*" element={<Notfound />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;