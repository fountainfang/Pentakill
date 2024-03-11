// HomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  Button,
} from '@mui/material';
import Navbar from './Navbar'; // make sure this path is correct based on your project structure

// Sample events data
const sections = [
  {
    name: 'Drama',
    events: [
      { id: 1, title: 'Hamlet', description: 'A Shakespearean tragedy.', price: '30' },
      { id: 2, title: 'Death of a Salesman', description: 'An American classic.', price: '25' },
    ],
  },
  {
    name: 'Comedy',
    events: [
      { id: 3, title: 'The Play That Goes Wrong', description: 'A hilarious comedy.', price: '35' },
      { id: 4, title: 'Noises Off', description: 'A comedic masterpiece.', price: '30' },
    ],
  },
  // Add more sections and events as needed
];

const HomePage = () => {
  const navigate = useNavigate();
  const offsetHeight = '140px'; // Adjust as necessary based on the actual Navbar and intro section height

  return (
    <>
      <Navbar />
      <Box sx={{ backgroundColor: '#000', color: '#FFF', padding: 2 }}>
        <Container maxWidth="lg">
          <Typography variant="h5" align="center" sx={{ my: 2, fontWeight: 'bold' }}>
            Show Time Is Now!
          </Typography>
          <Typography variant="subtitle1" align="center" sx={{ mb: 2 }}>
            Theater performances, concerts, sporting events and more from all over the world.
          </Typography>
        </Container>
      </Box>
      <Container maxWidth="lg" sx={{ mt: offsetHeight }}>
        {sections.map((section) => (
          <Box key={section.name} sx={{ marginBottom: 4 }}>
            <Typography variant="h4" gutterBottom component="div">
              {section.name}
            </Typography>
            <Grid container spacing={2}>
              {section.events.map((event) => (
                <Grid item xs={12} sm={6} md={4} key={event.id}>
                  <Card sx={{ minWidth: 275, margin: 2 }}>
                    <CardContent>
                      <Typography variant="h5" component="div">
                        {event.title}
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {event.description}
                      </Typography>
                      <Typography variant="body2">
                        Price: ${event.price}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" onClick={() => navigate('/purchase')}>Buy Tickets</Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}
      </Container>
    </>
  );
};

export default HomePage;
