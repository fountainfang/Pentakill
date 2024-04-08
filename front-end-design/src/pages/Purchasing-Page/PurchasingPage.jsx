import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box, Container, Typography, TextField, Button,
  Radio, RadioGroup, FormControlLabel, FormControl,
} from '@mui/material';
import Navbar from '../Front-Page/Navbar';
import api from '../../api';
// Assume events is imported correctly

const PurchasingPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    confirmEmail: '',
    mobileNumber: '',
    paymentOption: 'creditCard',
  });

  const { eventId } = useParams(); // Correct use of useParams at the top level of the component
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userinfo = localStorage.getItem("rl")
    const customerId = JSON.parse(userinfo).customerid;
    const eventId = JSON.parse(userinfo).customerid;
    const ticketPrice = localStorage.getItem('ticketPrice');
    const orderDate = new Date().toISOString();

    if (!customerId || !eventId) {
      console.log('User ID or Event ID missing');
      return
    }

    const orderData = {
      eventId,
      orderDate,
      ticketPrice,
      customerId,
    }

    navigate(`/confirmation/${eventId}`);
  };

  return (
    <>
      <Navbar />
      <Container component="main" maxWidth="md">
        <Box sx={{ mt: 4, mb: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Lead guest details
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
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Mobile Number"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Confirm Email"
              name="confirmEmail"
              value={formData.confirmEmail}
              onChange={handleInputChange}
            />
            <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
              Have a Promo Code?
            </Typography>
            {/* Promo Code Input Logic Here */}
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
                {/* Add additional payment options as needed */}
              </RadioGroup>
            </FormControl>
            <Box display="flex" justifyContent="flex-end" alignItems="center" sx={{ mt: 4 }}>
              <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '4px' }}>
                {/* Summary of Purchase */}
                <Typography variant="h6">Your Event</Typography>
                <Typography variant="subtitle1">Thu, Apr 18, 2024 at 2:30 PM</Typography>
                <Typography variant="subtitle1">Stalls: Q14</Typography>
                <Typography variant="h6" sx={{ mt: 2 }}>
                  Total Payable £107.40
                </Typography>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{ mt: 2, backgroundColor: 'purple' }}
                >
                  Confirm & pay
                </Button>
                {/* Terms and conditions text here */}
                <Typography variant="body2" sx={{ mt: 2 }}>
                  By clicking 'Confirm & pay' you agree to our general terms and privacy policy
                </Typography>
              </Box>
            </Box>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default PurchasingPage;
