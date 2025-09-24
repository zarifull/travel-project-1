import React, { useEffect, useState } from "react";
import axiosInstance from '../../api/axiosInstance'
import "../../styles/AdminSettings.css";

function AdminSettings() {
  // ✅ state for WhatsApp number
  const [whatsappNumber, setWhatsappNumber] = useState("");
  // ✅ state for showing success/error messages
  const [message, setMessage] = useState("");

  // 🔹 Fetch current WhatsApp number when page loads
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axiosInstance.get("/admin/settings");
        setWhatsappNumber(res.data?.whatsappNumber || ""); 
      } catch (err) {
        setMessage("❌ Failed to fetch settings");
      }
    };
    fetchSettings();
  }, []);

  // 🔹 Handle Save button
  const handleSave = async () => {
    try {
      const res = await axiosInstance.put("/admin/settings", {
        whatsappNumber,
      });
      setMessage("✅ WhatsApp number updated successfully!");
      setWhatsappNumber(res.data.whatsappNumber); 
    } catch (err) {
      setMessage("❌ Failed to update settings");
    }
  };

  return (
    <div className="settings-container">
    <div className="admin-settings">
      <h2>⚙️ Admin Settings</h2>

      <label>WhatsApp Number:</label>
      <input
        type="text"
        value={whatsappNumber}
        onChange={(e) => setWhatsappNumber(e.target.value)}
        placeholder="Enter WhatsApp number"
      />

      <button onClick={handleSave}>Save</button>

      {/* ✅ Show feedback message */}
      {message && <p className="message">{message}</p>}
    </div>
    </div>
  );
}

export default AdminSettings;
