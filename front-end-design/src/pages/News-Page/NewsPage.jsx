import React from 'react';
import Navbar from '../Front-Page/Navbar';
import news from './SampleNews.jsx';

console.log(news);
const NewsPage = () => {
  const contentStyle = {
    maxWidth: '1300px',
    margin: 'auto',
    padding: '0 2rem', // Adjust padding for the content but not for the full width elements
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
  };

  const headerStyle = {
    fontWeight: '700',
    textAlign: 'center',
    margin: '2rem 0',
    color: '#FFF', 
  };
  const headerStyle2 = {
    fontWeight: '500',
    textAlign: 'center',
    margin: '2rem 0', 
    color: '#FFF', 
  }

  const blackBarStyle = {
    background: '#7f5b60',
    padding: '4rem 2rem', 
    marginBottom: '2rem',
  };

  // Ensure the navbar spans the full width if it doesn't already
  const navbarStyle = {
    width: '100%',
    margin: '0',
    padding: '0',
  };

  const newsCardStyle = {
    display: 'flex',
    marginBottom: '2rem',
    background: '#fff',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    borderRadius: '8px',
    overflow: 'hidden',
    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
    border: '1px solid #ccc',
  };

  const newsImageStyle = {
    width: '600px',
    height: '350px',
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
      <div style={navbarStyle}>
        <Navbar />
      </div>
      {/* This div wraps everything and allows for the black bar to span the full width */}
      <div style={{margin: '0', padding: '0'}}>
        <div style={blackBarStyle}>
          <div style={{maxWidth: '1200px', margin: 'auto'}}>
            <h1 style={headerStyle}>News, stories, interviews and more</h1>
            <p style={{...headerStyle2, margin: '0'}}>Get a fascinating glimpse behind the scenes with our exclusive interviews...</p>
          </div>
        </div>
        <div style={contentStyle}>
          {news.map(item => (
            <div key={item.id} style={{ ...newsCardStyle, ...hoverEffect }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                onClick={() => {/* handle click event, navigation for example */}}>
              <img src={item.imageSrc} alt={item.title} style={newsImageStyle} />
              <div style={newsContentStyle}>
                <h3 style={titleStyle}>{item.title}</h3>
                <p style={{ ...descriptionStyle, whiteSpace: 'pre-line' }}>{item.description}</p>
                <p style={newsDateStyle}>{item.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
