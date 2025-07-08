import React, { useState } from 'react';
import './Style.css';

const InteractiveStarRating = ({ totalStars = 5, onRate }) => {
  const [selectedStars, setSelectedStars] = useState(0);
  const [hoveredStars, setHoveredStars] = useState(0);

  const handleClick = (star) => {
    setSelectedStars(star);
    onRate && onRate(star);
  };

  return (
    <div className="star-rating-container">
      {[...Array(totalStars)].map((_, i) => {
        const starNumber = i + 1;
        return (
          <span
            key={starNumber}
            className={`star ${hoveredStars >= starNumber || selectedStars >= starNumber ? 'filled' : ''}`}
            onMouseEnter={() => setHoveredStars(starNumber)}
            onMouseLeave={() => setHoveredStars(0)}
            onClick={() => handleClick(starNumber)}
          >
            ★
          </span>
        );
      })}
      <p>You rated: {selectedStars} star{selectedStars !== 1 ? 's' : ''}</p>
    </div>
  );
};

export default InteractiveStarRating;
