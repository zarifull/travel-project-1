import React, { useState } from 'react';
import { useAuth } from '../../Context/AuthContext';
import axios from '../../api/axiosInstance';
import '../../styles/MyProfile.css';

function MyProfile() {
  const { user, setUser } = useAuth();

  const [formData, setFormData] = useState({
    username: user?.name || '',
    email: user?.email || ''
  });

  const [passwordData, setPasswordData] = useState({
    newPassword: '',
    confirmPassword: ''
  });

  const [message, setMessage] = useState('');

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
  
    try {
      const userUpdateRes = await axios.put(`/users/${user._id}`, {
        username: formData.username,
        email: formData.email,
      });
  
      setUser(userUpdateRes.data.updatedUser); // Update auth context
  
      // ✅ 2. Update password (only if filled)
      if (passwordData.newPassword || passwordData.confirmPassword) {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
          return setMessage('❌ Passwords do not match');
        }
  
        await axios.put(`/users/${user._id}/password`, {
          password: passwordData.newPassword
        });
      }
  
      setMessage('✅ Profile updated successfully!');
    } catch (error) {
      console.error(error);
      setMessage('❌ Update failed. Please try again.');
    }
  };
  
  


  return (
    <div className="auth-block">
      <div className="profile-container">
        <h2>My Profile</h2>
        <form onSubmit={handleSubmit} className="profile-card">
          <label>
            <strong>Name:</strong>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </label>

          <label>
            <strong>Email:</strong>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>

          <label>
            <strong>New Password:</strong>
            <input
              type="password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
            />
          </label>

          <label>
            <strong>Confirm Password:</strong>
            <input
              type="password"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
            />
          </label>

          <button type="submit">Save Changes</button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}

export default MyProfile;
