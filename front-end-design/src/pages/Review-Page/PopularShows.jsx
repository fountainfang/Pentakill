// PopularShows.js
import React from 'react';
import { Grid, Typography, Card, CardMedia, CardContent, Box } from '@mui/material';

const PopularShows = ({ shows }) => {
  return (
    <Box sx={{ marginBottom: '2rem' }}>
      <Typography variant="h6" gutterBottom component="div" sx={{ marginBottom: '1rem' }}>
        Most popular shows
      </Typography>
      <Grid container spacing={2}>
        {shows.map((show) => (
          <Grid item xs={4} sm={4} md={4} lg={4} key={show.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: 3 }}>
              <CardMedia
                component="img"
                sx={{ height: 140 }} // fixed height for the image
                image={show.imageUrl}
                alt={show.name}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="body2" component="div" sx={{ height: '100%' }}>
                  {show.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PopularShows;
