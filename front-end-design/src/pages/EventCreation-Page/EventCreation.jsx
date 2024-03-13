import React, { useState, useEffect} from 'react';
import Navbar from '../Front-Page/Navbar';

function EventCreation() {
    const [eventData, setEventData] = useState({
        genre: '',
        name: '',
        date: '',
        time: '',
        location: '',
        ticketNumbers: '',
        ticketPrice: ''
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
        const newEventId = eventsList.length + 1; // Incremental event ID
        const newEvent = { ...eventData, id: newEventId };
        setEventsList([...eventsList, newEvent]);
        console.log(newEvent);

        // Optionally, reset form fields after submission
        setEventData({
            genre: '',
            name: '',
            date: '',
            time: '',
            location: '',
            ticketNumbers: '',
            ticketPrice: ''
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
                    <label style={labelStyle}>Event Genre:</label>
                    <select name="genre" value={eventData.genre} onChange={handleChange} required style={inputStyle}>
                        <option value="">Select a Genre</option>
                        <option value="Opera">Opera</option>
                        <option value="Concert">Concert</option>
                        <option value="Sports">Sports</option>
                        <option value="Theatre">Theatre</option>
                        <option value="Comedy">Comedy</option>
                        <option value="Others">Others</option>
                    </select>
                </div>
                <div style={divStyle}>
                    <label style={labelStyle}>Event Name:</label>
                    <input type="text" name="name" value={eventData.name} onChange={handleChange} required style={inputStyle} />
                </div>
                <div style={divStyle}>
                    <label style={labelStyle}>Event Date:</label>
                    <input type="date" name="date" value={eventData.date} onChange={handleChange} required style={inputStyle} />
                </div>
                <div style={divStyle}>
                    <label style={labelStyle}>Event Time:</label>
                    <input type="time" name="time" value={eventData.time} onChange={handleChange} required style={inputStyle} />
                </div>
                <div style={divStyle}>
                    <label style={labelStyle}>Event Location:</label>
                    <input type="text" name="location" value={eventData.location} onChange={handleChange} required style={inputStyle} />
                </div>
                <div style={divStyle}>
                    <label style={labelStyle}>Event Ticket Numbers Total:</label>
                    <input
                        type="text"
                        name="ticketNumbers"
                        pattern="\d*"
                        value={eventData.ticketNumbers}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                        onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')}
                        title="Please enter a positive number."
                    />
                </div>
                <div style={divStyle}>
                    <label style={labelStyle}>Event Ticket Price:</label>
                    <input
                        type="text"
                        name="ticketPrice"
                        pattern="^\d*(\.\d{0,2})?$"
                        value={eventData.ticketPrice}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                        onInput={(e) => e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1')}
                        title="Please enter a valid currency amount (e.g., 10, 10.5, or 10.50)."
                    />
                </div>
                <button type="submit" style={buttonStyle}>Submit</button>
            </form>
            {/* display submitted events for confirmation */}
             {eventsList.length > 0 && (
                <div style={submittedEventsStyle}>
                    <h3 style={{ textAlign: 'center' }}>Submitted Events:</h3>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {eventsList.map(event => (
                            <li key={event.id} style={eventItemStyle}>
                                <strong>ID:</strong> {event.id}, <strong>Name:</strong> {event.name}, <strong>Genre:</strong> {event.genre}, <strong>Date:</strong> {event.date}, <strong>Time:</strong> {event.time}, <strong>Location:</strong> {event.location}, <strong>Ticket Numbers:</strong> {event.ticketNumbers}, <strong>Ticket Price:</strong> ${event.ticketPrice}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
}

export default EventCreation;
