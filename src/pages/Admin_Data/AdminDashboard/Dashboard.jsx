import React, { useState } from 'react';
import dummyServices from '../../../Datas/dummyServices'; // ✅ Use the correct import name
import AdminServiceCard from '../AdminServiceCard';

const AdminDashboard = () => {
  const [services, setServices] = useState(dummyServices); // ✅ Use the same name as imported

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete?');
    if (confirmDelete) {
      setServices(prev => prev.filter(service => service.id !== id));
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin - Manage Services</h2>
      <div className="card-container">
        {services.map(service => (
          <AdminServiceCard
            key={service.id}
            service={service}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
