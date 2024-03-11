import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for navigation
// Importing components from Material-UI
import Navbar from '../../component/Navbar';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  TextField,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search'; // Importing the search icon
// @mui/material: Material-UI component including AppBar, Toolbar, Buttons, etc.
// @emotion/react and @emotion/styled: For styling Material-UI components.
// @mui/icons-material: Icons used in Material-UI, such as SearchIcon for the search bar.

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
];

// Reusable component for navigation buttons in the AppBar
const NavBarButton = ({ children }) => (
  <Button color="inherit" sx={{ marginRight: 2 }}>
    {children}
  </Button>
);

const TheaterFrontPage = () => {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <>
      {/* AppBar for the navigation bar at the top of the page */}
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 12 }}>
        {/* Loop through sections to display events */}
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
                      {/* Navigate to the generic purchase page on button click */}
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

export default TheaterFrontPage;
