import React from 'react';
import TourCard from './TourCard';
import './ToursList.css';

const ToursList = ({ tours }) => {
  if (!tours) {
    return <p>Турлар жок</p>; // tours жок болсо, билдирүү чыгарат
  }

  return (
    <section className="tour-list">
      <p className="tourList-theme">OUR TRAVELS</p>
      <hr className='hr-gradient'/>
      {tours.length > 0 ? (
        tours.map(tour => (
          <TourCard key={tour._id} tour={tour} /> // Ар бир турду көрсөтөт
        ))
      ) : (
        <p>No tours available</p> // Турлар жок болсо
      )}
    </section>
  );
};


export default ToursList;
