import React from 'react';
import { Link } from 'react-router-dom';
import '../../pages/About/Style.css';

const About = () => {
    return (
        <div className="page-container" style={{  }}>
            <h1 className="page-title">About Us</h1>
            <p className="page-description">
                We are a company focused on providing high-quality services to our clients. 
                Our mission is to deliver excellent solutions that help businesses grow.
            </p>
            <Link to="/" className="page-button">Go Home</Link>
        </div>
    );
};

export default About;
