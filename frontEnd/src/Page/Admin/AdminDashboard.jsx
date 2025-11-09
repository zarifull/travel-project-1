import React, { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import { Link } from 'react-router-dom';
import '../../styles/AdminDashboard.css';
import { IoIosSettings } from "react-icons/io";
import {useTranslation} from 'react-i18next';


function AdminDashboard() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [stats, setStats] = useState(null);
  const {t} = useTranslation();

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
  <div className="admin-img"><h2>{t("admin.title")} !</h2>
  {error && <p style={{ color: 'red' }}>{error}</p>}

  {stats ? (
    <div className='product-total'>
      <p>{t("admin.totalUsers")}: <span style={{color: 'black', fontSize: '1.6rem'}}>{stats.totalUsers}</span></p>
      <Link to="/total-users">
          <button>{t("admin.manageUsers")} <span>➔</span></button>
        </Link>
      <p>{t("admin.totalBookings")}:  <span style={{color: 'black', fontSize: '1.6rem'}}>  
        {stats.totalBookings}</span></p>
        <Link to="/total-bookings">
          <button>{t("admin.manageBookings")} <span>➔</span></button>
        </Link>
      <p>{t("admin.totalTours")}: <span style={{color: 'black', fontSize: '1.6rem'}}>
        {stats.totalTours}</span></p>
        <Link to="/total-tours">
          <button>{t("admin.manageTours")} <span>➔</span></button> 
        </Link>
        <p>{t("admin.adminSettings")}</p>
        <Link to='/admin-settings' style={{
          padding:'0'
        }}>
          <button><IoIosSettings style={{fontSize:'1.5em'}} /></button>
        </Link>
        <Link to='/manage-resources'><button>{t("admin.resources")} <span>➔</span></button></Link>
        <Link to='/manage-resourcedetails'><button>{t("admin.resourcesDetails")} <span>➔</span></button></Link>
        <Link to='/manage-customers'><button>{t("admin.customers")} <span>➔</span></button></Link>
    </div>
  ) : (
    <p>Loading stats...</p>
  )}
</div>
</div>
  );
}

export default AdminDashboard;
