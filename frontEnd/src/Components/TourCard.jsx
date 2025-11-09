import React from 'react';
import '../styles/TourCard.css';
import { Link } from 'react-router-dom';
import RatingResult from '../Components/RatingResult';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const TourCard = ({ tour }) => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <section className="tour-card">
      <div className="tours-boxes">
        <div className="part1">
          <img
            className="boxImgFirst"
            src={tour.imageUrls?.[0] || "/placeholder.jpg"}
            alt={`Main ${tour.title[lang]}`}
          />
          <img
            className="boxImgSecond"
            src={tour.imageUrls?.[1] || "/placeholder.jpg"}
            alt={`Second ${tour.title[lang]}`}
          />
        </div>
        <div className="part2">
          <div className="card-part1">
            <p className="parts-prg">{tour.title[lang]}</p>
            <p className="parts-prg2 tour-lefts">$ {tour.price}</p>
          </div>
          <p className="parts-prg2">{tour.description[lang]}</p>
          <div className="card-part2">
            <RatingResult ratings={tour.ratings} />
            <p className="parts-prg2 tour-lefts">{tour.duration} {tour.duration === 1 ? "day" : "days"}</p>
          </div>
          <div className="link-detail">
            <Link to={`/tour-details/${tour._id}`} className="parts-link">
              MORE <span>➔</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TourCard;
