import React,{useState} from "react";
import "../styles/TourCard.css";
import { Link } from "react-router-dom";
import RatingResult from "../Components/RatingResult";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const TourCard = ({ tour }) => {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const [expanded, setExpanded] = useState(false);

  const title = tour?.title?.[lang] || "";
  const description = tour?.description?.[lang] || "";
  const fullDescription = tour.description?.[lang] || "";

  const getShortDescription = (text) => {
    const words = text.split(" ");
    if (words.length <= 30) return text;
    return words.slice(0, 30).join(" ") + "...";
  };

  return (
    <motion.section
      className="tour-card"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <div className="tours-boxes">

        <div className="part1">
          <img
            className="boxImgFirst"
            src={tour.imageUrls?.[0] || "/placeholder.jpg"}
            alt={title}
          />
          <img
            className="boxImgSecond"
            src={tour.imageUrls?.[1] || "/placeholder.jpg"}
            alt={`${title} second image`}
          />
        </div>

        <div className="part2">
          <div className="card-part1">
            <p className="parts-prg">{title}</p>
            <p className="parts-prg tour-lefts">$ {tour.price}</p>
          </div>

          <p className="parts-prg2">
            {expanded ? fullDescription : getShortDescription(fullDescription)}
            {fullDescription.split(" ").length > 30 && (
              <button 
                className="show-btn"
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? "←" : "→"}
              </button>
            )}
          </p>

          <div className="card-part2">
            <RatingResult className="parts-prg" ratings={tour.ratings} />
            <p className="parts-prg tour-lefts">
              {tour.duration} {tour.duration === 1 ? "day" : "days"}
            </p>
          </div>

          <div className="link-detail">
            <Link to={`/tour-details/${tour._id}`} className="parts-link">
              MORE <span>➔</span>
            </Link>
          </div>
        </div>

      </div>
    </motion.section>
  );
};

export default TourCard;
