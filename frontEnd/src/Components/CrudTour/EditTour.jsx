import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./EditTour.css";

const EditTour = () => {
    const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    desc: "",
    // add other fields here (category, isPopular, etc.)
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Fetch existing tour
  useEffect(() => {
    const fetchTour = async () => {
      try {
        const res = await axios.get(`/api/tours/${id}`);
        setFormData(res.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load tour.");
        setLoading(false);
      }
    };
    fetchTour();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    try {
      await axios.put(`/api/tours/${id}`, formData);
      setSuccess(true);
      navigate("/tours");
    } catch (err) {
      setError("Failed to update tour.");
    }
  };

  if (loading) return <p className="loading">Loading tour...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className='edit-tour'>
      <div className="container">
      <h2>Edit Tour</h2>
      <form onSubmit={handleSubmit} className="edit-form">
        <label>Title:</label>
        <input name="title" value={formData.title} onChange={handleChange} required />

        <label>Price:</label>
        <input name="price" value={formData.price} onChange={handleChange} required type="number" />

        <label>Description:</label>
        <textarea name="desc" value={formData.desc} onChange={handleChange} rows="4" />

        {/* Add more fields like category, highlights, etc. here */}
        
        <button type="submit">Update Tour</button>
        {success && <p className="success">Tour updated successfully!</p>}
        {error && <p className="error">{error}</p>}
      </form>
      </div>
    </div>
  )
}

export default EditTour