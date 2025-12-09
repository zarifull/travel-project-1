import React, { useEffect, useState, useRef } from 'react';
import TourCard from '../../Components/TourCard';
import '../../styles/ToursList.css';
import SearchBox from './SearchBox';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  motion,
  MotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

const ToursList = ({ tours }) => {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const [filteredTours, setFilteredTours] = useState([]);
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const yOffset = useTransform(scrollYProgress, [0, 1], [0, -100]); 

  useEffect(() => {
    if (location.state?.tours) {
      setFilteredTours(location.state.tours);
    } else if (Array.isArray(tours?.data)) {
      setFilteredTours(tours.data);
    } else if (Array.isArray(tours)) {
      setFilteredTours(tours);
    } else {
      setFilteredTours([]);
    }
  }, [location.state, tours]);

  const handleSearch = (query) => {
    const lowerQuery = query.toLowerCase();
    const allTours = filteredTours; 
    const results = allTours.filter(tour =>
      (tour.title?.[lang] || '').toLowerCase().includes(lowerQuery)
    );
    setFilteredTours(results);
  };

  return (
    <section className="tour-list" ref={scrollRef}>
      <p className="tourList-theme">{t("tour.ourTravels")}</p>
      <SearchBox onSearch={handleSearch} />
      <hr className='hr-gradient'/>
      {filteredTours.length > 0 ? (
        filteredTours.map(tour => (
          <motion.div 
            key={tour._id}
            style={{ y: yOffset }} 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <TourCard tour={tour} />
          </motion.div>
        ))
      ) : (
        <p>No tours available</p>
      )}
    </section>
  );
};

export default ToursList;
