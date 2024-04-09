// HomePage.js
import React from 'react';
import api from '../../api';
import { Container, Grid, Box, Typography, Paper, Button } from '@mui/material';
import Navbar from '../Front-Page/Navbar';
import EventCard from './EventCard';
import Carousel from 'react-material-ui-carousel';
import { ArrowForward as ArrowForwardIcon } from '@mui/icons-material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';

// Poster images for carousel (4 sample events)
const carouselItems = [
  {
    name: 'Park Romance',
    imageUrl: 'sample_posters/large/dzq.jpg', // Path should be from public folder
  },
  {
    name: 'Harry Potter and the Cursed Child',
    imageUrl: 'sample_posters/large/sp1.jpg', // Path should be from public folder
  },
  {
    name: 'Spectacular Show',
    imageUrl: 'sample_posters/large/sp2.jpg', // Path should be from public folder
  },
  {
    name: 'Red Moon',
    imageUrl: 'sample_posters/large/soccer.jpg', // Path should be from public folder
  },
];

api.getEvents({}).then(response => {
  console.log(response.data)
  const events = [response.data]
  const jsonData = JSON.stringify(events);
  localStorage.setItem('eventsData', jsonData);
  console.log(jsonData)
  const eventDataJSON = localStorage.getItem('eventsData');

  // 检查localStorage中是否有存储的数据
  if (eventDataJSON) {
    // 解析JSON字符串为JavaScript对象
    const eventData = JSON.parse(eventDataJSON);
    console.log(eventData)
    console.log(eventData[0][1])



    // 遍历对象
    eventData.forEach(event => {
      // 在这里对每个事件对象执行操作，例如打印或处理数据
      console.log(event);
    });
  } else {
    console.log('No data found in localStorage.');
  }

})


// })
// 从localStorage中获取存储的JSON字符串
const eventDataJSON = localStorage.getItem('eventsData');
const eventData = JSON.parse(eventDataJSON);




const events = eventData[0];

const approvedEvents = events.filter(event => event.approvalStatus === "Approved");

const eventsByType = {
  Drama: [],
  Concert: [],
  Sports: []
};
approvedEvents.forEach(event => {
  const { eventCategory } = event;

  // Push the event into the corresponding category array
  if (eventCategory === 'Drama' && eventsByType.Drama.length < 4) {
    eventsByType.Drama.push({
      id: event.eventId,
      title: event.eventName,
      type: eventCategory,
      rating: event.rating,
      reviews: event.reviews,
      price: event.ticketPrice,
      imageUrl: event.profileImage
    });
  } else if (eventCategory === 'Concert' && eventsByType.Concert.length < 4) {
    eventsByType.Concert.push({
      id: event.eventId,
      title: event.eventName,
      type: eventCategory,
      rating: event.rating,
      reviews: event.reviews,
      price: event.ticketPrice,
      imageUrl: event.profileImage
    });
  } else if (eventCategory === 'Sport' && eventsByType.Sports.length < 4) {
    eventsByType.Sports.push({
      id: event.eventId,
      title: event.eventName,
      type: eventCategory,
      rating: event.rating,
      reviews: event.reviews,
      price: event.ticketPrice,
      imageUrl: event.profileImage
    });
  }
});



// const eventsByType = {
//   Drama: Array.from({ length: 4 }, (_, index) => ({
//     id: index + 1,
//     title: `Drama Event ${index + 1}`,
//     type: 'Drama',
//     rating: 4.8, // Static rating for the example
//     reviews: 200, // Static reviews for the example
//     price: 30, // Static price for the example
//     imageUrl: `sample_posters/small/s-${index + 1}.jpg`, // Path should be from public folder
//   })),
//   Concert: Array.from({ length: 4 }, (_, index) => ({
//     id: index + 5,
//     title: `Concert Event ${index + 5}`,
//     type: 'Concert',
//     rating: 4.7,
//     reviews: 350,
//     price: 45,
//     imageUrl: `sample_posters/small/s-${index + 5}.jpg`,
//   })),
//   Sports: Array.from({ length: 4 }, (_, index) => ({
//     id: index + 9,
//     title: `Sports Event ${index + 9}`,
//     type: 'Sports',
//     rating: 4.9,
//     reviews: 150,
//     price: 25,
//     imageUrl: `sample_posters/small/s-${index + 9}.jpg`,
//   })),
// };

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Box sx={{ backgroundColor: '#000', color: '#FFF', padding: 2 }}>
        <Container maxWidth="lg">
          <Typography variant="h5" align="center" sx={{ my: 2, fontWeight: 'bold' }}>
            Show Time Is Now!
          </Typography>
          <Typography variant="subtitle1" align="center" sx={{ mb: 2 }}>
            Theater performances, concerts, sporting events, and more from all over the world.
          </Typography>
        </Container>
      </Box>
      <Carousel interval={5000} animation="slide">
        {carouselItems.map((item, i) => (
          <Box key={i} component={Paper} elevation={0} square sx={{ position: 'relative' }}>
            <img src={item.imageUrl} alt={item.name} style={{ width: '100%', maxHeight: '500px', objectFit: 'cover' }} />
          </Box>
        ))}
      </Carousel>
      <Container maxWidth="lg" sx={{ my: 4 }}>
        {Object.entries(eventsByType).map(([type, events], index) => (
          <Box key={type} sx={{ mb: 5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                {type}
              </Typography>
              <Button
                component={Link}
                to={`/whats-on#${type.toLowerCase()}`}
                endIcon={<ArrowForwardIcon />}
                sx={{ color: 'CornflowerBlue', textTransform: 'none' }}
              >
                View More
              </Button>
            </Box>
            <Grid container spacing={2}>
              {events.map((event) => (
                <Grid item key={event.id} xs={12} sm={6} md={3} lg={3}>
                  <EventCard event={event} />
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}
      </Container>
    </>
  );
};

export default HomePage;
