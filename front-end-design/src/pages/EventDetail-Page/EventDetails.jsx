import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './EventDetails.css';
import Navbar from '../Front-Page/Navbar';
import PurchasingPage from '../Purchasing-Page/PurchasingPage';
import { events } from '../../data/EventData'; 

const EventDetails = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const handleBuyTicketsClick = (e) => {
    e.preventDefault();
    navigate(`/purchase/id=${eventId}`);
  };

  const event = events[eventId]; // Accessing event directly from the 'events' object
  
  const formattedDate = event ? new Date(event.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }) : '';

  if (!event) {
    return <div className="event-not-found">Event not found.</div>;
  }

  return (
    <>
      <Navbar />
      {event.approvalStatus === 'Pending' && (
        <div className="pending-approval-banner">This event is currently pending approval.</div>
      )}
      <div className="event-details">
        <div className="banner-image" style={{ backgroundImage: `url(${event.bannerImage})` }}></div>
        <div className="banner-content">
          <div className="title-and-button">
            <h1 className="event-title">{event.title}</h1>
          </div>
          <p className="event-date">{formattedDate}</p>
        </div>
        <div className="content">
          <div className="left-content">
            <div className="poster">
              <img src={event.posterImage} alt="Event Poster" className="poster-image" />
            </div>
          </div>
          <div className="right-content">
            {event.approvalStatus === 'Approved' && (
              <button type="button" className="buy-ticket-button" onClick={handleBuyTicketsClick}>
                Buy Ticket
              </button>
            )}
            <div className="description">
              <p>{event.description}</p>
            </div>
            <div className="event-info">
              <p><strong>Time:</strong> {event.time}</p>
              <p><strong>Location:</strong> {event.location}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventDetails;
