import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { AppBar, Toolbar, Typography, Button, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import websiteIcon from './website-logo.png'; // Adjust the path as needed
import { bindActionCreators } from 'redux';
import * as authActions from "../../action/auth";

const NavBarButton = ({ children, ...props }) => (
  <Button color="inherit" sx={{ marginRight: 2 }} {...props}>
    {children}
  </Button>
);

const Navbar = (props) => {
  const navigate = useNavigate();

  const logoutHandle = () => {
    props.authActions.logOut();
    navigate('/');
    localStorage.removeItem("rl");
  }

  const { user } = props.auth; // Destructure user from props.auth

  return (
    <AppBar position="static" sx={{ backgroundColor: '#000', color: '#FFF' }}>
      <Toolbar>
        <img src={websiteIcon} alt="Grand Theater" style={{ marginRight: '10px', height: '40px' }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          REACT Ticketing
        </Typography>
        <NavBarButton onClick={() => navigate('/')}>Home</NavBarButton>
        <NavBarButton onClick={() => navigate('/whats-on')}>What's On</NavBarButton>
        <NavBarButton onClick={() => navigate('/tickets')}>Tickets</NavBarButton>
        <NavBarButton onClick={() => navigate('/news')}>News & Interviews</NavBarButton>
        <NavBarButton onClick={() => navigate('/reviews')}>Reviews</NavBarButton>
        <NavBarButton onClick={() => navigate('/profile')}>Edit Profile</NavBarButton>

        {user.token && user.usertype === 1 && (
          <NavBarButton onClick={() => navigate('/eventcreate')}>Create Event</NavBarButton>
        )}

        {user.token && user.usertype === 0 && (
          <>

            <NavBarButton onClick={() => navigate('/approve')}>Event Approval</NavBarButton>
          </>
        )}

        <NavBarButton onClick={() => navigate('/info')}>Info</NavBarButton>

        {user.token ? (
          <>
            <Link to="/">{user.nick}</Link>
            <Button color="inherit" onClick={logoutHandle}>Log out</Button>
          </>
        ) : (
          <>
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
            <Button color="inherit" onClick={() => navigate('/signin')}>Login</Button>
            <Button color="inherit" onClick={() => navigate('/signup')}>Sign-up</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  authActions: bindActionCreators(authActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
