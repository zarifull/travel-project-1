import React, { useState,useEffect } from "react";
import { createCustomer,getCustomersByResource } from "../../api/customersDetailApi.js";
import { useNavigate } from "react-router-dom";
import "../../styles/AddCustomer-detail.css";
import { getAllResourceDetails } from "../../api/resourceDetailApi.js";
import { useTranslation } from "react-i18next";

const AddCustomerDetail = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    resourceDetailId: "",
    name: { en: "", ru: "", kg: "" },
    photo: [],
    comments: [],
  });
  const [previewPhotos, setPreviewPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resourceDetails, setResourceDetails] = useState([]);
  const {t} = useTranslation();

  const handleTextChange = (lang, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: { ...prev[field], [lang]: value },
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({ ...prev, photo: files }));
    setPreviewPhotos(files.map((f) => URL.createObjectURL(f)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = new FormData();
      data.append("resourceDetailId", formData.resourceDetailId);
      data.append("name", JSON.stringify(formData.name));
      formData.photo.forEach((file) => data.append("photo", file));

      await createCustomer(data);
      alert(t("customerss.alert.addedSuccess"));
      navigate("/manage-customers"); 
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "❌ Error adding customer");
    } finally {
      setLoading(false);
    }
  };
 
  useEffect(() => {
    const fetchResourceDetails = async () => {
      try {
        const res = await getAllResourceDetails(); 
        setResourceDetails(res);
      } catch (err) {
        console.error("Failed to load resource details", err);
      }
    };
    fetchResourceDetails();
  }, []);
  
  return (
    <div className="auth-block">
    <div className="add-customer">
      <h1>{t("manage.addCustomerDetail")}</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit} className="customer-form">
      <label>{t("manage.resourceDetail")}:</label>
      <select
          value={formData.resourceDetailId}
          onChange={(e) =>
            setFormData({ ...formData, resourceDetailId: e.target.value })
          }
          required
        >
          <option value="" disabled>Select a resource</option>
          {resourceDetails.map((res) => (
            <option key={res._id} value={res._id}>
              {res.name.en}
            </option>
          ))}
        </select>



        <label>{t("manage.names")}</label>
        {["en", "ru", "kg"].map((lang) => (
          <input
            key={lang}
            type="text"
            placeholder={`Name (${lang})`}
            value={formData.name[lang]}
            onChange={(e) => handleTextChange(lang, "name", e.target.value)}
          />
        ))}

        <label>{t("manage.photos")}</label>
        <input type="file" multiple onChange={handleFileChange} />
        {previewPhotos.length > 0 && (
          <div className="preview-row">
            {previewPhotos.map((url, i) => (
              <img key={i} src={url} alt="preview" width={80} />
            ))}
          </div>
        )}

        <div className="form-actions">
          <button type="submit" className="edit-btn">
            {loading ? t("common.saving") : t("common.add")}
          </button>
          <button
            type="button"
            className="delete-btn"
            onClick={() => navigate("/manage-customers")}
          >
            {t("common.cancel")}
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default AddCustomerDetail;
