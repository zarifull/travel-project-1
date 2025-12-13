import React, { useState, useEffect } from 'react';
import { useAuth } from '../../Context/AuthContext';
import '../../styles/MyProfile.css';
import axiosInstance from '../../api/axiosInstance';
import { useTranslation } from 'react-i18next';

function MyProfile() {
  const { user, setUser, token } = useAuth();
  const {t} = useTranslation();
  const [formData, setFormData] = useState({
    username: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || ''
  });

  const [passwordData, setPasswordData] = useState({
    newPassword: '',
    confirmPassword: ''
  });

  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.name || '',
        email: user.email || '',
        phone: user.phone || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handlePasswordChange = (e) => {
    setPasswordData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!user || !user._id) {
      setMessage("❌ Cannot update profile. User not found.");
      return;
    }

    try {
      console.log("➡️ Sending profile update for:", user._id);

      const userUpdateRes = await axiosInstance.put(`/users/profile/${user._id}`, {
        username: formData.username,
        email: formData.email,
        phone: formData.phone
      });

      setUser(userUpdateRes.data.updatedUser);

      if (passwordData.newPassword || passwordData.confirmPassword) {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
          return setMessage('❌ Passwords do not match');
        }

        await axiosInstance.put(`/users/password/${user._id}`, {
          password: passwordData.newPassword
        });
      }

      setMessage('✅ Profile updated successfully!');
    } catch (error) {
      console.error("❌ Profile update failed:", error);
      setMessage('❌ Update failed. Please try again.');
    }
  };

  if (!user || !user._id) {
    return (
      <div className="auth-block">
        <div className="profile-container">
          <h2>{t("registration.myProfile")}</h2>
          <p className="message">❌ You must be logged in to update your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-block">
      <div className="profile-container">
        <h2 className='profile-title'>{t("registration.myProfile")}</h2>
        <form onSubmit={handleSubmit} className="profile-card">
          <label>
            <strong>{t("registration.name")} :</strong>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </label>

          <label>
            <strong>{t("registration.email")} :</strong>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>

          <label>
            <strong>{t("registration.phone")} (WhatsApp):</strong>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+996 500 123 456"
            />
          </label>

          <label>
            <strong>{t("registration.newPassword")} :</strong>
            <input
              type="password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
            />
          </label>

          <label>
            <strong> {t("registration.confirmPassword")} :</strong>
            <input
              type="password"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
            />
          </label>

          <button type="submit">{t("registration.saveChanges")}</button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}

export default MyProfile;
