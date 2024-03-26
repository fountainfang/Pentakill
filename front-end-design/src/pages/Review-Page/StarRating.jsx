// StarRating.js
import React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const StarRating = ({ value }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Rating value={value} precision={0.5} readOnly />
      <Typography component="span" sx={{ marginLeft: 1 }}>
        {value}/5
      </Typography>
    </Box>
  );
};

export default StarRating;
