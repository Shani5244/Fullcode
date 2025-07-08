import React from 'react';
import { Link } from 'react-router-dom';
import '../../pages/Services/Style.css';


const Services = () => {
    const services = [
        { title: 'Web Development', description: 'Building responsive and fast websites.' },
        { title: 'Graphic Design', description: 'Creating attractive and modern designs.' },
        { title: 'Digital Marketing', description: 'Promoting your brand to the right audience.' },
    ];

    return (
        <div className="page-container" style={{  }}>
            <h1 className="page-title">Our Services</h1>
            {services.map((service, index) => (
                <div key={index} className="service-card">
                    <h2 className="service-title">{service.title}</h2>
                    <p>{service.description}</p>
                </div>
            ))}
            <Link to="/" className="page-button">Go Home</Link>
        </div>
    );
};

export default Services;
