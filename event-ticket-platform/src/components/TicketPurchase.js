import React from 'react';

const TicketPurchase = ({ event, onPurchase }) => {
  if (!event) return null;

  return (
    <div>
      <h2>Purchase Tickets for {event.name}</h2>
      <p>Ticket Price: ${event.price}</p>
      <button onClick={() => onPurchase()}>Purchase</button>
    </div>
  );
};

export default TicketPurchase;
