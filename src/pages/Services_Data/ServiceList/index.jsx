import React from 'react';
import ServiceCard from '../ServiceCard/index';
import PeopleData from '../../../data/PeopleData';

const ServiceList = () => {
  return (
    <div className="service-list">
      {PeopleData.map((service) => (
        <ServiceCard key={service.id} service={service} /> // ✅ required prop
      ))}
    </div>
  );
};

export default ServiceList;
