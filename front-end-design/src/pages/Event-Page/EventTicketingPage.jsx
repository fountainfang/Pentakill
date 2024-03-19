import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../Front-Page/Navbar';
import EventCard from '../Front-Page/EventCard';
import PosterBar from './PosterBar'; // Import the PosterBar component
import { Box, Typography, Grid, Container, Button } from '@mui/material';

// Expanded mock data
const events = [
  ...Array.from({ length: 12 }).flatMap((_, index) => [
    { id: index * 3 + 1, imageUrl: 'drama_image_url', type: 'Drama', title: `Drama Event ${index + 1}`, rating: (Math.random() * (5 - 4) + 4).toFixed(1), reviews: Math.floor(Math.random() * (500 - 100) + 100), price: Math.floor(Math.random() * (100 - 30) + 30) },
    { id: index * 3 + 2, imageUrl: 'concert_image_url', type: 'Concert', title: `Concert Event ${index + 1}`, rating: (Math.random() * (5 - 4) + 4).toFixed(1), reviews: Math.floor(Math.random() * (500 - 100) + 100), price: Math.floor(Math.random() * (100 - 30) + 30) },
    { id: index * 3 + 3, imageUrl: 'sports_image_url', type: 'Sports', title: `Sports Event ${index + 1}`, rating: (Math.random() * (5 - 4) + 4).toFixed(1), reviews: Math.floor(Math.random() * (500 - 100) + 100), price: Math.floor(Math.random() * (100 - 30) + 30) },
  ])
];

const EventTicketingPage = () => {
  const [filteredEvents, setFilteredEvents] = useState(events);
  const location = useLocation();

  useEffect(() => {
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
      <PosterBar /> {/* Include the PosterBar right after the Navbar */}
      <Container maxWidth="xl">
        <Box sx={{ flexGrow: 1, p: 3 }}>
          <Typography variant="h4" gutterBottom>
            What's On
          </Typography>
          <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center', gap: 2 , color:'white'}}>
            <Button variant="contained" href="#drama" sx={{ backgroundColor: 'white', color: 'black' }}>Drama</Button>
            <Button variant="contained" href="#concert" sx={{ backgroundColor: 'white', color: 'black' }}>Concert</Button>
            <Button variant="contained" href="#sports" sx={{ backgroundColor: 'white', color: 'black' }}>Sports</Button>
          </Box>
          <Grid container spacing={3}>
            {['Drama', 'Concert', 'Sports'].map((category) => (
              <Grid item xs={12} key={category} id={category.toLowerCase()}>
                <Typography variant="h5" gutterBottom>
                  {category}
                </Typography>
                <Grid container justifyContent="center" spacing={2}>
                  {filteredEvents
                    .filter(event => event.type === category)
                    .map((event) => (
                      <Grid item xs={2} key={event.id}>
                        <EventCard event={event} />
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