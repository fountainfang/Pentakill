import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './EventDetails.css';
import Navbar from '../Front-Page/Navbar';
import PurchasingPage from '../Purchasing-Page/PurchasingPage';


const EventDetails = () => {
  const { eventId } = useParams();
  const eventIdInt = parseInt(eventId, 10);
  const eventDataJSON = localStorage.getItem('eventsData');
  const eventData = JSON.parse(eventDataJSON);
  const loggedIn = localStorage.getItem('rl'); 

  const events = eventData[0];
  const event = events.filter(event => event.eventId === eventIdInt);
  const profileImage = event[0].profileImage;
  const bannerImage = event[0].bannerImage;
  const eventDesc = event[0].eventDesc;
  const title = event[0].eventName;
  const approvalStatus = event[0].approvalStatus;
  const address = event[0].address;
  const date = event[0].eventDate;
  const time = event[0].startTime;

  const navigate = useNavigate();

  const handleBuyTicketsClick = (e) => {
    e.preventDefault();
    navigate(`/purchase/${eventId}`);
  };
  
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formattedTime = new Date(time).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
  });

  if (!event) {
    return <div className="event-not-found">Event not found.</div>;
  }

  return (
    <>
      <Navbar />
      {approvalStatus === 'Pending' && (
        <div className="pending-approval-banner">This event is currently pending approval.</div>
      )}
      <div className="event-details">
        <div className="banner-image" style={{ backgroundImage: `url(${bannerImage})` }}></div>
        <div className="banner-content">
          <div className="title-and-button">
            <h1 className="event-title">{title}</h1>
          </div>
          <p className="event-date">{formattedDate}</p>
        </div>
        <div className="content">
          <div className="left-content">
            <div className="poster">
              <img src={profileImage} alt="Event Poster" className="poster-image" />
            </div>
          </div>
          <div className="right-content">
          { loggedIn && approvalStatus === 'Approved' && (
              <button type="button" className="buy-ticket-button" onClick={handleBuyTicketsClick}>
                Buy Ticket
              </button>
            )}
            <div className="description">
              <p>{eventDesc}</p>
            </div>
            <div className="event-info">
              <p><strong>Time:</strong> {time}</p>
              <p><strong>Location:</strong> {address}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};



export default (EventDetails);
