import React, { useEffect, useState } from "react";
import {
  getAllResourceDetails,
  deleteResourceDetail,
  createResourceDetail,
  updateResourceDetail,
  deletePhotoFromResourceDetail,
} from "../../api/resourceDetailApi";
import "../../styles/ManageResourceDetails.css";
import { getResources } from "../../api/resourceApi";
import { useTranslation } from "react-i18next";

const ManageResourceDetail = () => {
  const [resourceDetails, setResourceDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingDetail, setEditingDetail] = useState(null);
  const [formData, setFormData] = useState({
    resourceId: "",
    name: { en: "", ru: "", kg: "" },
    photo: [],
    video: [],
  });

  const [previewPhoto, setPreviewPhoto] = useState([]);
  const [existingPhoto, setExistingPhoto] = useState([]);
  const [resouces,setResources] = useState([]);
  const { t } = useTranslation();
  useEffect(() => {
    fetchResourceDetails();
  }, []);

  const fetchResourceDetails = async () => {
    try {
      setLoading(true);
      const data = await getAllResourceDetails();
      setResourceDetails(data);
    } catch (err) {
      setError("Failed to fetch resource details");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const filesArray = Array.from(files);
    setFormData((prev) => ({ ...prev, [name]: [...prev[name], ...filesArray] }));
    if (name === "photo") setPreviewPhoto((prev) => [...prev, ...filesArray.map(f => URL.createObjectURL(f))]);
  };

  const handleTextChange = (lang, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: { ...prev[field], [lang]: value },
    }));
  };

  const handleRemoveExistingPhoto = async (url) => {
    if (!window.confirm("Delete this photo?")) return;
    try {
      await deletePhotoFromResourceDetail(editingDetail._id, url);
      setExistingPhoto((prev) => prev.filter((img) => img !== url));
      alert("Photo deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete photo");
    }
  };

  const handleEdit = (detail) => {
    setEditingDetail(detail);
    setFormData({
      resourceId: detail.resourceId || "",
      name: detail.name || { en: "", ru: "", kg: "" },
      photo: [],
      video: [],
    });

    setPreviewPhoto([]);
    setExistingPhoto(detail.photo || []);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this resource detail?")) return;
    try {
      await deleteResourceDetail(id);
      fetchResourceDetails();
    } catch (err) {
      console.error("Error deleting resource detail:", err);
      setError("Failed to delete resource detail");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const submitData = new FormData();
  
      const resourceIdValue =
        typeof formData.resourceId === "object"
          ? formData.resourceId._id || ""
          : formData.resourceId;
  
      submitData.append("resourceId", resourceIdValue);
      submitData.append("name", JSON.stringify(formData.name));
  
      if (formData.photo && formData.photo.length > 0) {
        formData.photo.forEach((file) => submitData.append("photo", file));
      }
      if (formData.video && formData.video.length > 0) {
        formData.video.forEach((file) => submitData.append("video", file));
      }
  
      let response;
      if (editingDetail) {
        response = await updateResourceDetail(editingDetail._id, submitData);
        alert("✅ Resource detail updated successfully!");
        setEditingDetail(null);
      } else {
        response = await createResourceDetail(submitData);
        alert("✅ Resource detail created successfully!");
      }
  
      console.log("✅ Server response:", response);
  
      setFormData({
        resourceId: "",
        name: { en: "", ru: "", kg: "" },
        photo: [],
        video: [],
      });
      setPreviewPhoto([]);
      setExistingPhoto([]);
      fetchResourceDetails();
    } catch (err) {
      console.error("❌ Error saving resource detail:", err);
      setError(err.response?.data?.message || "Error saving resource detail");
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await getResources();
        setResources(res);
      } catch (error) {
        console.error("Failed to load resources", error);
      }
    };
    fetchResources();
  }, []); 

  return (
    <div className="manage-resource">
      <h1>{t("admin.manageResourceDetails")}</h1>

      <form className="resource-form" onSubmit={handleSubmit}>
        <label>{t("manage.resourceId")}</label>
        <select value={formData.resourceId}
          onChange={(e) => setFormData({...formData, resourceId: e.target.value})} required>
          <option value="" disabled>{t("manage.selectResource")}</option>
          {resouces.map((res) => (
            <option key={res._id} value={res._id}>
            {res.name?.en || "No Name"}
            </option>
          ))}
        </select>


        <div className="form-langs">
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
        </div>

        <label>{t("manage.photos")}</label>
        <input type="file" name="photo" multiple onChange={handleFileChange} />
        {existingPhoto.length > 0 && (
          <div className="preview-row">
            {existingPhoto.map((img, i) => (
              <div key={i} className="image-item">
                <img src={img} alt="existing" width={80} />
                <button type="button" onClick={() => handleRemoveExistingPhoto(img)} className="toTrush">
                  🗑
                </button>
              </div>
            ))}
          </div>
        )}
        {previewPhoto.length > 0 && (
          <div className="preview-row">
            {previewPhoto.map((img, i) => (
              <img key={i} src={img} alt="preview" width={80} />
            ))}
          </div>
        )}

        <label>{t("manage.videos")}</label>
        <input type="file" name="video" multiple onChange={handleFileChange} />

        <div className="form-btns">
          <button type="submit" className="save-btn">
            {editingDetail ? "Update" : "Add"}
          </button>

          {editingDetail && (
            <button
              type="button"
              onClick={() => {
                setEditingDetail(null);
                setFormData({
                  resourceId: "",
                  name: { en: "", ru: "", kg: "" },
                  photo: [],
                  video: [],
                });
                setPreviewPhoto([]);
                setExistingPhoto([]);
              }}
            >
              {t("common.cencel")}
            </button>
          )}
        </div>

      </form>

      <h2>{t("admin.existingResourceDetails")}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="resource-list">
        {resourceDetails.map((detail) => (
          <div key={detail._id} className="resource-card">
            <h3>{detail.name?.en || "No Name"}</h3>
            <div className="photo-row">
              {detail.photo?.slice(0, 3).map((photo, i) => (
                <img key={i} src={photo} alt="photo" width={80} />
              ))}
            </div>
            <div className="actions">
              <button onClick={() => handleEdit(detail)} className="edit-btn">✏️ {t("common.edit")}</button>
              <button onClick={() => handleDelete(detail._id)} className="delete-btn">🗑 {t("common.delete")}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageResourceDetail;
