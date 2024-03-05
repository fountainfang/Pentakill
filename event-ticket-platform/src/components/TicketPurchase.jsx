import React from 'react';

const TicketPurchase = () => {
  // A simple message instead of event-specific details
  return (
    <div style={{ padding: 20, textAlign: 'center' }}>
      <h2>Purchase Tickets</h2>
      <p>Thank you for choosing to purchase tickets with us!</p>
      <button onClick={() => alert("Tickets purchased successfully!")}>Confirm Purchase</button>
    </div>
  );
};

export default TicketPurchase;
