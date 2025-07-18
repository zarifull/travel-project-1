import React from 'react';
import { FaStar } from 'react-icons/fa';

const RatingResult = ({ ratings }) => {
  if (!ratings || ratings.length === 0) {
    return <p style={{ color: '#999' }}>No ratings yet</p>;
  }

  const average = (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1);

  const formatReviews = (count) => {
    return count >= 1000 ? `${(count / 1000).toFixed(1)}K` : count;
  };

  return (
    <div>
      <FaStar color="#ffc107" />
      <span style={{ marginLeft: '5px', fontWeight: 'bold' }}>{average}</span>
      <span style={{ color: '#666', marginLeft: '5px' }}>
        ({formatReviews(ratings.length)} Reviews)
      </span>
    </div>
  );
};

export default RatingResult;
