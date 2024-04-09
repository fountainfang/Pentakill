import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Grid, Button, styled } from '@mui/material';
// Importing custom components and Material-UI components
import Navbar from '../Front-Page/Navbar';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
// Icons for location, feedback, and sharing functionality
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FeedbackIcon from '@mui/icons-material/Feedback';
import ShareIcon from '@mui/icons-material/Share';
import Confetti from 'react-confetti';
// Event data for demonstration

// Styling for the timer and its container using Material-UI's styled component
const StyledBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '16px',
});

const TimerWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'space-around',
  width: '100%',
  marginTop: '20px',
});

// Component to render the time in a formatted style
const renderTime = (dimension, time) => (
  <StyledBox>
    <Typography variant="h4">{time}</Typography>
    <Typography variant="caption">{dimension}</Typography>
  </StyledBox>
);

// Main component for the Order Confirmation Page
const OrderConfirmationPage = () => {
  // Using React Router hooks for navigation and accessing URL parameters
  let { eventId } = useParams();
  const navigate = useNavigate();

  const eventIdInt = parseInt(eventId, 10);
  const eventDataJSON = localStorage.getItem('eventsData');
  const eventData = JSON.parse(eventDataJSON);

  const events = eventData[0];
  const event = events.filter(event => event.eventId === eventIdInt);
  const date = event[0].eventDate;
  const time = event[0].startTime;

  console.log(date)
  console.log(time)

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const dateObj = new Date(date);
  const datePart = dateObj.toISOString().split('T')[0];
  const eventDateTimeString = `${datePart}T${time}Z`

  // State hooks for managing countdown timer and confetti display
  const [showConfetti, setShowConfetti] = useState(true);
  const [day, setDay] = useState(0);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);

  // Set page title upon component mount
  useEffect(() => {
    document.title = "Order Confirmation Page";
  }, []);

  // Countdown timer calculation and interval setup
  useEffect(() => {
    if (!event) {
      navigate('/not-found');
      return;
    }

    const calculateTimeLeft = () => {
      const now = new Date();
      const eventDateTime = new Date(eventDateTimeString);
      const difference = eventDateTime - now;

      let timeLeft = {};

      if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }

      setDay(timeLeft.days || 0);
      setHour(timeLeft.hours || 0);
      setMinute(timeLeft.minutes || 0);
      setSecond(timeLeft.seconds || 0);
    };

    const timerId = setInterval(calculateTimeLeft, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(timerId);
  }, [event, navigate]);

  // Automatically stop showing confetti after 3 seconds
  useEffect(() => {
    setTimeout(() => setShowConfetti(false), 5000); // Limiting confetti to 3 seconds
  }, []);

  // Encoding event location for embedding Google Maps
  const locationEncoded = encodeURIComponent(event.location);

  // Render content or a not-found message based on event existence
  if (!event) {
    return <Typography variant="h5">Event not found.</Typography>;
  }

  return (
    <>
      <Navbar />
      <Container component="main" maxWidth="lg">
        {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}
        <Typography variant="h3" gutterBottom sx={{ textAlign: 'center', mt: 4 }}>
          {event[0].eventName} - Order Confirmed!
        </Typography>
        <Grid item xs={12} md={6}>
          <TimerWrapper>
            {renderTime("Days", day)}
            {renderTime("Hours", hour)}
            {renderTime("Minutes", minute)}
            {renderTime("Seconds", second)}
          </TimerWrapper>
        </Grid>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
          <img
              src={event[0].profileImage}
              alt="Event Poster"
              style={{ width: '450px', height: '600px', borderRadius: '8px', objectFit: 'fill' }}
            />
          </Grid>
          
          
          <Grid item xs={12} md={6}>
            <Typography sx={{ mt: 2, textAlign: 'center' }}>
              <LocationOnIcon /> {event[0].address}
            </Typography>
            <Typography sx={{ mt: 2, textAlign: 'center' }}>
              <strong>Date and Time:</strong> {(formattedDate + " " + time)}
            </Typography>
            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <iframe
                title="Event Location"
                src={`https://maps.google.com/maps?q=${locationEncoded}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                width="600"
                height="450"
                frameBorder="0"
                style={{ border: 0, maxWidth: '100%' }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </Box>
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
              <Button variant="contained" color="primary" startIcon={<ShareIcon />}>
                Share Event
              </Button>
              <Button variant="outlined" startIcon={<FeedbackIcon />}>
                Leave Feedback
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default OrderConfirmationPage;