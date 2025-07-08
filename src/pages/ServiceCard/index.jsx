import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../pages/ServiceCard/Style.css';

const ServiceCard = ({ service }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/details/${service.id}`, { state: { service } });
  };

  const basicPrice = service?.priceOptions?.basic;

  return (
    <div className="service-card" onClick={handleClick}>
      <img src={service.image} alt={service.name} />
      <h4>{service.name}</h4>
      <p>
        {basicPrice ? `From ₹${basicPrice}` : 'Price not available'}
      </p>
    </div>
  );
};

export default ServiceCard;
