import React, { useState } from 'react';
import EventList from './components/EventList';
import TicketPurchase from './components/TicketPurchase';

const initialEvents = [
  { id: 1, name: 'Concert', price: 50 },
  { id: 2, name: 'Theater', price: 40 },
  { id: 3, name: 'Sport Event', price: 30 },
];

function App() {
  const [events] = useState(initialEvents);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleSelectEvent = event => {
    setSelectedEvent(event);
  };

  const handlePurchase = () => {
    alert(`Purchased ticket for ${selectedEvent.name}!`);
    setSelectedEvent(null); // Reset selection
  };

  return (
    <div className="App">
      <EventList events={events} onSelectEvent={handleSelectEvent} />
      <TicketPurchase event={selectedEvent} onPurchase={handlePurchase} />
    </div>
  );
}

export default App;

