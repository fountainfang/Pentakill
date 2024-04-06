// Assuming Navbar.js exists and is structured as previously shown
import React, { useEffect } from 'react';
import {
  Avatar, Box, Button, Container, Divider, Grid, IconButton, Paper, TextField, Typography, Drawer
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Navbar from '../Front-Page/Navbar';
import { connect } from "react-redux"
import api from '../../api';





class UserProfile extends React.Component {
  componentDidMount() {
    document.title = "UserProfile";
  }
  componentWillUnmount() {
    document.title = "Default Title";
  }

  handleInputChange = (field, value) => {
    this.setState({ [field]: value });
    console.log(this.state);

  }


  handleSaveChanges = () => {
    const { firstName, lastName, email, phonenumber, address, city, state, country, postalCode, username } = this.state;
    const userInfo = {
      firstName,
      lastName,
      email,
      phonenumber,
      address,
      city,
      state,
      country,
      postalCode,
      username
    };


    api.updateUser(userInfo)
      .then(response => {
        console.log("Response from updateUser API:", response); // 添加此行进行调试

        console.log("User information updated successfully:", response.data);
        // 可以更新界面上的用户信息显示
      })
      .catch(error => {
        // 保存失败，显示错误信息
        console.error("Error updating user information:", error);
        // 可以向用户显示错误信息
      });
  }

  constructor(props) {
    super(props);
    this.state = {
      firstName: props.auth.user.firstname,
      lastName: props.auth.user.lastname,
      customerId: props.auth.user.customerid,
      email: props.auth.user.email,
      phonenumber: props.auth.user.phonenum,
      address: props.auth.user.address,
      city: props.auth.user.city,
      state: props.auth.user.state,
      country: props.auth.user.country,
      postalCode: props.auth.user.postalCode,
      username: props.auth.user.nick,
      profileImage: 'path_to_customer_image.jpg', // Placeholder for the image path
      editDrawerOpen: false,
      editingField: ''
    };
  }

  toggleEditDrawer = (field) => () => {
    this.setState({
      editDrawerOpen: !this.state.editDrawerOpen,
      editingField: field
    });
  }

  handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      this.setState({ profileImage: reader.result });
    };
    reader.readAsDataURL(file);
  }

  renderEditDrawer = () => {
    const { editingField } = this.state;
    const fieldValue = this.state[editingField] || '';

    return (
      <Drawer
        anchor="right"
        open={this.state.editDrawerOpen}
        onClose={this.toggleEditDrawer('')}
      >
        <Box
          sx={{ width: 250, p: 2 }}
          role="presentation"
        >
          <IconButton onClick={this.toggleEditDrawer('')} sx={{ justifyContent: 'flex-end', display: 'block' }}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" gutterBottom>Edit {editingField}</Typography>
          <TextField
            fullWidth
            label={editingField.charAt(0).toUpperCase() + editingField.slice(1)}
            value={this.state[editingField]}  // Use state value instead of defaultValue
            variant="outlined"
            margin="dense"
            onChange={(e) => this.handleInputChange(editingField, e.target.value)} // Handle onChange event
          />
          <Box mt={2}>
            <Button fullWidth variant="contained" color="primary" onClick={this.handleSaveChanges}>
              Save Changes
            </Button>
          </Box>
        </Box>
      </Drawer>
    );
  }

  renderEditButton = (field) => {
    return (
      <IconButton onClick={this.toggleEditDrawer(field)} size="small">
        <EditIcon />
      </IconButton>
    );
  }

  renderField = (label, value, field) => {
    return (
      <Box display="flex" justifyContent="space-between" alignItems="center" my={4}> {/* Increased spacing for better visual separation */}
        <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>{label}: {value}</Typography>
        {this.renderEditButton(field)}
      </Box>
    );
  }

  render() {
    const { firstName, lastName, customerId, email, phonenumber, address, city, state, country, postalCode, profileImage } = this.state;

    return (
      <>

        <Navbar />
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Paper elevation={1} sx={{ p: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2, position: 'relative' }}>
                  <Avatar
                    src={profileImage}
                    sx={{ width: 128, height: 128 }}
                  />
                  <input accept="image/*" type="file" id="icon-button-file" style={{ display: 'none' }} />
                  <label htmlFor="icon-button-file" style={{ position: 'absolute', bottom: 0, right: 20 }}>
                    <IconButton color="primary" aria-label="upload picture" component="span">
                      <PhotoCamera />
                    </IconButton>
                  </label>
                </Box>
              </Grid>
              <Grid item xs={12} md={9}>
                <Typography variant="h4" gutterBottom>{`${firstName} ${lastName}`}</Typography>
                <Divider sx={{ my: 7 }} />
                {this.renderField('Email', email, 'email')}
                {this.renderField('Phone', phonenumber, 'phonenumber')}
                {this.renderField('Address', address, 'addressLine1')}

                {this.renderField('City', city, 'city')}
                {this.renderField('State', state, 'state')}
                {this.renderField('Country', country, 'country')}
                {this.renderField('Postal Code', postalCode, 'postalCode')}
              </Grid>
            </Grid>
          </Paper>
        </Container>
        {this.renderEditDrawer()}
      </>
    );
  }
}

const mapStateToProps = state => {
  return { auth: state.auth }
}

export default connect(mapStateToProps)(UserProfile)



