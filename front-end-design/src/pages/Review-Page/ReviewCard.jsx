// ReviewCard.js
import React from 'react';
import { Card, CardContent, Typography, CardMedia, Box, Link } from '@mui/material';
import StarRating from './StarRating'; // Assuming you have a StarRating component
import { Link as RouterLink } from 'react-router-dom'; // Import from react-router-dom

const formatDate = (dateString) => {
  // This function formats the date to a more human-readable format
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const ReviewCard = ({ review }) => {
  return (
    <Card sx={{ display: 'flex', marginBottom: '2rem', alignItems: 'center', width: '100%' }}>
      <CardMedia
        component="img"
        sx={{ width: 151, height: 220 }}
        image={review.imageUrl}
        alt={`Image for ${review.title}`}
      />
      <CardContent sx={{ flex: '1 0 auto', padding: '1.5rem' }}>
        <Box sx={{ marginBottom: '1rem' }}>
          <Typography component="span" variant="body2" sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>
            Review of
          </Typography>
          {/* Wrap the title in a Link component */}
          <Link component={RouterLink} to={`/events/${review.id}`} sx={{ textDecoration: 'none' }}>
            <Typography component="div" variant="h6" sx={{ mt: '0.3rem', color: 'black', '&:hover': { textDecoration: 'underline' } }}>
              {review.title}
            </Typography>
          </Link>
        </Box>
        <StarRating value={review.rating} />
        <Typography variant="subtitle1" color="text.secondary" gutterBottom sx={{ marginY: '1rem' }}>
          {review.excerpt}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: '1rem' }}>
          <Typography variant="body2">
            {review.venue}
          </Typography>
          <Typography variant="body2">
            {formatDate(review.date)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;