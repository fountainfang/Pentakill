import React from 'react';
import Navbar from '../Front-Page/Navbar';

const newsItems = [
  {
    id: 1,
    title: "Albert Magashi on joining the cast of 'For Black Boys' in the West End",
    description: "The Dear England actor talks about performing in the West End as Sable in Ryan Calais Cameron’s powerful play about six young, Black men in group therapy.",
    date: "14 Mar 2024, 06:00",
    imageSrc: "sample_posters/small/s-6.jpg"
  },
  {
    id: 2,
    title: "Five questions with Tracy-Ann Oberman of 'The Merchant of Venice 1936'",
    description: "EastEnders and Friday Night Dinner actor Tracy-Ann Oberman explains why now is the time for audiences to see this adaptation of Shakespeare's The Merchant of Venice.",
    date: "07 Mar 2024, 07:00",
    imageSrc: "sample_posters/small/s-2.jpg"
  },
  {
    id: 3,
    title: "The cast of 'Standing at the Sky's Edge' on taking the musical to the West End",
    description: "The groundbreaking musical that captivated Sheffield is now making waves in London. Cast members discuss the journey and what makes the show unique.",
    date: "01 Mar 2024, 10:30",
    imageSrc: "sample_posters/small/s-4.jpg"
  },
  {
    id: 4,
    title: "Iconic rock band 'The Night Walkers' announce comeback tour",
    description: "After a decade-long hiatus, 'The Night Walkers' are hitting the road again for what's billed as the greatest comeback tour in rock history.",
    date: "20 Feb 2024, 09:00",
    imageSrc: "sample_posters/small/s-5.jpg"
  },
  {
    id: 5,
    title: "Local team secures championship in nail-biting final",
    description: "In a stunning display of skill and teamwork, the hometown heroes clinched the title in the final seconds of the game, sparking celebrations citywide.",
    date: "15 Feb 2024, 23:45",
    imageSrc: "sample_posters/small/s-7.jpg"
  },
  // ... other news items
];

const NewsPage = () => {
  const contentStyle = {
    maxWidth: '1200px',
    margin: 'auto',
    padding: '2rem',
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '2rem',
    color: '#333',
  };

  const newsCardStyle = {
    display: 'flex',
    marginBottom: '2rem',
    background: '#fff',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    borderRadius: '8px',
    overflow: 'hidden',
    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  };

  const newsImageStyle = {
    width: '200px',
    height: '200px',
    objectFit: 'cover',
  };

  const newsContentStyle = {
    padding: '1rem',
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  };

  const titleStyle = {
    fontSize: '1.5rem',
    marginBottom: '0.5rem',
    color: '#222',
  };

  const descriptionStyle = {
    fontSize: '1rem',
    lineHeight: '1.5',
    color: '#555',
  };

  const newsDateStyle = {
    color: '#999',
    fontStyle: 'italic',
    fontSize: '0.85rem',
  };

  const hoverEffect = {
    cursor: 'pointer',
  };

  return (
    <div>
      <Navbar />
      <div style={contentStyle}>
        <h1 style={headerStyle}>Theatre Interviews with Top West End Stars</h1>
        <p>Get a fascinating glimpse behind the scenes with our London Theatre exclusive interviews...</p>
        {newsItems.map(item => (
          <div key={item.id} style={{ ...newsCardStyle, ...hoverEffect }}
               onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
               onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
               onClick={() => {/* handle click event, navigation for example */}}>
            <img src={item.imageSrc} alt={item.title} style={newsImageStyle} />
            <div style={newsContentStyle}>
              <h3 style={titleStyle}>{item.title}</h3>
              <p style={descriptionStyle}>{item.description}</p>
              <p style={newsDateStyle}>{item.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsPage;