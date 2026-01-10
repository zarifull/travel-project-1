import React, { useRef, useState, useEffect } from 'react';
import '../../styles/TourDetails.css';
import { useParams, useNavigate } from 'react-router-dom';
import { FaLocationDot } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import StarRating from '../../Components/StarRating';
import RatingResult from '../../Components/RatingResult';
import { useTranslation } from 'react-i18next';
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const boxVariants = {
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } }
};

const TourDetails = ({ tours }) => {
  const detailRef = useRef();
  const { id } = useParams();
  const [openMenu, setOpenMenu] = useState(false);
  const crudRef = useRef(null);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (crudRef.current && !crudRef.current.contains(event.target)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!tours || !Array.isArray(tours) || tours.length === 0) {
    return <p>Loading tours...</p>;
  }

  const tour = tours.find((t) => t._id === id);

  if (!tour) {
    return (
      <p style={{ width: "100%", height: "100vh", background: "#666" }}>
        Tour not found
      </p>
    );
  }

  const ratings = tour.ratings || [];

  const handleBookNow = () => {
    navigate(`/booking-page/${tour._id}`);
  };

  return (
    <section className="tour-details">
      <div className="container">
        <motion.section
          className="tourDetails-container"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="details-title">{tour.title[lang]}</h2>

          <div className="detail-slider">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000 }}
              loop={tour.imageUrls?.length > 1}
              spaceBetween={20}
              slidesPerView={1}
              className="slider-prev"
            >
              {tour.imageUrls?.length > 0 ? (
                tour.imageUrls.map((img, index) => (
                  <SwiperSlide key={index}>
                    <img src={img} alt={`Slide ${index + 1}`} className="custom-slide-image" />
                  </SwiperSlide>
                ))
              ) : (
                <SwiperSlide>
                  <img src="/default.jpg" alt="Default" className="custom-slide-image" />
                </SwiperSlide>
              )}
            </Swiper>
          </div>

          <div className="rate-result">
            <RatingResult ratings={ratings} />
          </div>

          <div className="detail-info">
            <div className="detail-description">
              <p className="detail-descrpn">
                <strong>{t("tour.description")} : </strong> {tour.description[lang]}
              </p>
            </div>

            <motion.div
              className="info-block"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              <motion.p className="detail-box detail-location" variants={boxVariants}>
                <strong><FaLocationDot /> {t("tour.location")}:</strong> {tour.location[lang]}
              </motion.p>

              <motion.p className="detail-box detail-duration" variants={boxVariants}>
                <strong>{t("tour.duration")}:</strong> {tour.duration} days
              </motion.p>

              <motion.p className="detail-box detail-price" variants={boxVariants}>
                <strong>{t("tour.price")}:</strong> {tour.price} сом 
              </motion.p>

              <motion.p className="detail-box detail-category" variants={boxVariants}>
                <strong>{t("tours.category")}:</strong> {tour.category}
              </motion.p>

              <motion.div className="detail-box detail-startDates" variants={boxVariants}>
                <strong>{t("tour.startDates")}:</strong>
                <ul>
                  {tour.startDates?.map((date, i) => (
                    <li key={i}>{new Date(date).toLocaleDateString()}</li>
                  ))}
                </ul>
              </motion.div>

              <motion.div className="detail-box detail-includes" variants={boxVariants}>
                <strong>{t("tour.includes")}:</strong>
                <ul>
                  {tour.includes?.map((item, i) => (
                    <li key={i}>{item[lang]}</li>
                  ))}
                </ul>
              </motion.div>

              <motion.p className="detail-box detail-ispopular" variants={boxVariants}>
                <strong>{t("tour.hotel")}:</strong> {tour.hotel || t("tour.noHotel")}
              </motion.p>

              <motion.p className="detail-box detail-category" variants={boxVariants}>
                <strong>{t("tour.maxGuests")}:</strong> {tour.maxGuests}
              </motion.p>
            </motion.div>
          </div>

          <div className="detailLast-box">
            <div className="stars-rating">
              <StarRating tourId={tour._id} tour={tour} />
            </div>

            <div className="tour-booking">
              <button onClick={handleBookNow}>
                <i className="fa-solid fa-suitcase-rolling"> </i> {t("tour.bookNow")}
              </button>
            </div>
          </div>
        </motion.section>
      </div>
    </section>
  );
};

export default TourDetails;
