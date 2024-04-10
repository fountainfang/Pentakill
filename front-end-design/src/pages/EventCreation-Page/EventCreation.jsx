import React, { Component } from 'react';
import api from '../../api'; // Adjust the path as necessary
import Navbar from '../Front-Page/Navbar'; // Adjust the path as necessary
import { useState, useEffect } from 'react';

function EventCreation() {
    const [eventData, setEventData] = useState({
        eventId: 0,
        userId: 0, // Assuming a user ID of 1 for now
        eventName: '',
        eventCategory: '',
        eventDesc: '',
        eventDate: '',
        startTime: '',
        endTime: '',
        address: '',
        totalTicket: 0,
        ticketPrice: 0.0,
        profileImage: '', // New field
        bannerImage: '', // New field
        rating: 0,
        approvalStatus: 'Pending',
    });

    //Change title of the page

    useEffect(() => {
        document.title = "New Event";
    }, []);

    // An array to hold a list of evenets
    const [eventsList, setEventsList] = useState([]);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Styles
    const submittedEventsStyle = {
        marginTop: '40px',
        padding: '20px',
        borderRadius: '8px',
        backgroundColor: '#f8f9fa', // Light grey background
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)', // Subtle shadow for depth
        maxWidth: '800px', // Limit maximum width for better readability
        margin: '40px auto', // Center the container
    };

    const eventItemStyle = {
        padding: '10px',
        borderBottom: '1px solid #dee2e6', // Light grey border for separation
        fontFamily: 'Arial, sans-serif',
        color: '#495057', // Dark grey color for text
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const userinfo = localStorage.getItem("rl")
        console.log(userinfo)
        console.log(JSON.parse(userinfo).customerid)

        // Correctly structured data to match backend expectations
        const eventSubmission = {
            userId: JSON.parse(userinfo).customerid, // Assuming a user ID of 1 for now
            eventName: eventData.eventName,
            eventCategory: eventData.eventCategory,
            eventDesc: eventData.eventDesc,
            eventDate: eventData.eventDate,
            startTime: eventData.startTime,
            endTime: eventData.endTime,
            address: eventData.address,
            totalTicket: parseInt(eventData.totalTicket, 10),
            ticketPrice: parseFloat(eventData.ticketPrice),
            profileImage: eventData.profileImage, // Placeholder for now
            bannerImage: eventData.bannerImage, // Placeholder for now
        };
        console.log(eventSubmission)

        // Using api.createEvent to submit the data
        api.createEvent(eventSubmission)
            .then(response => {
                console.log(response)

                console.log("Event submission successful:", response.data);
                alert('Event submission successful!');

                // Handle successful submission here, e.g., displaying a success message
                // Optionally reset the form or redirect the user
            })
            .catch(error => {
                console.log("Event submission error:", error);
                // Handle errors here, e.g., displaying error messages to the user
                alert('Event creation failed. Please try again later.');

            });
    };


    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start', // Align items to the left
        justifyContent: 'center',
        marginTop: '20px',
        width: '100%', // Ensure the form takes full width
        maxWidth: '500px', // Restrict max width for better layout
        margin: '20px auto', // Center form horizontally
    };

    const divStyle = {
        marginBottom: '20px', // Increased space between fields
        width: '100%', // Full width for alignment
        display: 'flex',
        flexDirection: 'column', // Stack inputs vertically under labels
        alignItems: 'flex-start', // Align to the left
    };

    const dropAreaStyle = {
        ...divStyle, // Reuse the divStyle for consistency
        border: '2px dashed #ccc',
        textAlign: 'center',
        padding: '20px',
        cursor: 'pointer',
        backgroundColor: '#f9f9f9', // Slightly different to stand out as a drop area
    };

    const labelStyle = {
        marginBottom: '5px', // Space between label and input
        fontWeight: 'bold',
        fontFamily: 'Arial, sans-serif',
    };

    const inputStyle = {
        width: '100%', // Full width for inputs
        borderRadius: '5px',
        border: '1px solid #ccc',
        padding: '8px',
        fontFamily: 'Arial, sans-serif',
    };

    const buttonStyle = {
        marginTop: '20px',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        backgroundColor: '#007bff',
        color: 'white',
        fontSize: '16px',
        fontFamily: 'Arial, sans-serif',
    };

    return (
        <>
            <Navbar />
            <form onSubmit={handleSubmit} style={formStyle}>
                <div style={divStyle}>
                    <label style={labelStyle}>Event Name:</label>
                    <input type="text" name="eventName" value={eventData.eventName} onChange={handleChange} required style={inputStyle} />
                </div>
                <div style={divStyle}>
                    <label style={labelStyle}>Event Category:</label>
                    <select name="eventCategory" value={eventData.eventCategory} onChange={handleChange} required style={inputStyle}>
                        <option value="">Select a Category</option>
                        <option value="Opera">Opera</option>
                        <option value="Concert">Concert</option>
                        <option value="Sports">Sports</option>
                        <option value="Theatre">Theatre</option>
                        <option value="Comedy">Comedy</option>
                        <option value="Others">Others</option>
                    </select>
                </div>
                <div style={divStyle}>
                    <label style={labelStyle}>Event Description:</label>
                    <textarea name="eventDesc" value={eventData.eventDesc} onChange={handleChange} required style={{ ...inputStyle, height: '100px' }} />
                </div>
                <div style={divStyle}>
                    <label style={labelStyle}>Event Date:</label>
                    <input type="date" name="eventDate" value={eventData.eventDate} onChange={handleChange} required style={inputStyle} />
                </div>
                <div style={divStyle}>
                    <label style={labelStyle}>Start Time:</label>
                    <input type="time" name="startTime" value={eventData.startTime} onChange={handleChange} required style={inputStyle} />
                </div>
                <div style={divStyle}>
                    <label style={labelStyle}>End Time:</label>
                    <input type="time" name="endTime" value={eventData.endTime} onChange={handleChange} required style={inputStyle} />
                </div>
                <div style={divStyle}>
                    <label style={labelStyle}>Event Location:</label>
                    <input type="text" name="address" value={eventData.address} onChange={handleChange} required style={inputStyle} />
                </div>
                <div style={divStyle}>
                    <label style={labelStyle}>Total Ticket Numbers:</label>
                    <input
                        type="number"
                        name="totalTicket"
                        value={eventData.totalTicket}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                        min="0"
                    />
                </div>
                <div style={divStyle}>
                    <label style={labelStyle}>Ticket Price:</label>
                    <input
                        type="number"
                        name="ticketPrice"
                        value={eventData.ticketPrice}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                        step="0.01"
                        min="0"
                    />
                </div>
                {/* <div style={divStyle}>
                    <label style={labelStyle}>Profile Image URL:</label>
                    <input
                        type="text"
                        name="profileImage"
                        value={eventData.profileImage}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />
                </div>
                <div style={divStyle}>
                    <label style={labelStyle}>Banner Image URL:</label>
                    <input
                        type="text"
                        name="bannerImage"
                        value={eventData.bannerImage}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />
                </div> */}

                <button type="submit" style={buttonStyle}>Submit Event</button>
            </form>
            {/* Display submitted events for confirmation */}
            {eventsList.length > 0 && (
                <div style={submittedEventsStyle}>
                    <h3 style={{ textAlign: 'center' }}>Submitted Events:</h3>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {eventsList.map((event, index) => (
                            <li key={index} style={eventItemStyle}>
                                <strong>ID:</strong> {event.eventId}, <strong>Name:</strong> {event.eventName}, <strong>Category:</strong> {event.eventCategory}, <strong>Description:</strong> {event.eventDesc}, <strong>Date:</strong> {event.eventDate}, <strong>Start Time:</strong> {event.startTime}, <strong>End Time:</strong> {event.endTime}, <strong>Location:</strong> {event.address}, <strong>Total Tickets:</strong> {event.totalTicket}, <strong>Ticket Price:</strong> ${event.ticketPrice}, <strong>Rating:</strong> {event.eventRating}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
}

export default EventCreation;
