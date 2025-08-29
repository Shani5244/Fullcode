import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [savedForLater, setSavedForLater] = useState([]);

  const addToCart = (service) => {
    setCart((prevCart) => [...prevCart, service]);
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((service) => service.id !== id));
  };

  const saveForLater = (service) => {
    removeFromCart(service.id);
    setSavedForLater((prev) => [...prev, service]);
  };

  const moveToCart = (service) => {
    setSavedForLater((prev) => prev.filter((item) => item.id !== service.id));
    setCart((prevCart) => [...prevCart, service]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, savedForLater, saveForLater, moveToCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
