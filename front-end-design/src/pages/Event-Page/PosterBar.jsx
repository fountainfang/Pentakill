import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const PosterBar = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '85px',
        position: 'relative', // Ensure that absolute positioning is relative to this box
        backgroundColor: 'rgba(26, 0, 26, 0.99)', // Adjust the color to match your theme
        color: 'white',
      }}
    >
      {/* Left arrow button with a larger size and circle background */}
      <Button
        sx={{
          color: 'white',
          position: 'absolute',
          left: 10, // Place on the most left
          transform: 'translateX(0)', // Center the button on the edge
          minWidth: '50px', // Ensure a larger click area
          height: '50px',
          borderRadius: '50%', // Circle shape
          backgroundColor: 'rgba(255, 255, 255, 0.2)', // Semi-transparent white for visibility
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.3)', // Lighter on hover
          },
        }}
      >
        {'<'}
      </Button>

      {/* Center content */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {/* Title */}
        <Typography variant="h5" component="div">
          Top Show
        </Typography>
        <Typography variant="h3" component="div">
          The Phantom of the Opera
        </Typography>
        {/* Introduction */}
        <Typography varient="subtitle1" component="div" 
          sx={{
            color: 'rgba(255, 255, 255, 0.6)' // White text with 50% opacity
          }}
        >
          ___________________________________________________________________________________
        </Typography>
        <Typography variant="subtitle1" component="div">
          This masterpiece has been enchanting audiences since 1986 with its iconic score & set design.
        </Typography>
        {/* Buy tickets button */}
        <Button variant="contained" color="secondary"
        onClick={() => navigate('/tickets')}
          sx={{
            fontSize: '0.8rem', // Adjust font size
            padding: '8px 12px', // Adjust padding; format is 'vertical horizontal'
            width: '120px', // Minimum width
            height: '43px', // Height of the button
            backgroundColor: '#FFFFFF',
            color: 'rgba(26, 0, 26, 0.99)',
          }}
        >
          Book Tickets
        </Button>
      </Box>

      {/* Right side image */}
      <img src='pht.avif' alt="The Phantom of the Opera" style={{ maxHeight: '260px', marginLeft: 'auto' }} />

      {/* Right arrow button with a larger size and circle background */}
      <Button
        sx={{
          color: 'white',
          position: 'absolute',
          right: 10, // Place on the most right
          transform: 'translateX(0)', // Center the button on the edge
          minWidth: '50px', // Ensure a larger click area
          height: '50px',
          borderRadius: '50%', // Circle shape
          backgroundColor: 'rgba(255, 255, 255, 0.2)', // Semi-transparent white for visibility
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.3)', // Lighter on hover
          },
        }}
      >
        {'>'}
      </Button>
    </Box>
  );
};

export default PosterBar;
