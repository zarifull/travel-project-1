import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import axios from '../api/axiosInstance';
import '../styles/SearchBox.css';

const StarRating = ({ tourId, tour }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [ratings, setRatings] = useState(tour.ratings || []);

  const handleRating = async (value) => {
    setRating(value); // визуалдык үчүн
    try {
      const response = await axios.post(`/tours/${tourId}/rate`, { rating: value });
      setRatings(response.data.ratings);
      setSubmitted(true);
    } catch (err) {
      console.error('Submit failed:', err);
    }
  };

  const averageRating =
    ratings.length > 0
      ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)
      : null;

  return (
    <div className='star-rating' >
      <h4>Rate this tour:</h4>
      <div>
        {[...Array(5)].map((_, index) => {
          const value = index + 1;
          return (
            <label key={value}>
              <input
                type="radio"
                value={value}
                style={{ display: 'none' }}
              />
              <FaStar
                size={30}
                color={value <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
                onMouseEnter={() => setHover(value)}
                onMouseLeave={() => setHover(0)}
                onClick={() => handleRating(value)}
                style={{ cursor: 'pointer' }}
              />
            </label>
          );
        })}
      </div>

      {submitted && (
        <span style={{
          fontSize: '0.8rem',
          color: 'green',
          display: 'inline-block',
         
        }}>
          ✅ Thanks!
        </span>
      )}


      <div style={{ marginTop: '15px', display: 'flex', flexDirection: 'column', }}>
        <span>
          <strong>Average Rating:</strong>{' '}
          {averageRating !== null ? averageRating : 'Not rated yet'}
        </span>
        <span>
          <strong>Total Ratings:</strong> {ratings.length}
        </span>
      </div>
    </div>
  );
};

export default StarRating;
