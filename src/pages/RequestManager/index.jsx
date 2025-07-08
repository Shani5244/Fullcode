import React, { useState } from 'react';
import '../../pages/RequestManager/Style.css';

const RequestManager = ({ requests }) => {
  const [bookingRequests, setBookingRequests] = useState(requests || []);

  const handleStatusChange = (id, newStatus) => {
    const updatedRequests = bookingRequests.map(req => 
      req.id === id ? { ...req, status: newStatus } : req
    );
    setBookingRequests(updatedRequests);

    // TODO: Call API to update status in backend
    // axios.post(`/api/update-request/${id}`, { status: newStatus });
  };

  return (
    <div className="request-manager">
      <h2>Booking Requests</h2>
      {bookingRequests.length === 0 ? (
        <p>No booking requests available.</p>
      ) : (
        <div className="request-list">
          {bookingRequests.map(req => (
            <div key={req.id} className={`request-card ${req.status.toLowerCase()}`}>
              <h4>{req.customerName}</h4>
              <p>Service: {req.service}</p>
              <p>Date: {req.date}</p>
              <p>Status: <strong>{req.status}</strong></p>

              {req.status === 'Pending' && (
                <div className="actions">
                  <button onClick={() => handleStatusChange(req.id, 'Accepted')}>Accept</button>
                  <button onClick={() => handleStatusChange(req.id, 'Rejected')}>Reject</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RequestManager;
