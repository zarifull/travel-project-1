import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import React from 'react';
import Home from '../Home/Home';
import AboutUs from '../../Components/AboutUs/AboutUs';
import Contacts from '../../Components/Contacts/Contacts';
import ToursList from '../../Components/ToursList/ToursList';
import Advertisment from '../Advertisment/Advertisment';
import AddTour from '../../Components/CrudTour/AddTour';
import TourDetails from '../../Components/ToursList/TourDetails';
import TourCard from '../../Components/ToursList/TourCard';
import EditTour from '../../Components/CrudTour/EditTour';
import DeleteTour from '../../Components/CrudTour/DeleteTour';

function Main() {
  const [tours, setTours] = useState([]); // State турлардын маалыматтарын сактоо үчүн

  useEffect(() => {
    // Компонент жүктөлгөндө APIдан турлардын маалыматтарын алуу
    fetch('http://localhost:7070/api/tours')
      .then((res) => res.json()) // Жоопту JSON катары талдоо
      .then((data) => setTours(data)) // Маалыматтарды абалга сактоо
      .catch((err) => console.log('Турларды алуу ката:', err)); // Ката болгон учурда
  }, []); // Жөн гана бир жолу ишке ашат

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tours" element={<ToursList tours={tours} />} /> 
        <Route path="/advertisment" element={<Advertisment />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/add-tour" element={<AddTour />} />
        <Route path="/tour-card" element={<TourCard />} />
        <Route path="/tour-details/:id" element={<TourDetails tours={tours} />} />
        <Route path="/edit-tour/:id" element={<EditTour tours={tours} />} />
        {/* <Route path="/delete-tour/:id" element={<DeleteTour tours={tours} />} /> */}
      </Routes>
    </div>
  );
}

export default Main;
