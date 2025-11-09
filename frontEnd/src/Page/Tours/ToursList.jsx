import React, { useEffect, useState } from 'react';
import TourCard from '../../Components/TourCard';
import '../../styles/ToursList.css';
import SearchBox from './SearchBox';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ToursList = ({ tours }) => {
  const [filteredTours, setFilteredTours] = useState([]);
  const location = useLocation();
  const { t,i18n } = useTranslation();
  const lang = i18n.language;

  const initialTours = location.state?.tours || tours;

  useEffect(() => {
    if (tours?.data && Array.isArray(tours.data)) {
      setFilteredTours(tours.data);
    } else if (Array.isArray(tours)) {
      setFilteredTours(tours);
    } else {
      setFilteredTours([]);
    }
  }, [tours]);

  useEffect(() => {
    if (initialTours?.data && Array.isArray(initialTours.data)) {
      setFilteredTours(initialTours.data);
    } else if (Array.isArray(initialTours)) {
      setFilteredTours(initialTours);
    } else {
      setFilteredTours([]);
    }
  }, [initialTours]);

  const handleSearch = (query) => {
    const lowerQuery = query.toLowerCase();
    const allTours = Array.isArray(initialTours?.data) ? initialTours.data : initialTours;

    const results = allTours.filter(tour =>
      tour.title[lang].toLowerCase().includes(lowerQuery)
    );

    setFilteredTours(results);
  };

  return (
    <section className="tour-list">
      <p className="tourList-theme">{t("tour.ourTravels")}</p>
      <SearchBox onSearch={handleSearch} />
      <hr className='hr-gradient'/>
      {filteredTours.length > 0 ? (
        filteredTours.map(tour => (
          <TourCard key={tour._id} tour={tour} />
        ))
      ) : (
        <p>No tours available</p>
      )}
    </section>
  );
};

export default ToursList;
