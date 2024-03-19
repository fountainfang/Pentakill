import React, { useState } from 'react';
import Navbar from '../Front-Page/Navbar';
import { events as eventsData } from '../../data/EventData';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';



const EventApproval = () => {
    const navigate = useNavigate();
    const [events, setEvents] = useState(Object.values(eventsData));

    useEffect(() => {
        document.title = "Event Approval";
    }, []);

    const handleStatusChange = (id, newStatus, evt) => {
        evt.stopPropagation(); // Prevent click event when click button
        const updatedEvents = events.map(event => {
            if (event.id === id) {
                return { ...event, approvalStatus: newStatus };
            }
            return event;
        });
        setEvents(updatedEvents);
        alert(`The status of "${updatedEvents.find(e => e.id === id).title}" is now "${newStatus}".`);
    };

    // Enhanced styles for clearer visibility and better alignment
    const cardStyle = {
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center',
        background: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        margin: '20px 0',
        padding: '20px',
        width: '90%', // Make the box longer
        maxWidth: '800px', // Increase maximum width for larger display
    };

    const imageStyle = {
        height: '240px', // Increase picture size for better visibility
        width: '160px', // Adjust width accordingly
        objectFit: 'cover',
        marginRight: '20px',
        borderRadius: '4px',
    };

    const detailsStyle = {
        flex: '1',
        marginRight: '20px', // Ensure adequate spacing
    };

    const buttonStyle = {
        padding: '10px 20px', // Adjust for more content space
        border: '2px solid', // Make border thicker for visibility
        borderRadius: '4px', // Rounded edges
        cursor: 'pointer',
        margin: '0 10px', // Increase margin for better separation
        fontWeight: 'bold',
        transition: '0.3s ease background-color',
        fontSize: '16px', // Increase font size for better readability
    };

    const approveButtonStyle = {
        ...buttonStyle,
        backgroundColor: 'white', // White background
        color: 'green', // Green text
        borderColor: 'green', // Green border
    };

    const rejectButtonStyle = {
        ...buttonStyle,
        backgroundColor: 'red', // Red background
        color: 'white', // White text
        borderColor: 'darkred', // Dark red border for contrast
    };

    return (
        <>
            <Navbar />
            <h1 style={{ textAlign: 'center' }}>Event Approval</h1>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {events.map(event => (
                    <div key={event.id} style={cardStyle} onClick={() => navigate(`/event/${event.id}`)}>
                        <img src={event.posterImage} alt={event.title} style={imageStyle} />
                        <div style={detailsStyle}>
                            <h3>{event.title}</h3>
                            <p>{event.description}</p>
                        </div>
                        <div>
                            <button
                                onClick={(e) => handleStatusChange(event.id, 'Approved', e)}
                                style={approveButtonStyle}
                            >
                                Approve
                            </button>
                            <button
                                onClick={(e) => handleStatusChange(event.id, 'Rejected', e)}
                                style={rejectButtonStyle}
                                onMouseEnter={(e) => e.target.style.backgroundColor = '#bd2130'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = 'red'}
                            >
                                Reject
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default EventApproval;