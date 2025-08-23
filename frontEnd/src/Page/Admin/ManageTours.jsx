// src/Page/Admin/ManageTours.jsx
import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { toast } from "react-toastify";
import '../../styles/ManageTours.css';
import { Link } from "react-router-dom";

function ManageTours() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch tours when component mounts
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await axiosInstance.get("/tours");
        // ⚡ use res.data.data if backend returns { data: [...] }
        setTours(res.data.data || res.data);
      } catch (err) {
        console.error("Failed to fetch tours:", err);
        toast.error("Failed to load tours");
      } finally {
        setLoading(false);
      }
    };
    fetchTours();
  }, []);

  // ✅ Delete a tour
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this tour?")) return;
    try {
      await axiosInstance.delete(`/tours/${id}`);
      setTours((prev) => prev.filter((tour) => tour._id !== id));
      toast.success("Tour deleted successfully");
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete tour");
    }
  };

  if (loading) return <p>Loading tours...</p>;

  return (
    <div className="admin-dashboard">
      <p className="manage-theme" style={{paddingBottom:"0.5em"}}>Manage Tours</p>
        <Link to={`/add-tour`} className="add-btn">
            + Add tour
        </Link>

      {tours.length === 0 ? (
        <p>No tours found</p>
      ) : (
        <table className="tours-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Location</th>
              <th>Price</th>
              {/* <th>Max Guests</th> */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tours.map((tour,index) => (
              <tr key={tour._id}>
                 <td>{index + 1}</td>
                <td>{tour.title}</td>
                <td>{tour.location}</td>
                <td>${tour.price}</td>
                {/* <td>{tour.maxGuests}</td> */}
                <td>
                  <Link to={`/tour-details/${tour._id}`}>
                  <button
                    className="detail-btn"
                    onClick={() => toast.info("Edit feature coming soon")}
                  >
                    Details
                  </button>
                  </Link>
                  <Link to={`/edit-tour/${tour._id}`}>
                  <button
                    className="edit-btn"
                    onClick={() => toast.info("Delete feature coming soon")}
                  >
                    Edit
                  </button>
                  </Link>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(tour._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ManageTours;
