import React, { useState } from 'react';

const AssignedWorkForm = ({ providerId }) => {
  const [status, setStatus] = useState('');

  const handleSubmit = () => {
    // Save status to backend or localStorage
    alert(`Status Updated: ${status}`);
  };

  return (
    <div>
      <h4>Update Work Status</h4>
      <select onChange={(e) => setStatus(e.target.value)} value={status}>
        <option value="">Select</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
      </select>
      <button onClick={handleSubmit}>Update</button>
    </div>
  );
};

export default AssignedWorkForm;
