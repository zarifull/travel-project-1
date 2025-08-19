import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/EditTour.css";
import axiosInstance from "../../api/axiosInstance";

const EditTour = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    duration: "",
    location: "",
    maxGuests: "",
    category: "",
    isPopular: false,
    includes: [""],
    startDates: [""],
    imageUrls: [""],
  });

  

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const res = await axiosInstance.get(`/tours/${id}`);
        const tour = res.data;

        setFormData({
          ...tour,
          includes: tour.includes || [""],
          startDates: tour.startDates?.map((date) => date.slice(0, 10)) || [""], 
          imageUrls: tour.imageUrls || [""],
        });

        setLoading(false);
      } catch (err) {
        setError("Failed to load tour.");
        setLoading(false);
      }
    };
    fetchTour();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleArrayChange = (e, index, field) => {
    const newArray = [...formData[field]];
    newArray[index] = e.target.value;
    setFormData((prev) => ({
      ...prev,
      [field]: newArray,
    }));
  };

  const addArrayItem = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

// add this function inside component
const removeArrayItem = (field, index) => {
  setFormData((prev) => {
    const newArray = [...prev[field]];
    newArray.splice(index, 1);
    return { ...prev, [field]: newArray };
  });
};


const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setSuccess(false);

  try {
    await axiosInstance.put(`/tours/${id}`, {
      ...formData,
      startDates: formData.startDates.map((date) => new Date(date)),
    });

    alert("Tour was updated successfully!");
    setSuccess(true);
    navigate("/total-tours"); // make sure this matches your route name
  } catch (err) {
    console.error("Update error:", err);
    alert("Tour was not updated");
    setError("Failed to update tour.");
  }
};


  if (loading) return <p className="loading">Loading tour...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="edit-tour">
      <div className="container">
        <h2>Edit Tour</h2>
        <form onSubmit={handleSubmit} className="edit-form">
          <label>Title:</label>
          <input name="title" value={formData.title} onChange={handleChange} required />

          <label>Price:</label>
          <input name="price" value={formData.price} onChange={handleChange} type="number" required />

          <label>Description:</label>
          <textarea name="description" value={formData.description} onChange={handleChange} rows="4" />

          <label>Duration (days):</label>
          <input name="duration" value={formData.duration} onChange={handleChange} type="number" required />

          <label>Max Guests (person):</label>
          <input name="maxGuests" value={formData.maxGuests} onChange={handleChange} type="number" required />


          <label>Location:</label>
          <input name="location" value={formData.location} onChange={handleChange} required />

          <label>Category:</label>
          <select name="category" value={formData.category} onChange={handleChange} required>
            <option value="">Select category</option>
            <option value="Adventure">Adventure</option>
            <option value="Relax">Relax</option>
            <option value="Cultural">Cultural</option>
            <option value="City">City</option>
            <option value="Nature">Nature</option>
            <option value="Other">Other</option>
          </select>

          <label>
            <input type="checkbox" name="isPopular" checked={formData.isPopular} onChange={handleChange} />
            Popular Tour
          </label>

          <label>Includes:</label>
            {formData.includes.map((item, index) => (
              <div  key={index} className="array-item">
                <input
                  value={item}
                  onChange={(e) => handleArrayChange(e, index, "includes")}
                  placeholder="e.g. Free breakfast"
                  style={{width:'90%'}}
                />
                <button type="button" onClick={() => removeArrayItem("includes", index)}>x</button>
              </div>
            ))}
            <button type="button" onClick={() => addArrayItem("includes")}>+ Add Include</button>

            <label>Start Dates:</label>
            {formData.startDates.map((date, index) => (
              <div key={index} className="array-item">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => handleArrayChange(e, index, "startDates")}
                  style={{width:'90%'}}
                />
                <button type="button" onClick={() => removeArrayItem("startDates", index)}>x</button>
              </div>
            ))}
            <button type="button" onClick={() => addArrayItem("startDates")}>+ Add Date</button>

            <label>Image URLs:</label>
            {formData.imageUrls.map((url, index) => (
              <div key={index} className="array-item">
                <input
                  value={url}
                  onChange={(e) => handleArrayChange(e, index, "imageUrls")}
                  style={{width:'90%'}}
                />
                <button type="button" onClick={() => removeArrayItem("imageUrls", index)}>x</button>
              </div>
            ))}
            <button type="button" onClick={() => addArrayItem("imageUrls")}>+ Add Image</button>


          <button type="submit">Update Tour</button>
          {success && <p className="success">Tour updated successfully!</p>}
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default EditTour;

