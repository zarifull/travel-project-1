import React, { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import { Link } from 'react-router-dom';
import '../../styles/AdminDashboard.css';
import { IoIosSettings } from "react-icons/io";
import Managecustomers from './ManageCustomers';


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
    <div className='admin-dashboard'>
  <div className="admin-img"><h2>Welcome   Admin !</h2>
  {error && <p style={{ color: 'red' }}>{error}</p>}

  {stats ? (
    <div className='product-total'>
      <p>Total Users: <span style={{color: 'black', fontSize: '1.6rem'}}>{stats.totalUsers}</span></p>
      <Link to="/total-users">
          <button>Manage Users <span>➔</span></button>
        </Link>
      <p>Total Bookings:  <span style={{color: 'black', fontSize: '1.6rem'}}>  
        {stats.totalBookings}</span></p>
        <Link to="/total-bookings">
          <button>Manage Bookings <span>➔</span></button>
        </Link>
      <p>Total Tours: <span style={{color: 'black', fontSize: '1.6rem'}}>
        {stats.totalTours}</span></p>
        <Link to="/total-tours">
          <button>Manage Tours <span>➔</span></button> 
        </Link>
        <p>Admin settings</p>
        <Link to='/admin-settings' style={{
          padding:'0'
        }}>
          <button><IoIosSettings style={{fontSize:'1.5em'}} /></button>
        </Link>
        <Link to='/manage-resources'><button>RESOURCES <span>➔</span></button></Link>
        <Link to='/manage-resourcedetails'><button>RESOURCE-DETAILS <span>➔</span></button></Link>
        <Link to='/manage-resourcedetails'><button>RESOURCE-DETAILS <span>➔</span></button></Link>
        <Link to='/manage-customers'><button>CUSTOMERS <span>➔</span></button></Link>
    </div>
  ) : (
    <p>Loading stats...</p>
  )}
</div>
</div>
  );
}

export default AdminDashboard;
