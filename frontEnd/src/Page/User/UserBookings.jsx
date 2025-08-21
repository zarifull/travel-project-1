import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../Context/AuthContext';
import '../../styles/MyBookings.css';
import axiosInstance from '../../api/axiosInstance';

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    console.log("Token in MyBookings:", token); // add this line
    if (token) {
      fetchBookings();
    }
  }, [token]);
  

  const fetchBookings = async () => {
    try {
      const res = await axiosInstance.get('/bookings/my', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(res.data.bookings);
    } catch (err) {
      console.error('Error fetching bookings:', err);
    }
    console.log('Token:', token);
  };

  useEffect(() => {
    fetchBookings();
  }, [token]);

  const cancelBooking = async (bookingId) => {
    try {
      await axiosInstance.delete(`/bookings/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchBookings(); // Refresh
    } catch (err) {
      console.error('Cancel failed:', err);
    }
  };

  return (
    <div className="auth-block">
      <div className="profile-container">
        <h2>My Bookings</h2>
        {bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          <div className="bookings-grid">
            {bookings.map((b) => (
              <div key={b._id} className="booking-card">
              <h3>{b.tour.title}</h3>
              <p><strong>Location:</strong> {b.tour.location}</p>
              <p><strong>Date:</strong> {new Date(b.date).toLocaleDateString()}</p>
              <p><strong>Total:</strong> ${b.totalPrice}</p>
              <p><strong>Status:</strong> {b.status}</p>
            
              {b.status === 'pending' && (
                <button onClick={() => cancelBooking(b._id)} className="cancel-btn">
                  Cancel
                </button>
              )}
            </div>
            
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyBookings;
