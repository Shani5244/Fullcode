// src/components/Cart/index.jsx
import React, { useState, useEffect } from 'react';
import './Style.css';
import { useNavigate } from 'react-router-dom';
import { getCart, removeCartItem, clearCart } from '../../API/CartApi';

const Cart = ({ userId }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ✅ Fetch cart from API
  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      const data = await getCart(userId);
      setCart(data.items || []);
      setLoading(false);
    };

    if (userId) fetchCart();
  }, [userId]); // ✅ ESLint warning removed

  // ✅ Remove item
  const handleRemove = async (serviceId) => {
    const updatedCart = await removeCartItem({ userId, serviceId });
    if (updatedCart) setCart(updatedCart.items || []);
  };

  // ✅ Clear entire cart
  const handleClearCart = async () => {
    const cleared = await clearCart(userId);
    if (cleared) setCart([]);
  };

  // ✅ Book Now
  const handleBookNow = (service) => {
    navigate('/booking', { state: { service } });
  };

  if (loading) return <p>Loading cart...</p>;

  return (
    <div className="cart-container">
      <h2>Your Booking Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map(service => (
            <div key={service.serviceId} className="cart-item">
              <img src={service.image || ''} alt={service.serviceName} />
              <div>
                <h4>{service.serviceName}</h4>
                <p>Price: ₹{service.price}</p>
                <p>Quantity: {service.quantity}</p>
                <button onClick={() => handleRemove(service.serviceId)}>Remove</button>
                <button onClick={() => handleBookNow(service)}>Book Now</button>
              </div>
            </div>
          ))}
          <button className="clear-btn" onClick={handleClearCart}>
            Clear Cart
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
