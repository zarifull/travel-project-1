import React from 'react';
import '../styles/TourCard.css';
import { Link } from 'react-router-dom';
import { FaArrowRightLong } from "react-icons/fa6";
import RatingResult from '../Components/RatingResult';
import { useNavigate } from 'react-router-dom';


const TourCard = ({ tour }) => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate(`/book/${tour._id}`);
  };
  return (
    <section className="tour-card">
      <div className="tours-boxes">
        <div className="part1">
          <img
            className="boxImgFirst"
            src={tour.imageUrls?.[0] || "/placeholder.jpg"}
            alt={`Main ${tour.title}`}
          />
          <img
            className="boxImgSecond"
            src={tour.imageUrls?.[1] || "/placeholder.jpg"}
            alt={`Second ${tour.title}`}
          />
        </div>
        <div className="part2">
          <div className="card-part1">
          <p className="parts-prg">{tour.title}</p>
          <p className="parts-prg2 tour-lefts">$ {tour.price}</p>
          </div>
          <p className="parts-prg2">{tour.description}</p>
          <div className="card-part2">
          <RatingResult ratings={tour.ratings} />
          <p className="parts-prg2 tour-lefts">{tour.duration} {tour.duration === 1 ? "day" : "days"}</p>
          </div>
          <div className="link-detail">
            <Link to={`/tour-details/${tour._id}`} className="parts-link">
           MORE  <FaArrowRightLong />
          </Link>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default TourCard;
