// src/pages/Admin/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import { Link } from 'react-router-dom';

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

      <div style={{ marginTop: '20px' }}>
        <Link to="/admin/users">
          <button>Manage Users</button>
        </Link>
        <Link to="/admin/tours">
          <button>Manage Tours</button>
        </Link>
        <Link to="/admin/bookings">
          <button>Manage Bookings</button>
        </Link>
      </div>
    </div>
  ) : (
    <p>Loading stats...</p>
  )}
</div>
  );
}

export default AdminDashboard;
