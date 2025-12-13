import React, { useEffect, useState } from "react";
import axiosInstance from '../../api/axiosInstance'
import "../../styles/AdminSettings.css";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../Context/AuthContext";

function AdminSettings() {
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [message, setMessage] = useState("");
  const {t} = useTranslation();
  const { token } = useAuth();


  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axiosInstance.get("/admin/settings", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setWhatsappNumber(res.data?.whatsappNumber || "");
      } catch (err) {
        setMessage(t("admin.alert.fetchFailed"));
      }
    };
  
    if (token) fetchSettings();
  }, [token, t]);
  

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
      <h2>⚙️ {t("admin.adminSettings")}</h2>

      <label>{t("admin.whatsAppNumber")}:</label>
      <input
        type="text"
        value={whatsappNumber}
        onChange={(e) => setWhatsappNumber(e.target.value)}
        placeholder="Enter WhatsApp number"
      />

      <button onClick={handleSave}>{t("common.save")}</button>

      {message && <p className="message">{message}</p>}
    </div>
    </div>
  );
}

export default AdminSettings;
