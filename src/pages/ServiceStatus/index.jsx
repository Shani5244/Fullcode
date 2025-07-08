import React, { useState } from 'react';
import '../../pages/ServiceStatus/Style.css';

const ServiceStatus = ({ services }) => {
  const [serviceList, setServiceList] = useState(services || []);

  const updateStatus = (id, newStatus) => {
    const updated = serviceList.map(service =>
      service.id === id ? { ...service, status: newStatus } : service
    );
    setServiceList(updated);

    // ✅ Optional: API call to update status in backend
    // axios.post(`/api/services/${id}/status`, { status: newStatus });
  };

  return (
    <div className="service-status-container">
      <h2>Manage Service Status</h2>
      {serviceList.length === 0 ? (
        <p>No services available.</p>
      ) : (
        <div className="service-list">
          {serviceList.map(service => (
            <div key={service.id} className={`service-card ${service.status.toLowerCase()}`}>
              <h4>{service.title}</h4>
              <p>Customer: {service.customer}</p>
              <p>Date: {service.date}</p>
              <p>Status: <strong>{service.status}</strong></p>

              {service.status === 'Pending' ? (
                <button
                  onClick={() => updateStatus(service.id, 'Completed')}
                  className="complete-btn"
                >
                  Mark as Completed
                </button>
              ) : (
                <span className="status-done">✅ Completed</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServiceStatus;
