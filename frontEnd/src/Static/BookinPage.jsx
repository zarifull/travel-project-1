import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from '../api/axiosInstance';
import "../styles/BookingPage.css";
import bookingBackground from '../Assets/bookingBgn.png';
import { useNavigate } from 'react-router-dom';


function BookingPage() {
  const { tourId } = useParams();
  const [tour, setTour] = useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    guests: "1",
    date: "",
    message: "",
  });

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Fetch tour data
  useEffect(() => {
    const fetchTour = async () => {
      try {
        const res = await axiosInstance.get(`/tours/${tourId}`);
        setTour(res.data); // Assumes { title, description, ... }
      } catch (err) {
        console.error("Failed to fetch tour:", err);
      }
    };

    fetchTour();
  }, [tourId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const adminPhoneNumber = process.env.REACT_APP_ADMIN_PHONE;
  
    try {
      // 1️⃣ Save booking in backend
      await axiosInstance.post("/bookings", {
        tourId,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        date: formData.date,
        guests: Number(formData.guests),
        message: formData.message,
      });
      
      const text = `✅ New Booking Request:
      🏞 Tour: ${tour?.title || "N/A"}
      👤 Name: ${formData.name}
      📞 Phone: ${formData.phone}
      📧 Email: ${formData.email}
      🏠 Address: ${formData.address}
      👥 Guests: ${formData.guests}
      📅 Date: ${formData.date}
      💬 Message: ${formData.message || "No message"}`;
      window.open(`https://wa.me/${adminPhoneNumber}?text=${encodeURIComponent(text)}`, "_blank");
  
      // 3️⃣ Show confirmation to user
      alert("✅ Your booking request has been sent! Check 'My Bookings' for updates.");
      navigate('/my-bookings')
    } catch (err) {
      console.error("Booking failed:", err);
      alert("❌ Something went wrong, please try again.");
    }
  };
  
  
  // console.log("Admin Phone:", process.env.REACT_APP_ADMIN_PHONE);
  

  return (
    <div className="booking-page">
    <div className="booking-area">
        <div className="booking-img">
      <img src={bookingBackground} alt="" />
          </div>
    <div className="booking-container">
      <h2 className="booking-title">
        {tour ? `${tour.title} - Your dream trip starts here!` : "Loading..."}
      </h2>
      <form onSubmit={handleSubmit} className="booking-form">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{background: "none"}}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
          style={{background: "none"}}
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          style={{background: "none"}}
        />
        <input
          type="text"
          name="address"
          placeholder="Your Address,city,village,street,home address"
          value={formData.address}
          onChange={handleChange}
          required
          style={{background: "none"}}
        />
        <select name="guests" value={formData.guests} onChange={handleChange} style={{color: '#495057'}}>
          {[...Array(10)].map((_, i) => (
            <option key={i} value={i + 1}>
              {i + 1} Guest(s)
            </option>
          ))}
        </select>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          style={{color: '#495057'}}
        />
        <textarea
          name="message"
          placeholder="Special Requests / Message"
          value={formData.message}
          onChange={handleChange}
        />
        <button type="submit">Send Booking via WhatsApp</button>
      </form>
    </div>
  
    </div>
    </div>
  );
}

export default BookingPage;
