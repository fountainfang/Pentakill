import React, { useState, useEffect } from 'react';
import Navbar from '../Front-Page/Navbar';
import api from '../../api';

const Order = () => {
  const [sampleOrders, setSampleOrders] = useState([]); // 使用 useState 来存储订单数据

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userinfo = localStorage.getItem("rl");
        const customerId = JSON.parse(userinfo).customerid;

        const response = await api.getOrder({ customerId });

        const orders = response.data;

        console.log("Orders successfully fetched:", orders);
        const eventsInfo = JSON.parse(localStorage.getItem("eventsData"));
        console.log(eventsInfo[0])

        const ordersWithDetails = orders.map((order) => {
          const eventInfo = eventsInfo[0].find(event => event.eventId === order.eventId);

          if (eventInfo) {
            // 如果找到对应的事件信息，则添加到订单中
            return {
              ...order,
              eventName: eventInfo.eventName,
              profileImage: eventInfo.profileImage
            };
          } else {
            // 如果未找到对应的事件信息，则默认值
            return {
              ...order,
              eventName: 'Unknown Event',
              profileImage: '/default_profile_image.jpg' // 未知事件的默认图片
            };
          }
        });



        // 将获取到的订单数据存储到 sampleOrders 中
        setSampleOrders(ordersWithDetails);
      } catch (error) {
        console.log("Error fetching orders:", error);
      }
    };

    // 调用 fetchOrders 函数来获取订单数据
    fetchOrders();
  }, []); // 使用空数组作为 useEffect 的依赖项，确保只在组件挂载时调用一次

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
              <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={detailStyle}>
                <p><strong>Event Name:</strong> {order.eventName}</p>
                <p>Qty: 1</p>
              </div>
              <div>
                <p><strong>${order.TicketPrice}</strong></p>
              </div>
            </div>
            <div style={{ borderTop: '1px solid #ccc', padding: '1rem 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <p>Taxes</p><p>$4.13</p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontWeight: 'bold' }}>
                <p>TOTAL</p><p>${(order.TicketPrice + 4.13 + 5)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Order;
