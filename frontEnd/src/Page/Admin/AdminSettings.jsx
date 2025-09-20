import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance"; 
import { useAuth } from "../../Context/AuthContext"; 
import "../../styles/AdminSettings.css"; // optional css file

function AdminSettings() {
  // ✅ state for WhatsApp number
  const [whatsappNumber, setWhatsappNumber] = useState("");
  // ✅ state for showing success/error messages
  const [message, setMessage] = useState("");

  // ✅ get token from AuthContext (for Authorization header)
  const { token } = useAuth();

  // 🔹 Fetch current WhatsApp number when page loads
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axiosInstance.get("/settings", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setWhatsappNumber(res.data?.whatsappNumber || ""); 
      } catch (err) {
        setMessage("❌ Failed to fetch settings");
      }
    };
    fetchSettings();
  }, [token]);

  // 🔹 Handle Save button
  const handleSave = async () => {
    try {
      const res = await axiosInstance.put(
        "/admin/settings",
        { whatsappNumber }, // sending new number
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("✅ WhatsApp number updated successfully!");
      setWhatsappNumber(res.data.whatsappNumber); 
    } catch (err) {
      setMessage("❌ Failed to update settings");
    }
  };

  return (
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
  );
}

export default AdminSettings;
