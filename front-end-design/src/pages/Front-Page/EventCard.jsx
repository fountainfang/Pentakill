import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, Box, CardActionArea } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';


const EventCard = ({ event }) => {
  const navigate = useNavigate();
  const { imageUrl, type, title, rating, reviews, price } = event;

  // Function to handle click on the image
  const handleImageClick = () => {
    // Navigate to the event detail page, using the event's ID in the URL
    navigate(`/event/${event.id}`);
  };

  return (
    <Card sx={{ maxWidth: 345, m: 2, borderRadius: 2 }}>
      <CardActionArea onClick={handleImageClick}>
        <CardMedia
          component="img"
          height="280"
          image={imageUrl}
          alt={title}
        />
      </CardActionArea>
      <CardContent>
        <Typography gutterBottom variant="overline" display="block" sx={{ color: 'text.secondary' }}>
          {type.toUpperCase()}
        </Typography>
        <Box display="flex" alignItems="center">
          <StarIcon sx={{ color: 'error.main', mr: 0.5 }} />
          <Typography variant="subtitle2" component="span" sx={{ fontWeight: 'bold', mr: 1 }}>
            {rating}
          </Typography>
          <Typography variant="body2" color="text.secondary" component="span">
            ({ })
          </Typography>
        </Box>
        <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'medium', mt: 1 }}>
          {title}
        </Typography>
        <Box display="flex" alignItems="center" justifyContent="space-between" mt={1}>
          <Typography variant="caption" color="text.secondary">
            from
          </Typography>
          <Typography variant="h6" color="primary" component="span">
            £{price}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default EventCard;
