import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios"; // Using plain axios here for this request
import "../styles/BookingPage.css";
import bookingBackground from "../Assets/bookingBgn.png";
import { useAuth } from "../Context/AuthContext";
import axiosInstance from "../api/axiosInstance";

const BookingPage = () => {
  const { id: tourId } = useParams(); // Get tour ID from URL
  const navigate = useNavigate();
  const { token } = useAuth(); // Get logged-in user token

  const [tour, setTour] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    date: "",
    guests: 1,
    message: "",
  });

  // Fetch tour details by ID
  useEffect(() => {
    const fetchTour = async () => {
      if (!tourId) return;
      try {
        const { data } = await axiosInstance.get(`/tours/${tourId}`);
        setTour(data);
      } catch (err) {
        console.error("Failed to fetch tour:", err);
      }
    };
    fetchTour();
  }, [tourId]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle booking submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("❌ You must be logged in to make a booking.");
      return;
    }

    const adminPhoneNumber = process.env.REACT_APP_ADMIN_PHONE;

    try {
      // Send booking to backend with explicit Authorization header
      const response = await axiosInstance.post(
        "/bookings",
        {
          tourId,
          ...formData,
          guests: Number(formData.guests),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Booking response:", response.data);

      // Send WhatsApp notification
      const text = `✅ New Booking Request:
🏞 Tour: ${tour?.title || "N/A"}
👤 Name: ${formData.name}
📞 Phone: ${formData.phone}
📧 Email: ${formData.email}
🏠 Address: ${formData.address}
👥 Guests: ${formData.guests}
📅 Date: ${formData.date}
💬 Message: ${formData.message || "No message"}`;

      window.open(
        `https://wa.me/${adminPhoneNumber}?text=${encodeURIComponent(text)}`,
        "_blank"
      );

      alert("✅ Your booking request has been sent! Check 'My Bookings' for updates.");
      navigate("/my-bookings");
    } catch (err) {
      console.error("Booking failed:", err.response || err);
      alert("❌ Booking failed. Please try again.");
    }
  };


  return (
    <div className="booking-page">
      <div className="booking-area">
        <div className="booking-img">
          <img src={bookingBackground} alt="Booking Background" />
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
              style={{ background: "none" }}
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
              style={{ background: "none" }}
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              style={{ background: "none" }}
            />
            <input
              type="text"
              name="address"
              placeholder="Your Address, city, village, street, home address"
              value={formData.address}
              onChange={handleChange}
              required
              style={{ background: "none" }}
            />
            <select
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              style={{ color: "#495057" }}
            >
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
              style={{ color: "#495057" }}
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
};

export default BookingPage;
