// src/data/RatingsData.js

export const getRatings = () => {
  return JSON.parse(localStorage.get('ratings')) || {};
};

export const saveRating = (serviceId, newRating) => {
  const ratings = getRatings();
  if (!ratings[serviceId]) {
    ratings[serviceId] = { total: 0, count: 0 };
  }
  ratings[serviceId].total += newRating;
  ratings[serviceId].count += 1;
  localStorage.setItem('ratings', JSON.stringify(ratings));
};

export const getAverageRating = (serviceId) => {
  const ratings = getRatings();
  const service = ratings[serviceId];
  return service ? (service.total / service.count).toFixed(1) : 'N/A';
};
