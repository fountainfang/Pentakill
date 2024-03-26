// Navbar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  TextField,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import websiteIcon from './website-logo.png'; // Adjust the path as needed

const NavBarButton = ({ children, ...props }) => (
  <Button color="inherit" sx={{ marginRight: 2 }} {...props}>
    {children}
  </Button>
);

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" sx={{ backgroundColor: '#000', color: '#FFF' }}>
      <Toolbar>
        <img src={websiteIcon} alt="Grand Theater" style={{ marginRight: '10px', height: '40px' }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Pentakill Ticketing
        </Typography>
        <NavBarButton onClick={() => navigate('/')}>Home</NavBarButton>
        <NavBarButton onClick={() => navigate('/whats-on')}>What's On</NavBarButton>
        <NavBarButton onClick={() => navigate('/news')}>News & Interviews</NavBarButton>
        <NavBarButton onClick={() => navigate('/reviews')}>Reviews</NavBarButton>
        <NavBarButton onClick={() => navigate('/info')}>Info</NavBarButton>
        <NavBarButton onClick={() => navigate('/profile')}>Profile Demo</NavBarButton>
        <NavBarButton onClick={() => navigate('/eventcreate')}>Holder Demo</NavBarButton>
        <NavBarButton onClick={() => navigate('/approve')}>Approve Demo</NavBarButton>
        <TextField
          variant="outlined"
          size="small"
          sx={{ backgroundColor: '#FFF', borderRadius: 1, marginRight: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
        <Button color="inherit" onClick={() => navigate('/signup')}>Sign-up</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;