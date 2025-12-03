import React from 'react';
import { FaStar } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import '../styles/RatingResult.css';

const RatingResult = ({ ratings }) => {
  const { t } = useTranslation();

  if (!ratings || ratings.length === 0) {
    return <p className="reviews">No ratings yet</p>;
  }

  const average = (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1);

  const formatReviews = (count) => {
    return count >= 1000 ? `${(count / 1000).toFixed(1)}K` : count;
  };

  return (
    <div className="rating-result">
      <FaStar className="star-icon" />
      <span className="average">{average}</span>
      <span className="reviews">
        ({formatReviews(ratings.length)} {t("ratings.reviews")})
      </span>
    </div>
  );
};

export default RatingResult;
