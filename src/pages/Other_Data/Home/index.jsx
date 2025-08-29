import React from 'react';
import peopleData from '../../../data/PeopleData';
import ServiceCard from '../../Services_Data/ServiceCard/index';
// import ProviderList from "../../pages/ProviderList";
import './Style.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="card-container">
        {peopleData.map(service => (
          <ServiceCard key={service.id} service={service} showDetails={false} />
        ))}
        {/* <ProviderList /> */}
      </div>
    </div>
  );
};

export default Home;
