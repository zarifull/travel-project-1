import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Context/AuthContext';
import '../../styles/MyBookings.css';
import axiosInstance from '../../api/axiosInstance';
import {useTranslation} from "react-i18next"

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const { token, user } = useAuth();
  const {t} =useTranslation();

  const fetchBookings = async () => {
    if (!user || !token) return; 
    try {
      const res = await axiosInstance.get("/bookings/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [user, token]);

  const cancelBooking = async (bookingId) => {
    try {
      await axiosInstance.delete(`/bookings/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchBookings(); 
    } catch (err) {
      console.error('Cancel failed:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axiosInstance.delete(`/bookings/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(bookings.filter(b => b._id !== id));
      alert("Booking deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete booking");
    }
  };
  

  return (
    <div className="mybooking-page">
    <div className="mybooking-container">
      <p className='theme'>{t("booking.myBookings")}</p>
      
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="bookings-grid">
        {bookings.map((b) => (
  <div key={b._id} className="booking-card">
    <div className="mybooking-img">
    <img
        src={b.tourId?.imageUrls?.[0] || "/placeholder.jpg"}
        alt={`Main ${b.tourId?.title || "Tour"}`}
      />
    </div>
    <div className="booking-info">
      <h3>{b.tourId?.title || "Unknown Tour"}</h3>
      <p><strong>{t("tour.name")} :</strong> {b.name}</p>
      <p><strong>{t("booking.form.guests")} :</strong> {b.guests}</p>
      <p><strong>{t("booking.form.date")} :</strong> {new Date(b.date).toLocaleDateString()}</p>
      <p>
        <strong>{t("manage.status")} :</strong>{" "}
        <span style={{ color: "#1c7ed6", textDecoration: "underline" }}>
          {t(`booking.status.${b.status}`)}
        </span>
      </p>

        <div className="booking-btns">
      {b.status === 'pending' && (
        <button 
          onClick={() => cancelBooking(b._id)} 
          className="reject-btn"
        >
          {t("common.cancel")}
        </button>
        
      )}
       <span className='delete-btn' onClick={()=>handleDelete(b._id)} style={{fontWeight:'500',textAlign:'left'}}>{t("common.delete")}</span>
       </div>
    </div>
  </div>
))}

        </div>
      )}
    </div>
  </div>
  
  );
}

export default MyBookings;
