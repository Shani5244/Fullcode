import React, { useEffect, useState } from 'react';

const Earnings = () => {
  const provider = JSON.parse(localStorage.getItem('loggedInProvider'));
  const [earnings, setEarnings] = useState(0);

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem('bookingHistory')) || [];
    const total = all
      .filter(b => b.providerId === provider?.id && b.status === 'Confirmed')
      .reduce((sum, b) => sum + Number(b.price || 0), 0);
    setEarnings(total);
  }, [provider?.id]);

  return (
    <div>
      <h2>Total Earnings</h2>
      <p>💰 ₹{earnings}</p>
    </div>
  );
};

export default Earnings;
