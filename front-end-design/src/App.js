import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
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
import ReviewsPage from './pages/Review-Page/ReviewsPage';
import Info from './pages/Info-Page/Info';
import OrderConfirmationPage from './pages/OrderFormation-Page/OrderFormation';
import api from './api';
import Orders from './pages/OrderPage/order';
import Modify from './pages/EventUpdatePage/Eventupdate'
import Update from './pages/EventUpdatePage/Updatedetail'

const DataDisplay = ({ data }) => (

  <div>{data ? data : "Loading..."}</div>

);


const App = () => {

  const [data, setData] = useState(null); // State to store fetched data


  useEffect(() => {
    api.getEvents({})
      .then(response => {
        // console.log(response.data);
        const events = [response.data];
        const jsonData = JSON.stringify(events);
        localStorage.setItem('eventsData', jsonData);
        //console.log(jsonData);
      })
      .catch(error => console.error("Failed to fetch events:", error));
  }, []);

  return (
    <Router>
      <Routes>


        <Route path="/purchase" element={<TicketPurchase />} />
        <Route path="/purchase/:eventId" element={<PurchasingPage />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/event/:eventId" element={<EventDetails />} />
        <Route path="/data" element={<DataDisplay data={data} />} />
        <Route path="/create-event" element={<EventCreation />} />
        <Route path="/profile" element={<Userprofile />} />
        <Route path="/event-approval" element={<EventApproval />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/*" element={<Notfound />} />
        <Route path="/approve" element={<EventApproval />} />
        <Route path="/eventcreate" element={<EventCreation />} />
        <Route path="/info" element={<Info />} />
        <Route path="/confirmation/:eventId" element={<OrderConfirmationPage />} />
        <Route path="/tickets" element={<Orders />} />
        <Route path="/eventupdate" element={<Modify />} />
        <Route path="/event-update/:eventId" element={<Update />} />


        <Route path="/" element={<TheaterFrontPage />} />
        <Route path="/whats-on" element={<EventTicketingPage />} />

      </Routes>
    </Router>
  );
};

export default App;