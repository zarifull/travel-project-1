// src/pages/Admin/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';

function AdminDashboard() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axiosInstance.get('/admin/dashboard');
        setStats(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Access denied');
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div style={{height:'100vh',textAlign:'center'}}>
      <h2>Welcome, Admin!</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {stats ? (
        <div>
          <p>Total Users: {stats.totalUsers}</p>
          <p>Total Bookings: {stats.totalBookings}</p>
          <p>Total Tours: {stats.totalTours}</p>
        </div>
      ) : (
        <p>Loading stats...</p>
      )}
    </div>
  );
}

export default AdminDashboard;
