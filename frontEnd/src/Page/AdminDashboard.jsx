// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import { fetchTours } from '../api/toursAPI';
import ToursList from '../components/Tours/ToursList';
import AddTourForm from '../components/AddTour/AddTourForm';

const AdminDashboard = () => {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const getTours = async () => {
      try {
        const data = await fetchTours();
        setTours(data);
      } catch (err) {
        console.error("Fetch катасы:", err);
      }
    };
    getTours();
  }, []);

  return (
    <div>
      <h2>Бардык турлар</h2>
      <ToursList tours={tours} />

      <h2>Тур кошуу</h2>
      <AddTourForm onTourAdded={setTours} />
    </div>
  );
};

export default AdminDashboard;
