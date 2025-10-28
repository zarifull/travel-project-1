import React, { useEffect, useState } from "react";
import {
  getAllResourceDetails,
  deleteResourceDetail,
  createResourceDetail,
  updateResourceDetail,
} from "../../api/resourceDetailApi";
import "../../styles/ManageResourceDetails.css";

const ManageResourceDetail = () => {
  const [resourceDetails, setResourceDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingDetail, setEditingDetail] = useState(null);
  const [formData, setFormData] = useState({
    resourceId: "",
    name: { en: "", ru: "", kg: "" },
    comment: { en: "", ru: "", kg: "" },
    logoAlt: { en: "", ru: "", kg: "" },
    photo: [],
    logo: [],
    video: [],
  });

  const [previewPhoto, setPreviewPhoto] = useState([]);
  const [previewLogo, setPreviewLogo] = useState([]);
  const [existingPhoto, setExistingPhoto] = useState([]);
  const [existingLogo, setExistingLogo] = useState([]);

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
    setFormData((prev) => ({ ...prev, [name]: filesArray }));

    if (name === "photo") setPreviewPhoto(filesArray.map((f) => URL.createObjectURL(f)));
    if (name === "logo") setPreviewLogo(filesArray.map((f) => URL.createObjectURL(f)));
  };

  const handleTextChange = (lang, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: { ...prev[field], [lang]: value },
    }));
  };

  const handleRemoveExistingPhoto = (url) => {
    if (!window.confirm("Delete this existing photo?")) return;
    setExistingPhoto((prev) => prev.filter((img) => img !== url));
  };

  const handleRemoveExistingLogo = (url) => {
    if (!window.confirm("Delete this existing logo?")) return;
    setExistingLogo((prev) => prev.filter((img) => img !== url));
  };

  const handleEdit = (detail) => {
    setEditingDetail(detail);
    setFormData({
      resourceId: detail.resourceId || "",
      name: detail.name || { en: "", ru: "", kg: "" },
      comment: detail.comment || { en: "", ru: "", kg: "" },
      logoAlt: detail.logoAlt || { en: "", ru: "", kg: "" },
      photo: [],
      logo: [],
      video: [],
    });

    setPreviewPhoto([]);
    setPreviewLogo([]);
    setExistingPhoto(detail.photo || []);
    setExistingLogo(detail.logo?.url || []);

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
      submitData.append("resourceId", formData.resourceId);
      submitData.append("name", JSON.stringify(formData.name));
      submitData.append("comment", JSON.stringify(formData.comment));
      submitData.append("logoAlt", JSON.stringify(formData.logoAlt));

      formData.photo.forEach((file) => submitData.append("photo", file));
      formData.logo.forEach((file) => submitData.append("logo", file));
      formData.video.forEach((file) => submitData.append("video", file));

      existingPhoto.forEach((url) => submitData.append("existingPhoto", url));
      existingLogo.forEach((url) => submitData.append("existingLogo", url));

      if (editingDetail) {
        await updateResourceDetail(editingDetail._id, submitData);
        alert("Resource detail updated successfully!");
        setEditingDetail(null);
      } else {
        await createResourceDetail(submitData);
        alert("Resource detail created successfully!");
      }

      setFormData({
        resourceId: "",
        name: { en: "", ru: "", kg: "" },
        comment: { en: "", ru: "", kg: "" },
        logoAlt: { en: "", ru: "", kg: "" },
        photo: [],
        logo: [],
        video: [],
      });

      setPreviewPhoto([]);
      setPreviewLogo([]);
      setExistingPhoto([]);
      setExistingLogo([]);
      fetchResourceDetails();
    } catch (err) {
      console.error("Error saving resource detail:", err);
      setError(err.response?.data?.message || "Error saving resource detail");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="manage-resource">
      <h1>Manage Resource Details</h1>

      <form className="resource-form" onSubmit={handleSubmit}>
        <label>Resource ID:</label>
        <input
          type="text"
          value={formData.resourceId}
          onChange={(e) => setFormData({ ...formData, resourceId: e.target.value })}
          required
        />

        <div className="form-langs">
          <label>Names:</label>
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

        <div className="form-langs">
          <label>Comments:</label>
          {["en", "ru", "kg"].map((lang) => (
            <input
              key={lang}
              type="text"
              placeholder={`Comment (${lang})`}
              value={formData.comment[lang]}
              onChange={(e) => handleTextChange(lang, "comment", e.target.value)}
            />
          ))}
        </div>

        <div className="form-langs">
          <label>Logo Alt:</label>
          {["en", "ru", "kg"].map((lang) => (
            <input
              key={lang}
              type="text"
              placeholder={`Alt (${lang})`}
              value={formData.logoAlt[lang]}
              onChange={(e) => handleTextChange(lang, "logoAlt", e.target.value)}
            />
          ))}
        </div>

        <label>Photos:</label>
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

        <label>Logos:</label>
        <input type="file" name="logo" multiple onChange={handleFileChange} />
        {existingLogo.length > 0 && (
          <div className="preview-row">
            {existingLogo.map((img, i) => (
              <div key={i} className="image-item">
                <img src={img} alt="existing logo" width={80} />
                <button type="button" onClick={() => handleRemoveExistingLogo(img)}>
                  🗑
                </button>
              </div>
            ))}
          </div>
        )}
        {previewLogo.length > 0 && (
          <div className="preview-row">
            {previewLogo.map((img, i) => (
              <img key={i} src={img} alt="preview logo" width={80} />
            ))}
          </div>
        )}

        <label>Videos:</label>
        <input type="file" name="video" multiple onChange={handleFileChange} />

        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : editingDetail ? "Update Resource Detail" : "Add Resource Detail"}
        </button>
      </form>

      <h2>Existing Resource Details</h2>
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
            <div className="logo-row">
              {detail.logo?.url?.map((logo, i) => (
                <img key={i} src={logo} alt="logo" width={80} />
              ))}
            </div>
            <div className="actions">
              <button onClick={() => handleEdit(detail)}>✏️ Edit</button>
              <button onClick={() => handleDelete(detail._id)}>🗑 Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageResourceDetail;
