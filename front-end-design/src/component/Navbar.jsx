// Navbar.js
import React from 'react';
import { Link } from "react-router-dom"
import { connect } from "react-redux"
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

import { bindActionCreators } from 'redux';
import * as authActions from "../action/auth"



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
    localStorage.removeItem("rl")
  }



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
        <NavBarButton onClick={() => navigate('/theatres')}>Theatres</NavBarButton>
        <NavBarButton onClick={() => navigate('/info')}>Info</NavBarButton>
        {
          props.auth.user.token ?
            <>
              <Link to="/userprofile">{props.auth.user.nick}</Link>
              <Button color="inherit" onClick={() => logoutHandle(props)}>Log out</Button>
            </>
            :
            <>   <TextField
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
              <Button color="inherit" onClick={() => navigate('/signup')}>Sign-up</Button></>

        }





      </Toolbar>
    </AppBar>
  );
};

//export default Navbar;
const mapStateToProps = state => {
  return { auth: state.auth }
}

const mapDispatchToProps = dispatch => {
  return { authActions: bindActionCreators(authActions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
