// frontEnd/src/pages/Profile/MyProfile.jsx
import React from 'react';
import { useAuth } from '../../Context/AuthContext';
import '../../styles/MyProfile.css'; // ✅ import CSS

function MyProfile() {
  const { user } = useAuth();

  return (
    <div className="auth-block">
    <div className="profile-container">
      <h2>My Profile</h2>
      <div className="profile-card">
        <p><strong>Name:</strong> {user?.username}</p>
        <p><strong>Email:</strong> {user?.email}</p>
      </div>
    </div>
    </div>
  );
}

export default MyProfile;
