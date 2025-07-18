import React, { useState, useEffect } from 'react';
import TourCard from '../../Components/TourCard';
import '../../styles/ToursList.css';
import SearchBox from './SearchBox';

const ToursList = ({ tours }) => {
  const [filteredTours, setFilteredTours] = useState([]);

  useEffect(() => {
    if (tours?.data && Array.isArray(tours.data)) {
      setFilteredTours(tours.data);
    } else if (Array.isArray(tours)) {
      setFilteredTours(tours);
    } else {
      setFilteredTours([]);
    }
  }, [tours]);
  
  const handleSearch = (query) => {
    const lowerQuery = query.toLowerCase();
    const allTours = Array.isArray(tours.data) ? tours.data : tours;
  
    const results = allTours.filter(tour =>
      tour.title.toLowerCase().includes(lowerQuery)
    );
  
    setFilteredTours(results);
  };


  return (
    <section className="tour-list">
      <p className="tourList-theme">OUR TRAVELS</p>
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
