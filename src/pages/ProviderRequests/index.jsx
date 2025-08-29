import React, { useEffect, useState, useCallback } from "react";
import "./Style.css";

const ProviderRequests = () => {
  const provider = JSON.parse(localStorage.getItem("loggedInProvider")) || {
    id: "provider123",
    name: "Demo Provider",
    phone: "999‑999‑9999",
    email: "demo@provider.com",
    image: "/demoProvider.png",
  };

  const [requests, setRequests] = useState([]);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const loadRequests = useCallback(() => {
    const all = JSON.parse(localStorage.getItem("bookingHistory")) || [];
    const providerRequests = all.filter((b) => b.providerId === provider.id);
    setRequests(providerRequests);
  }, [provider.id]);

  useEffect(() => {
    loadRequests();
  }, [loadRequests]);

  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  const updateStatus = (id, newStatus) => {
    const all = JSON.parse(localStorage.getItem("bookingHistory")) || [];

    const updated = all.map((b) =>
      b.id === id
        ? {
            ...b,
            status: newStatus,
            provider,
          }
        : b
    );

    localStorage.setItem("bookingHistory", JSON.stringify(updated));
    loadRequests();

    const statusMsg = {
      Confirmed: "✅ Booking accepted successfully!",
      Cancelled: "❌ Booking rejected.",
      Pending: "⏳ Booking marked as waiting.",
    };
    showToastMessage(statusMsg[newStatus]);
  };

  return (
    <div className="provider-requests">
      <h2>Incoming Booking Requests</h2>

      {showToast && (
        <div className="toast-message">
          {toastMessage}
        </div>
      )}

      {requests.length === 0 ? (
        <p>No current requests 🙌</p>
      ) : (
        requests.map((r) => (
          <div key={r.id} className="request-card">
            <p><strong>Service:</strong> {r.name}</p>
            <p><strong>Client Location:</strong> {r.location?.city ?? "—"}</p>
            <p><strong>Status:</strong> {r.status}</p>

            <div className="request-actions">
              <button onClick={() => updateStatus(r.id, "Confirmed")}>✅ Accept</button>
              <button onClick={() => updateStatus(r.id, "Cancelled")}>❌ Reject</button>
              <button onClick={() => updateStatus(r.id, "Pending")}>⏳ Wait</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ProviderRequests;
