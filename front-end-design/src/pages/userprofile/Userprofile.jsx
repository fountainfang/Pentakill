// Assuming Navbar.js exists and is structured as previously shown
import React, { useEffect } from 'react';
import {
  Avatar, Box, Button, Container, Divider, Grid, IconButton, Paper, TextField, Typography, Drawer
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Navbar from '../../component/Navbar';





class UserProfile extends React.Component {
  componentDidMount() {
    document.title = "UserProfile";
  }
  componentWillUnmount() {
    document.title = "Default Title";
  }

  constructor(props) {
    super(props);
    this.state = {
      firstName: 'Amanda',
      lastName: 'Lee',
      customerId: '001122',
      email: 'amanda.lee@example.com',
      phoneNum: '123-456-7890',
      addressLine1: '1234 Main St',
      addressLine2: 'Apt 101',
      city: 'Anytown',
      state: 'CA',
      country: 'USA',
      postalCode: '12345',
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
            defaultValue={fieldValue}
            variant="outlined"
            margin="dense"
          />
          <Box mt={2}>
            <Button fullWidth variant="contained" color="primary">
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
    const { firstName, lastName, customerId, email, phoneNum, addressLine1, addressLine2, city, state, country, postalCode, profileImage } = this.state;

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
                  <input accept="image/*" type="file" id="icon-button-file" style={{ display: 'none' }} onChange={this.handleImageChange} />
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
                {this.renderField('Customer ID', customerId, 'customerId')}
                {this.renderField('Email', email, 'email')}
                {this.renderField('Phone', phoneNum, 'phoneNum')}
                {this.renderField('Address Line 1', addressLine1, 'addressLine1')}
                {this.renderField('Address Line 2', addressLine2, 'addressLine2')}
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

export default UserProfile;
