import React, { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import { Link } from 'react-router-dom';
import '../../styles/AdminDashboard.css';
import { IoIosSettings } from "react-icons/io";
import { useTranslation } from 'react-i18next';
import Loading from '../../Components/Loading';

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axiosInstance.get('/admin/dashboard');
        setStats(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Access denied');
      } finally {
        setLoading(false);
      }
    };
  
    fetchDashboard();
  }, []);
  

  if (loading) return <Loading text={t("common.fetchingData")} />;

  return (
    <div className='admin-dashboard'>
      <h2>{t("admin.title")} !</h2>
      <div className="admin-img"></div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {stats && (
        <div className='product-total'>
          <p>{t("admin.totalUsers")}: <span>{stats.totalUsers}</span></p>
          <Link to="/total-users"><button>{t("admin.manageUsers")} ➔</button></Link>
  
          <p>{t("admin.totalBookings")}: <span>{stats.totalBookings}</span></p>
          <Link to="/total-bookings"><button>{t("admin.manageBookings")} ➔</button></Link>
  
          <p>{t("admin.totalTours")}: <span>{stats.totalTours}</span></p>
          <Link to="/total-tours"><button>{t("admin.manageTours")} ➔</button></Link>
  
          <p>{t("admin.adminSettings")}</p>
          <Link to='/admin-settings'><button><IoIosSettings /></button></Link>
          <Link to='/manage-resources'><button>{t("admin.resources")} ➔</button></Link>
          <Link to='/manage-resourcedetails'><button>{t("admin.resourcesDetails")} ➔</button></Link>
          <Link to='/manage-customers'><button>{t("admin.customers")} ➔</button></Link>
        </div>
      )}
    </div>
  );
  
}

export default AdminDashboard;
