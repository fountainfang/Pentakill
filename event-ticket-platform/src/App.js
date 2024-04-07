import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EventDetails from './components/EventDetails'; // Adjust the path as necessary

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/event/:eventId" element={<EventDetails />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
