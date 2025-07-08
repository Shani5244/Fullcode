// src/components/RatingStars.jsx
import React from 'react';
import './Style.css';

const RatingStars = ({ rating, onRate }) => {
  return (
    <div className="rating-stars">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => onRate(star)}
          className={star <= rating ? 'star filled' : 'star'}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default RatingStars;
