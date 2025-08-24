import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Context/AuthContext';
import '../../styles/MyBookings.css';
import axiosInstance from '../../api/axiosInstance';


function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const { token, user } = useAuth();

  // Define fetchBookings at component level
  const fetchBookings = async () => {
    if (!user || !token) return; // safety check
    try {
      const res = await axiosInstance.get("/bookings/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch bookings when user or token changes
  useEffect(() => {
    fetchBookings();
  }, [user, token]);

  // Cancel booking
  const cancelBooking = async (bookingId) => {
    try {
      await axiosInstance.delete(`/bookings/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchBookings(); // refresh list
    } catch (err) {
      console.error('Cancel failed:', err);
    }
  };

  return (
    <div className="mybooking-page">
    <div className="mybooking-container">
      <p className='theme'>My Bookings</p>
      
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
      <p><strong>Name:</strong> {b.name}</p>
      <p><strong>Guests:</strong> {b.guests}</p>
      <p><strong>Date:</strong> {new Date(b.date).toLocaleDateString()}</p>
      <p><strong>Status:</strong> {b.status}</p>

      {b.status === 'pending' && (
        <button 
          onClick={() => cancelBooking(b._id)} 
          className="cancel-btn"
        >
          Cancel
        </button>
      )}
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
