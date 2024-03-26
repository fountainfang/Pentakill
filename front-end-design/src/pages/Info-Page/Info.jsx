// Info.jsx
import React from 'react';
import { Container, Typography, Box, Paper, Grid, Avatar, Divider, Link } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import BusinessIcon from '@mui/icons-material/Business';
import Navbar from '../Front-Page/Navbar';

const Info = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, mb: 4, backgroundColor: '#f7f7f7' }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: '600' }}>
          About Our Ticketing Platform
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 2, color: 'text.secondary' }}>
          Welcome to Event Horizon, the one-stop shop for all your ticketing needs. From concerts to
          culinary experiences, we connect you with the events that shape unforgettable memories.
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h5" gutterBottom sx={{ fontWeight: '500' }}>
          Contact Us
        </Typography>
        <Box display="flex" alignItems="center" my={1}>
          <EmailIcon sx={{ mr: 1 }} />
          <Typography variant="subtitle1">support@eventhorizon.com</Typography>
        </Box>
        <Box display="flex" alignItems="center" my={1}>
          <PhoneIcon sx={{ mr: 1 }} />
          <Typography variant="subtitle1">+123 456 7890</Typography>
        </Box>
        <Box display="flex" alignItems="center" my={1}>
          <BusinessIcon sx={{ mr: 1 }} />
          <Typography variant="subtitle1">123 Event Street, Entertainment City</Typography>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6} md={4} align="center">
            <Avatar sx={{ mb: 1, bgcolor: 'primary.main', width: 56, height: 56 }}>JY</Avatar>
            <Typography variant="h6">Jingtao Yang</Typography>
            <Typography variant="body2" color="text.secondary">Founder & CEO</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4} align="center">
            <Avatar sx={{ mb: 1, bgcolor: 'secondary.main', width: 56, height: 56 }}>CF</Avatar>
            <Typography variant="h6">Cheng Fang</Typography>
            <Typography variant="body2" color="text.secondary">Lead Developer</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4} align="center">
            <Avatar sx={{ mb: 1, bgcolor: 'success.main', width: 56, height: 56 }}>JF</Avatar>
            <Typography variant="h6">Jerry Fan</Typography>
            <Typography variant="body2" color="text.secondary">Marketing Guru</Typography>
          </Grid>
        </Grid>
      </Paper>
      <Typography variant="body2" align="center" sx={{ color: 'text.secondary' }}>
        &copy; {new Date().getFullYear()} Event Horizon | All rights reserved
      </Typography>
      <Typography variant="body2" align="center" sx={{ color: 'text.secondary', my: 2 }}>
        Connect with us on{' '}
        <Link href="#" underline="hover">
          Social Media
        </Link>
      </Typography>
    </Container>
  );
};

export default Info;
