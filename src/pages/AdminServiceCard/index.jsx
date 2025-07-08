import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../pages/AdminServiceCard/Style.css';

const AdminServiceCard = ({ service, onDelete }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/admin/edit/${service.id}`, { state: { service } });
  };

  return (
    <div className="admin-service-card">
      <img src={service.image} alt={service.name} />
      <div className="info">
        <h4>{service.name}</h4>
        <p>{service.description}</p>
        <p><strong>Price:</strong> ₹{service.price}</p>
        <button onClick={handleEdit}>Edit</button>
        <button onClick={() => onDelete(service.id)}>Delete</button>
      </div>
    </div>
  );
};

export default AdminServiceCard;
