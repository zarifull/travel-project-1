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

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;
    try {
      await axiosInstance.delete(`/admin/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(bookings.filter(b => b._id !== id));
      alert("Booking deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete booking");
    }
  };
  
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
                      <span style={{color:'#2f9e44', textDecoration:'underLine',fontWeight:'bold'}}>Pending</span>
                    )}
                    {b.status === "approved" && (
                      <span className="booking-approved">Approved</span>
                    )}
                    {b.status === "rejected" && (
                      <span style={{color:'#f03e3e',fontWeight:'bold'}}>Rejected</span>
                    )}
                  </td>

                  <td>
                    <div className="booking-action">
                    {b.status === "pending" && (
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
                    )}

                    {b.status === "approved" && (
                      <>
                        {/* <span className="booking-approved">Approved</span> */}
                        <button 
                          className="reject-btn" 
                          onClick={() => updateStatus(b._id, "rejected")}
                        >
                          Reject
                        </button>
                        <button 
                          onClick={() => handleDelete(b._id)} 
                          className="delete-btn"
                        >
                          Delete
                        </button>
                      </>
                    )}

                    {b.status === "rejected" && (
                      <>
                        <span className="booking-rejected"></span>
                        <button 
                          onClick={() => handleDelete(b._id)} 
                          className="delete-btn"
                        >
                          Delete
                        </button>
                      </>
                    )}
                    </div>
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
