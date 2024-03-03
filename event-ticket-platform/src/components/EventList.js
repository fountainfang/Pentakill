import React from 'react';

const EventList = ({ events, onSelectEvent }) => {
  return (
    <div>
      <h2>Available Events</h2>
      <ul>
        {events.map(event => (
          <li key={event.id}>
            {event.name} - ${event.price}
            <button onClick={() => onSelectEvent(event)}>Buy Tickets</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
