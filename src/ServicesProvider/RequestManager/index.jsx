import React, { useEffect, useState } from "react";
import "./Style.css";
import { getUserRequests } from "../../API/RequestApi";

const RequestManager = ({ userId }) => {
  const [bookingRequests, setBookingRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      if (!userId) return;
      const requests = await getUserRequests(userId);
      setBookingRequests(requests);
    };
    fetchRequests();
  }, [userId]);

  return (
    <div className="request-manager">
      <h2>My Booking Requests</h2>
      {bookingRequests.length === 0 ? (
        <p>No booking requests found.</p>
      ) : (
        <div className="request-list">
          {bookingRequests.map((req) => (
            <div key={req._id} className={`request-card ${req.status.toLowerCase()}`}>
              <h4>Service: {req.serviceId?.name || "Service"}</h4>
              <p>Provider: {req.providerId?.name || "Provider"}</p>
              <p>Date: {new Date(req.createdAt).toLocaleString()}</p>
              <p>Status: <strong>{req.status}</strong></p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RequestManager;
