import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './EventDetails.css';
import Navbar from '../Front-Page/Navbar';

const EventDetails = () => {
  const { eventId } = useParams();

  const taylorSwiftConcert = {
    id: 0,
    title: 'TAYLOR SWIFT CONCERT',
    date: '2024-03-15',
    time: '20:00',
    location: 'Madison Square Garden, New York, NY',
    description: 'Join us for an unforgettable night with Taylor Swift, featuring all her greatest hits live in concert!',
    bannerImage: '/images/0_banner.webp',
    posterImage: '/images/0_profile.avif',
  };

  const phantomOfTheOperaEvent = {
    id: 1,
    title: 'THE PHANTOM OF THE OPERA',
    date: '2024-04-10',
    time: '19:00',
    location: 'The Royal Opera House, London, UK',
    description: 'Experience the magic of The Phantom of the Opera at the Royal Opera House. An unforgettable journey into the depths of the Paris Opera House, featuring breathtaking performances and timeless music.',
    bannerImage: '/opera.jpg',
    posterImage: '/s-1.jpg', 
  };

  let event;
  if (eventId === '0') {
    event = taylorSwiftConcert;
  } else if (eventId === '1') {
    event = phantomOfTheOperaEvent;
  } else {
    event = null;
  }
  
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
          <button href="/buy-tickets" type="button" className="buy-ticket-button">Buy Ticket</button>
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
