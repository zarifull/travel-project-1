import React, { useState, useEffect } from "react";
import {getResources,updateResource,deleteResource,createResource} from "../../api/resourceApi";
import '../../styles/ManageResources.css';
import { useTranslation } from "react-i18next";
import Loading from "../../Components/Loading.jsx";

const ManageResources = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingResource, setEditingResource] = useState(null);
  const [formData, setFormData] = useState({
    
    key: "",
    count: 0,
    translations: "{}",
    link: "",
    image: null,
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [existingImages, setExistingImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const { t } = useTranslation();


  const fetchResources = async () => {
    try {
      setLoading(true);
      const data = await getResources(); 
      setResources(data);
    } catch (err) {
      setError("Failed to load resources");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);


  const handleChange = (e) => {
    const { name, value, files } = e.target;
  
    if (name === "image") {
      const file = files[0];
      setPreviewImage(URL.createObjectURL(file)); 
      setFormData({ ...formData, image: file }); 
    } else {
      setFormData({ ...formData, [name]: value }); 
    }
  };
  
  const handleRemoveExistingImage = async (imageUrl) => {
    if (!window.confirm("Delete this image?")) return;
    try {
      const updatedImages = existingImages.filter((img) => img !== imageUrl);
      setExistingImages(updatedImages);
    } catch (err) {
      console.error("Error removing image:", err);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("key", formData.key);
      data.append("count", formData.count);
      data.append("link", formData.link);
      data.append("translations", formData.translations); 
      if (formData.image) data.append("image", formData.image); 
  
      if (editingResource) {
        await updateResource(editingResource._id, data);
      } else {
        await createResource(data);
      }
  
      setShowModal(false);
      setFormData({ key: "", count: 0, translations: "{}", link: "", image: null });
      setPreviewImage(null);
      setEditingResource(null);
      fetchResources();
    } catch (err) {
      setError(err.response?.data?.message || "Error saving resource");
    }
  };
  

  const handleEdit = (resource) => {
    setEditingResource(resource);
    setFormData({
      key: resource.key,
      count: resource.count,
      translations: JSON.stringify(resource.translations),
      link: resource.link || "",
      image: null,
    });
    setExistingImages(resource.image ? [resource.image] : []);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this resource?")) return;
    try {
      await deleteResource(id);
      fetchResources();
    } catch {
      setError("Failed to delete resource");
    }
  };

  if (loading) return <Loading text={t("common.fetchingData")} />;

  return (
    <div className="admin-dashboard" style={{paddingTop:'3em'}}>
      <h1>{t("admin.manageResources")}</h1>
      <button onClick={() => setShowModal(true)} className="add-btn">+ {t("manage.addResources")}</button>
      <div className="resource-table">
      {loading ? (
        <p>{t("common.loading")}</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <table className="resources-table">
          <thead>
            <tr>
              <th>{t("manage.key")}</th>
              <th>{t("manage.count")}</th>
              <th>{t("manage.link")}</th>
              <th>{t("manage.image")}</th>
              <th>{t("manage.actions")}</th>
            </tr>
          </thead>
          <tbody>
            {resources.map((res) => (
              <tr key={res._id}>
                <td>{res.key}</td>
                <td>{res.count}</td>
                <td>{res.link || "-"}</td>
                <td>
                {res.image && <img src={res.image} alt={res.key} width={50} />}
                </td>
                <td>
                  <button onClick={() => handleEdit(res)}
                  className="edit-btn">{t("common.edit")}</button>
                  <button onClick={() => handleDelete(res._id)}
                  className="delete-btn">{t("common.delete")}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2>{editingResource ? t("common.edit") : t("common.add")}</h2>
            <form onSubmit={handleSubmit}>
              <label>
              {t("manage.key")}
                <input name="key" value={formData.key} onChange={handleChange} required />
              </label>
              <label>
              {t("manage.count")}
                <input
                  type="number"
                  name="count"
                  value={formData.count}
                  onChange={handleChange}
                />
              </label>
              <label>
              {t("manage.link")}
                <input name="link" value={formData.link} onChange={handleChange} />
              </label>
              <label>
                {t("manage.translations")} (JSON):
                <textarea
                  name="translations"
                  value={formData.translations}
                  onChange={handleChange}
                />
              </label>
              <label>
                {t("manage.image")}:
                <input type="file" name="image" onChange={handleChange} />
              </label>
              
                {existingImages.length > 0 && (
                  <div className="existing-images">
                    <h4>Existing Images</h4>
                    <div className="image-list">
                      {existingImages.map((img, i) => (
                        <div key={i} className="image-item">
                          <img src={img} alt="existing" className="preview" />
                          <button type="button" onClick={() => handleRemoveExistingImage(img)}>
                            🗑
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {previewImage && (
                  <div className="new-preview">
                    <h4>New Image Preview</h4>
                    <img src={previewImage} alt="preview" className="preview" />
                  </div>
                )}

              <button type="submit">{editingResource ? t("common.update") : t("common.create")}</button>
              <button type="button" onClick={() => setShowModal(false)}>
                {t("common.cancel")}
              </button>
            </form>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default ManageResources;
