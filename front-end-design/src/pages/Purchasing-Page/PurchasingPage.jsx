import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box, Container, Typography, TextField, Button,
  Radio, RadioGroup, FormControlLabel, FormControl,
} from '@mui/material';
import Navbar from '../Front-Page/Navbar';
import api from '../../api';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const PurchasingPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    expirationDate: '',
    CVV: '',
    cardNumber: '',
    paymentOption: 'creditCard',
  });
  const [formErrors, setFormErrors] = useState({});

  const { eventId } = useParams();
  const navigate = useNavigate();

  const eventIdInt = parseInt(eventId, 10);
  const eventDataJSON = localStorage.getItem('eventsData');
  const eventData = JSON.parse(eventDataJSON);

  const events = eventData[0];
  const event = events.filter(event => event.eventId === eventIdInt);
  const date = event[0].eventDate;
  const time = event[0].startTime;
  const ticketPrice = event[0].ticketPrice;
  const eventName = event[0].eventName;

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const profileImageUrl = event[0].profileImage;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
    // Optionally clear errors when the user modifies a field
    setFormErrors(prevErrors => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const validate = () => {
    const errors = {};
    // Full name must be a string and not empty
    if (!formData.fullName.trim()) errors.fullName = 'Full name is required.';
    // Card number must be an integer and exactly 16 digits long
    if (!/^\d{16}$/.test(formData.cardNumber)) errors.cardNumber = 'Card number must be 16 digits.';
    // CVV must be a 3-digit integer
    if (!/^\d{3}$/.test(formData.CVV)) errors.CVV = 'CVV must be 3 digits.';
    // Expiration date must be in yy/mm format and in the future
    const expDateRegex = /^(0[1-9]|1[0-2])\/(\d{2})$/;
    const matches = formData.expirationDate.match(expDateRegex);
    if (matches) {
      const expMonth = parseInt(matches[1], 10);
      const expYear = parseInt(matches[2], 10) + 2000; // Assuming yy format for year
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth() + 1;
      if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
        errors.expirationDate = 'Expiration date must be in the future.';
      }
    } else {
      errors.expirationDate = 'Expiration date must be in yy/mm format.';
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();

    if (Object.keys(errors).length === 0) {
    const eventIdInt = parseInt(eventId, 10);
    const eventDataJSON = localStorage.getItem('eventsData');
    const eventData = JSON.parse(eventDataJSON);
  
    const events = eventData[0];
    const event = events.filter(event => event.eventId === eventIdInt);
    const ticketPrice = event[0].ticketPrice;
    const userinfo=localStorage.getItem("rl")
    const customerId = JSON.parse(userinfo).customerid;

    const orderDate = new Date().toISOString();
    console.log(orderDate);

    if (!customerId || !eventId) {
      console.log('User ID or Event ID missing');
      return
    }

    api.createOrder ({
      eventId: eventIdInt,
      orderDate: orderDate,
      ticketPrice: ticketPrice,
      customerId: customerId,
      // eventIdInt,
      // orderDate,
      // ticketPrice,
      // customerId,
    }).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    });

    console.log(customerId)

    navigate(`/confirmation/${eventId}`);
  } else {
    setFormErrors(errors);
    console.log('Form validation failed');
  }
  };

  return (
    <>
      <Navbar />
      <Container component="main" maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Grid container spacing={5}>
            <Grid item xs={12} md={6}>
              <Paper elevation={6} sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h5" component="h2" gutterBottom>
                  Event Details
                </Typography>
                <img
                  src={profileImageUrl}
                  alt="Event Poster"
                  style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '8px', objectFit: 'cover', marginBottom: '20px' }}
                />
                <Typography variant="h6" component="h3" gutterBottom>
                  {eventName}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Date: {formattedDate}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Time: {time}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Ticket Price: ${ticketPrice}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={6} sx={{ p: 3 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                  Payment Information
                </Typography>
                <form onSubmit={handleSubmit}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Full Name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    error={!!formErrors.fullName}
                    helperText={formErrors.fullName}
                    inputProps={{ pattern: "[A-Za-z ]*" }} 
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Card Number"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    error={!!formErrors.cardNumber}
                    helperText={formErrors.cardNumber}
                    inputProps={{ maxLength: 16, minLength: 16, inputMode: 'numeric', pattern: "\\d{16}" }}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Expiration Date (MM/YY)"
                    name="expirationDate"
                    value={formData.expirationDate}
                    onChange={handleInputChange}
                    error={!!formErrors.expirationDate}
                    helperText={formErrors.expirationDate}
                    inputProps={{ pattern: "(0[1-9]|1[0-2])/(\\d{2})" }}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="CVV"
                    name="CVV"
                    value={formData.CVV}
                    onChange={handleInputChange}
                    error={!!formErrors.CVV}
                    helperText={formErrors.CVV}
                    inputProps={{ maxLength: 3, minLength: 3, inputMode: 'numeric', pattern: "\\d{3}" }}
                  />
                  <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                    Select your payment option
                  </Typography>
                  <FormControl component="fieldset">
                    <RadioGroup
                      row
                      name="paymentOption"
                      value={formData.paymentOption}
                      onChange={handleInputChange}
                    >
                      <FormControlLabel value="creditCard" control={<Radio />} label="Credit or Debit Card" />
                      {/* Additional payment options here */}
                    </RadioGroup>
                  </FormControl>
                  <Box display="flex" justifyContent="flex-end" sx={{ mt: 4 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Confirm & Pay
                    </Button>
                  </Box>
                  <Typography variant="body2" sx={{ mt: 2 }}>
                    By clicking 'Confirm & Pay', you agree to our Terms and Conditions.
                  </Typography>
                </form>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default PurchasingPage;
