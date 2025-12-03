import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import '../styles/RatingResult.css';
import axiosInstance from '../api/axiosInstance';
import { useTranslation } from 'react-i18next';

const StarRating = ({ tourId, tour }) => {
  const { t } = useTranslation();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [ratings, setRatings] = useState(tour.ratings || []);

  const handleRating = async (value) => {
    setRating(value);
    try {
      const response = await axiosInstance.post(`/tours/${tourId}/rate`, { rating: Number(value) });
      setRatings(response.data.ratings);
      setSubmitted(true);
    } catch (err) {
      console.error('Submit failed:', err.response?.data || err.message);
      alert('Rating failed. Please try again later.');
    }
  };

  const averageRating =
    ratings.length > 0
      ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)
      : null;

  return (
    <div className="star-rating">
      <h4>{t("ratings.rateThisTour")}</h4>

      <div className="stars">
        {[...Array(5)].map((_, index) => {
          const value = index + 1;
          return (
            <label key={value}>
              <input type="radio" value={value} hidden />
              <FaStar
                size={30}
                className="star-btn"
                color={value <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
                onMouseEnter={() => setHover(value)}
                onMouseLeave={() => setHover(0)}
                onClick={() => handleRating(value)}
              />
            </label>
          );
        })}
      </div>

      {submitted && (
        <span className="submitted">✅ {t("ratings.thanks")}</span>
      )}

      <div className="rating-info">
        <span>
          <strong>{t("ratings.averageRating")}:</strong> {averageRating ?? t("ratings.noRatingsYet")}
        </span>
        <span>
          <strong>{t("ratings.totalRatings")}:</strong> {ratings.length}
        </span>
      </div>
    </div>
  );
};

export default StarRating;
