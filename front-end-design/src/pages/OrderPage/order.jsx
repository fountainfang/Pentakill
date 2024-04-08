import React from 'react';
import Navbar from '../Front-Page/Navbar';

// Multiple sample order data
const sampleOrders = [
  {
    orderId: 12345,
    eventId: 678,
    orderDate: new Date('2024-04-08T12:30:00'),
    ticketPrice: 150.00,
    customerId: 78910,
    eventName: "Name1",
    profileImage: "/sample_posters/small/s-1.jpg"
  },
  {
    orderId: 12346,
    eventId: 679,
    orderDate: new Date('2024-04-09T15:45:00'),
    ticketPrice: 165.00,
    customerId: 78911,
    eventName: "Name2",
    profileImage: "/sample_posters/small/s-2.jpg"
  }
];

// Order component
const Order = () => {
  const headerStyle = {
    backgroundColor: 'rgba(26, 0, 26, 0.9)',
    color: 'white',
    padding: '5rem 0',
    borderRadius: '5px',
    fontSize: '2rem',
    fontWeight: 'bold',
    margin: '1rem auto',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  };

  const subHeaderStyle = {
    marginTop: '0.5rem',
    fontSize: '1rem',
    fontWeight: 'normal',
  };

  const boxStyle = {
    border: '1px solid #ccc',
    boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
    borderRadius: '8px',
    padding: '1rem',
    margin: '0 auto 2rem auto', // added bottom margin for spacing between orders
    maxWidth: '1000px',
    backgroundColor: 'white',
    position: 'relative', // Needed for absolute positioning of the image
  };

  const detailStyle = {
    textAlign: 'left',
    marginBottom: '1rem',
  };

  const imageStyle = {
    position: 'absolute',
    top: '20px', // Shift the image down inside the box
    right: '20px',
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '3px solid white',
  };

  return (
    <>
      <Navbar />
      <div style={{ textAlign: 'center', padding: '1rem' }}>
        <div style={headerStyle}>
          Order Details
          <div style={subHeaderStyle}>Please review your order information below</div>
        </div>
        {sampleOrders.map((order) => (
          <div style={boxStyle} key={order.orderId}>
            <img src={order.profileImage} alt={`${order.eventName}`} style={imageStyle} />
            <div style={detailStyle}>
              <p><strong>Order ID:</strong> #{order.orderId}</p>
              <p><strong>Order Date:</strong> {order.orderDate.toLocaleDateString()}</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={detailStyle}>
                <p><strong>Event Name:</strong> {order.eventName}</p>
                <p>Qty: 1</p>
              </div>
              <div>
                <p><strong>${order.ticketPrice.toFixed(2)}</strong></p>
              </div>
            </div>
            <div style={{ borderTop: '1px solid #ccc', padding: '1rem 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <p>Taxes</p><p>$4.13</p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontWeight: 'bold' }}>
                <p>TOTAL</p><p>${(order.ticketPrice + 4.13 + 5).toFixed(2)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Order;
