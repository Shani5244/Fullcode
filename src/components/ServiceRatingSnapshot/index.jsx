// src/components/ServiceRatingSnapshot.jsx
import React from 'react';
import './Style.css';

const ServiceRatingSnapshot = ({ ratingStats }) => {
  const totalRatings = Object.values(ratingStats).reduce((sum, count) => sum + count, 0);

  const getPercentage = (count) =>
    totalRatings > 0 ? Math.round((count / totalRatings) * 100) : 0;

  return (
    <div className="service-rating-snapshot">
      <h4>Service Ratings</h4>
      {Object.entries(ratingStats)
        .sort(([a], [b]) => b - a)
        .map(([star, count]) => (
          <div key={star} className="rating-row">
            <span>{star}★</span>
            <div className="bar-container">
              <div
                className="bar-fill"
                style={{ width: `${getPercentage(count)}%` }}
              ></div>
            </div>
            <span className="count">{count}</span>
          </div>
        ))}
    </div>
  );
};

export default ServiceRatingSnapshot;
