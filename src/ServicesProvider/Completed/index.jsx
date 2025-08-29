import React, { useEffect, useState } from 'react';

const Completed = () => {
  const provider = JSON.parse(localStorage.getItem('loggedInProvider'));
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem('bookingHistory')) || [];
    const filtered = all.filter(b => b.providerId === provider?.id && b.status === 'Confirmed');
    setCompleted(filtered);
  }, [provider?.id]);

  return (
    <div>
      <h2>Completed Services</h2>
      {completed.map(b => (
        <div key={b.id} className="card">
          <p><strong>Service:</strong> {b.name}</p>
          <p><strong>Client:</strong> {b.location?.city}</p>
          <p><strong>Price:</strong> ₹{b.price}</p>
        </div>
      ))}
    </div>
  );
};

export default Completed;
