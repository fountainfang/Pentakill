import React, { useState } from 'react';
import Navbar from '../Front-Page/Navbar';
import { useNavigate } from 'react-router-dom';


let userId;
const userinfo = localStorage.getItem("rl");

if (userinfo) {
  userId = JSON.parse(userinfo).customerid
}


const storedEventData = localStorage.getItem(`eventsData`);
const eventDataArr = JSON.parse(storedEventData)[0]
console.log(eventDataArr)
const filteredEvents = eventDataArr.filter(event => event.userId === userId);
console.log(filteredEvents)

const sampleEvents =
  filteredEvents
  ;




const Eventupdate = () => {


  const navigate = useNavigate();
  const [hoveredEventId, setHoveredEventId] = useState(null);

  const headerStyle = {
    backgroundColor: '#764f51',
    color: 'white',
    padding: '5rem 0',
    borderRadius: '5px',
    fontSize: '2rem',
    fontWeight: 'bold',
    margin: '1rem auto',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  };

  const subHeaderStyle = {
    marginTop: '0.5rem',
    fontSize: '1rem',
    fontWeight: 'normal',
  };

  const getBoxStyle = (eventId) => ({
    border: '1px solid #ccc',
    boxShadow: hoveredEventId === eventId ? '0px 0px 20px rgba(0,0,0,0.2)' : '0px 0px 10px rgba(0,0,0,0.1)',
    borderRadius: '8px',
    padding: '2rem',
    margin: '0 auto 2rem auto',
    maxWidth: '1000px',
    backgroundColor: 'white',
    position: 'relative',
    cursor: 'pointer',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    transform: hoveredEventId === eventId ? 'scale(1.05)' : 'scale(1)',
  });

  const detailStyle = {
    textAlign: 'left',
    marginBottom: '1rem',
  };

  const imageStyle = {
    position: 'absolute',
    top: '20px',
    right: '20px',
    width: '130px',
    height: '130px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '3px solid white',
  };

  const lineStyle = {
    margin: '20px 0',
    borderTop: '1px solid #ccc',
  };

  const emptyLineStyle = {
    height: '20px',
  };

  return (
    <>
      <Navbar />
      <div style={{ textAlign: 'center', padding: '1rem' }}>
        <div style={headerStyle}>
          Your Events
          <div style={subHeaderStyle}>Click on an event to update it</div>
        </div>
        {sampleEvents.map((event) => (
          <div
            style={getBoxStyle(event.eventId)}
            key={event.eventId}
            onMouseEnter={() => setHoveredEventId(event.eventId)}
            onMouseLeave={() => setHoveredEventId(null)}
            onClick={() => navigate(`/event-update/${event.eventId}`)}
            role="button"
            tabIndex={0}
          >
            <img src={event.profileImage} alt={`Profile image for ${event.eventName}`} style={imageStyle} />
            <div style={detailStyle}>
              <p><strong>Event Name:</strong> {event.eventName}</p>
              <p><strong>Category:</strong> {event.eventCategory}</p>
              <div style={emptyLineStyle}></div>
              <p><strong>Description:</strong> {event.eventDesc}</p>
            </div>
            <div style={emptyLineStyle}></div>
            <div style={lineStyle}></div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Eventupdate;
