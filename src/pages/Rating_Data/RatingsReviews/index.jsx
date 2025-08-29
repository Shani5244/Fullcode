import React, { useState } from 'react';
import './Style.css';

const RatingsReviews = ({ reviews }) => {
  const [newReview, setNewReview] = useState('');
  const [newRating, setNewRating] = useState(0);
  const [allReviews, setAllReviews] = useState(reviews || []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newReview && newRating > 0) {
      const newEntry = {
        id: Date.now(),
        text: newReview,
        rating: newRating,
        user: 'Anonymous User', // Replace with logged-in user
        date: new Date().toLocaleDateString()
      };
      setAllReviews([newEntry, ...allReviews]);
      setNewReview('');
      setNewRating(0);
    }
  };

  return (
    <div className="ratings-reviews">
      <h2>Ratings & Reviews</h2>

      <form onSubmit={handleSubmit} className="review-form">
        <textarea
          placeholder="Write your review..."
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
        ></textarea>

        <select value={newRating} onChange={(e) => setNewRating(Number(e.target.value))}>
          <option value="0">Select Rating</option>
          {[1, 2, 3, 4, 5].map(num => (
            <option key={num} value={num}>{num} Star{num > 1 && 's'}</option>
          ))}
        </select>

        <button type="submit">Submit Review</button>
      </form>

      <div className="reviews-list">
        {allReviews.length === 0 ? (
          <p>No reviews yet. Be the first!</p>
        ) : (
          allReviews.map((review) => (
            <div key={review.id} className="review-item">
              <div className="rating">{'⭐'.repeat(review.rating)}</div>
              <p>{review.text}</p>
              <small>{review.user} - {review.date}</small>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RatingsReviews;
