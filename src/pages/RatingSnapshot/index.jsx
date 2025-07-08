// src/components/RatingSnapshot.jsx
import React, { useState } from 'react';
import './Style.css';

const RatingSnapshot = ({ ratings }) => {
  const [selectedRating, setSelectedRating] = useState(null);
  const totalRatings = Object.values(ratings).reduce((sum, count) => sum + count, 0);

  const getPercentage = (count) =>
    totalRatings > 0 ? Math.round((count / totalRatings) * 100) : 0;

  return (
    <div className="rating-snapshot-container">
      <h3>Reviews</h3>
      <div className="snapshot-box">
        <h4>Rating Snapshot</h4>
        <p className="subtext">Click a row to highlight that rating.</p>
        {Object.entries(ratings)
          .sort(([a], [b]) => b - a)
          .map(([star, count]) => {
            const isSelected = selectedRating === star;
            return (
              <div
                key={star}
                className={`rating-row ${isSelected ? 'selected' : ''}`}
                onClick={() => setSelectedRating(star)}
              >
                <span>{star}★</span>
                <div className="bar-container">
                  <div
                    className="bar-fill"
                    style={{ width: `${getPercentage(count)}%` }}
                  ></div>
                </div>
                <span className="count">{count}</span>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default RatingSnapshot;
