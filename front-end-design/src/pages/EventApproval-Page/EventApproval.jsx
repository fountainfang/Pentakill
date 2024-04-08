import React, { useState, useEffect } from 'react';
import Navbar from '../Front-Page/Navbar';
import api from '../../api'; // Adjust this import path to match your project structure
import { useNavigate } from 'react-router-dom';

const EventApproval = () => {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [approvedEvents, setApprovedEvents] = useState([]);
    const [rejectedEvents, setRejectedEvents] = useState([]);

    useEffect(() => {
        document.title = "Event Approval";
        fetchEvents();
    }, []);

    const fetchEvents = () => {
        api.getEvents()
            .then(response => {
                console.log("API Response:", response);
                if (response && response.data) {
                    // Assuming the response.data directly contains the array of events
                    setEvents(response.data);
                    setApprovedEvents(response.data.filter(event => event.approvalStatus === 'Approved'));
                    setRejectedEvents(response.data.filter(event => event.approvalStatus === 'Rejected'));
                } else {
                    console.error('Unexpected response structure:', response);
                }
            })
            .catch(error => {
                console.error("Failed to fetch events:", error);
            });
    };

    const handleStatusChange = (eventId, newStatus) => {
        api.updateStatus({ eventId, approvalStatus: newStatus })
            .then(response => {
                console.log("Update Status Response:", response);
                console.log(response.data.msg)
                if (response && response.data && response.data.msg === "Event status updated successfully") {
                    alert(`The status of event ID ${eventId} is now "${newStatus}".`);
                    fetchEvents(); // Refresh the lists of events
                } else {
                    console.error('Failed to update event status:', response);
                }
            }).catch(error => {
                console.error("Failed to update status:", error);
            });
    };

    // Function to render each event card
    const renderEventCard = (event) => (
        <div key={event.eventId} style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', background: '#fff', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', margin: '20px 0', padding: '20px', width: '90%', maxWidth: '800px' }}>
            <img src={event.profileImage} alt={event.eventName} style={{ height: '240px', width: '160px', objectFit: 'cover', marginRight: '20px', borderRadius: '4px' }} />
            <div style={{ flex: '1', marginRight: '20px' }}>
                <h3>{event.eventName}</h3>
                <p>{event.eventDesc}</p>
            </div>
            <div>
                <button style={{ padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px', backgroundColor: 'lightgreen', marginRight: '10px' }} onClick={() => handleStatusChange(event.eventId, 'Approved')}>Approve</button>
                <button style={{ padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px', backgroundColor: 'tomato' }} onClick={() => handleStatusChange(event.eventId, 'Rejected')}>Reject</button>
            </div>
        </div>
    );

    return (
        <>
            <Navbar />
            <h1 style={{ textAlign: 'center' }}>Event Approval</h1>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h2>Pending Events</h2>
                {events.filter(event => event.approvalStatus === 'Pending').map(renderEventCard)}
                <h2>Approved Events</h2>
                {approvedEvents.length > 0 ? approvedEvents.map(renderEventCard) : <p>No approved events to display.</p>}
                <h2>Rejected Events</h2>
                {rejectedEvents.length > 0 ? rejectedEvents.map(renderEventCard) : <p>No rejected events to display.</p>}
            </div>
        </>
    );
};

export default EventApproval;
