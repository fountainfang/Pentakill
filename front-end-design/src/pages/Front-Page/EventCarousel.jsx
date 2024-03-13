// EventCarousel.js
import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';

const EventCarousel = ({ items }) => {
  return (
    <Carousel>
      {items.map((item, i) => (
        <Paper key={i} elevation={0}>
          <img src={item.imageUrl} alt={item.name} style={{ width: '100%', maxHeight: '500px', objectFit: 'cover' }} />
        </Paper>
      ))}
    </Carousel>
  );
};

export default EventCarousel;
