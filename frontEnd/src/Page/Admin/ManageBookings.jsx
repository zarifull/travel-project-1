// src/Page/Admin/AdminBookings.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import axiosInstance from "../../api/axiosInstance";
import '../../styles/ManageBookings.css';

function ManageBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  // Fetch all bookings
  const fetchBookings = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const res = await axiosInstance.get("/admin/bookings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axiosInstance.put(
        `/admin/${id}/status`,   // ✅ correct path
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchBookings();
    } catch (err) {
      console.error(err);
    }
  };
  

  useEffect(() => {
    fetchBookings();
  }, [token]);

  if (loading) return <p>Loading bookings...</p>;

  return (
    <div className="admin-dashboard">
      <p className="manage-theme">Manage Bookings</p>
      {bookings.length === 0 ? (
        <p>No bookings available.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Tour</th>
              <th>User</th>
              <th>Email</th>
              <th>Guests</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b, index) => (
              <tr key={b._id}>
                <td>{index + 1}</td>
                <td>{b.tourId?.title || "Unknown Tour"}</td>
                <td>{b.userId?.name}</td>
                <td>{b.userId?.email}</td>
                <td>{b.guests}</td>
                <td>{new Date(b.date).toLocaleDateString()}</td>
                <td>
                    {b.status === "pending" && (
                      <span className="status-pending">{b.status}</span>
                    )}
                    {b.status === "approved" && <span></span>}
                  </td>
                  <td>
                    {b.status === "pending" ? (
                      <>
                        <button
                          className="approve-btn"
                          onClick={() => updateStatus(b._id, "approved")}
                        >
                          Approve
                        </button>
                        <button
                          className="reject-btn"
                          onClick={() => updateStatus(b._id, "rejected")}
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <span className="booking-approved">approved</span>
                    )}
                  </td>

              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ManageBookings;
