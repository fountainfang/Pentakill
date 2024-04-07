import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../Front-Page/Navbar';
import EventCard from '../Front-Page/EventCard';
import PosterBar from './PosterBar'; // Import the PosterBar component
import { Box, Typography, Grid, Container, Button } from '@mui/material';
import events from './SampleEvents.jsx';

// Expanded mock data
console.log(events);
const EventTicketingPage = () => {
  const [filteredEvents, setFilteredEvents] = useState(events);
  const location = useLocation();

  useEffect(() => {
    // Adjusting to use the new structure without modification
    setFilteredEvents(events);
    const hash = location.hash.replace('#', '');
    if (hash) {
      const section = document.getElementById(hash);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <>
      <Navbar />
      <PosterBar />
      <Container maxWidth="xl">
        <Box sx={{ flexGrow: 1, p: 3 }}>
          <Typography variant="h4" gutterBottom>
            What's On
          </Typography>
          <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center', gap: 2, color: 'white' }}>
            <Button variant="contained" href="/#/whats-on#drama" sx={{ backgroundColor: 'white', color: 'black' }}>Drama</Button>
            <Button variant="contained" href="/#/whats-on#concert" sx={{ backgroundColor: 'white', color: 'black' }}>Concert</Button>
            <Button variant="contained" href="/#/whats-on#sport" sx={{ backgroundColor: 'white', color: 'black' }}>Sports</Button>
          </Box>
          <Grid container spacing={3}>
            {['Drama', 'Concert', 'Sport'].map((category) => (
              <Grid item xs={12} key={category} id={category.toLowerCase()}>
                <Typography variant="h5" gutterBottom>
                  {category}
                </Typography>
                <Grid container justifyContent="center" spacing={2}>
                  {filteredEvents
                    .filter(event => event.eventCategory === category)
                    .map((event) => (
                      <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={event.eventId}>
                        {/* Adjusted EventCard component call */}
                        <EventCard event={{
                          id: event.eventId,
                          imageUrl: event.profileImage, // or profileImage
                          type: event.eventCategory,
                          title: event.eventName,
                          rating: event.rating,
                          reviews: 200, // Assume fixed or another source
                          price: event.ticketPrice
                        }} />
                      </Grid>
                    ))}
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default EventTicketingPage;
