import React, { useState } from 'react';
import ordersList from '../../data/ordersData';
import './Style.css';

const Orders = () => {
  const [orders, setOrders] = useState(ordersList);

  const handleCancel = (orderId) => {
    const updatedOrders = orders.filter(order => order.id !== orderId);
    setOrders(updatedOrders);
    alert('Order cancelled successfully');
  };

  return (
    <div className="order-wrapper">
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No active orders.</p>
      ) : (
        <ul>
          {orders.map(order => (
            <li key={order.id} className="order-item">
              <span>{order.service} - {order.status}</span>
              <button onClick={() => handleCancel(order.id)} className="cancel-btn">
                Cancel
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Orders;
