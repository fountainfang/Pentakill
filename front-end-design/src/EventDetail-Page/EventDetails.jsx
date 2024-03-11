import React from 'react';
import { useParams } from 'react-router-dom';
import './EventDetails.css';

const EventDetails = () => {
  const { eventId } = useParams();

  const taylorSwiftConcert = {
    id: 1,
    title: 'TAYLOR SWIFT CONCERT',
    date: '2024-03-15',
    time: '20:00',
    location: 'Madison Square Garden, New York, NY',
    description: 'Join us for an unforgettable night with Taylor Swift, featuring all her greatest hits live in concert!',
    bannerImage: '/images/1_banner.webp',
    posterImage: '/images/1_profile.avif',
  };

  const event = eventId === '1' ? taylorSwiftConcert : null;

  const formattedDate = event ? new Date(event.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }) : '';

  if (!event) {
    return <div className="event-not-found">Event not found.</div>;
  }

  return (
    <div className="event-details">
      <div className="menu-bar">
        <div className="menu-links">
          <a href="/home">Home</a>
          <a href="/events">Events</a>
        </div>
        <div className="login-link">
          <a href="/login">Log In</a>
        </div>
      </div>
    <div className="banner-image" style={{ backgroundImage: `url(${event.bannerImage})` }}></div>
    <div className="banner-content">
      <div className="title-and-button">
    <h1 className="event-title">{event.title}</h1>
    
    </div>
      <p className="event-date">{formattedDate}</p>
    </div>
      <div className="content">
        <div className="left-content"> {/* New div for left content */}
          <div className="poster">
            <img src={event.posterImage} alt="Event Poster" className="poster-image" />
          </div>
        </div>
        <div className="description">
          <a href="/buy-tickets" className="buy-ticket-btn">Buy Ticket</a>
          <p>{event.description}</p>
          <div className="event-info">
            <p><strong>Time:</strong> {event.time}</p>
            <p><strong>Location:</strong> {event.location}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
