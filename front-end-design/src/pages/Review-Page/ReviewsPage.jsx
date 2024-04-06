// ReviewsPage.js
import React from 'react';
import { Grid, Container, Typography } from '@mui/material';
import Navbar from '../Front-Page/Navbar';
import ReviewCard from './ReviewCard';
import PopularShows from './PopularShows';
import rpopularShows from './SampleEvents.jsx';
import reviews from './SampleReview.jsx';

const ReviewsPage = () => {
  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ marginTop: '6rem', marginBottom: '3rem' }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" gutterBottom sx={{ marginBottom: '1.5rem' }}> {/* Increased marginBottom */}
              From Those Who've Watched
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ marginBottom: '2rem' }}> {/* Increased marginBottom */}
            Explore the rhythm of the world's most exciting events with our latest ticket offerings. From Broadway's dazzling spectacles to groundbreaking performances in the artsiest underground spots, our selection spans the globe, offering insights and access to an eclectic mix of live entertainment. 
            </Typography>
            {reviews.map((review, index) => (
              <ReviewCard
                key={review.id}
                review={review}
                sx={{ marginTop: index === 0 ? '3rem' : '1rem' }} // Increased marginTop for the first card
              />
            ))}
          </Grid>
          <Grid item xs={12} md={4}>
            <PopularShows shows={rpopularShows} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ReviewsPage;

