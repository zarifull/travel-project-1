import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/BookingPage.css";
import bookingBackground from "../Assets/bookingBgn.png";
import { useAuth } from "../Context/AuthContext";
import axiosInstance from "../api/axiosInstance";
import { useTranslation } from "react-i18next";

const BookingPage = () => {
  const { id: tourId } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const { t,i18n } = useTranslation();
  const [phone, setPhone] = useState("+996");
  const lang = i18n.language;
  const [adminPhoneNumber, setAdminPhoneNumber] = useState("");


  const [tour, setTour] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    date: "",
    guests: 1,
    message: "",
  });

  useEffect(() => {
    const fetchWhatsApp = async () => {
      try {
        const res = await axiosInstance.get("/admin/settings/whatsapp");
        setAdminPhoneNumber(res.data.whatsappNumber);
      } catch (err) {
        console.error("Failed to fetch WhatsApp number");
      }
    };
    fetchWhatsApp();
  }, []);
  
  
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!token) {
      alert(t("booking.alert.loginRequired"));
      return;
    }
  
    if (!adminPhoneNumber) {
      alert(t("booking.alert.adminPhoneMissing"));
      return;
    }
  
    try {
      await axiosInstance.post(
        "/bookings",
        {
          tourId,
          ...formData,
          phone,
          guests: Number(formData.guests),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      const text = `✅ New Booking Request:
          🏞 Tour: ${tour?.title?.[lang] || "N/A"}
          👤 Name: ${formData.name}
          📞 Phone: ${phone}
          📧 Email: ${formData.email}
          🏠 Address: ${formData.address}
          👥 Guests: ${formData.guests}
          📅 Date: ${formData.date}
          💬 Message: ${formData.message || "No message"}`;
          
              window.open(
                `https://wa.me/${adminPhoneNumber}?text=${encodeURIComponent(text)}`,
                "_blank"
              );
          
              alert(t("booking.alert.setSuccess"));
              navigate("/my-bookings");
            } catch (err) {
              console.error("Booking failed:", err.response || err);
              alert(t("booking.alert.failed"));
            }
          };
          

  return (
    <div className="booking-page">
      <div className="container">
      <div className="booking-area">
        <div className="booking-img">
          <img src={bookingBackground} alt="Booking Background" />
        </div>
        <div className="booking-container">
          <h2 className="booking-title">
            {tour
              ? `${tour.title[lang]} - ${t("booking.title")}`
              : t("booking.loading")}
          </h2>

          <form onSubmit={handleSubmit} className="booking-form">
            <input
              type="text"
              name="name"
              placeholder={t("booking.form.name")}
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="phone"
              placeholder={t("booking.form.phone")}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <input
              type="email"
              name="email"
              placeholder={t("booking.form.email")}
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="address"
              placeholder={t("booking.form.address")}
              value={formData.address}
              onChange={handleChange}
              required
            />
            <select
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              className="booking-guests-select"
            >
              {[...Array(10)].map((_, i) => (
                <option key={i} value={i + 1}>
                  {t("booking.form.selectGuests", { count: i + 1 })}
                </option>
              ))}
            </select>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="booking-date-inp"
            />
            <textarea
              name="message"
              placeholder={t("booking.form.message")}
              value={formData.message}
              onChange={handleChange}
            />
            <button type="submit">{t("booking.form.send")}</button>
          </form>
        </div>
      </div>
      </div>
    </div>
  );
};

export default BookingPage;
