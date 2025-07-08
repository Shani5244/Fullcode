import React from 'react';
import peopleData from '../../data/PeopleData';
import ServiceCard from '../../pages/ServiceCard/index';
import '../../pages/Home/Style.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="card-container">
        {peopleData.map(service => (
          <ServiceCard key={service.id} service={service} showDetails={false} />
        ))}
      </div>
    </div>
  );
};

export default Home;
