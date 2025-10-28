import React, { useState, useEffect } from "react";
import {getResources,updateResource,deleteResource,createResource} from "../../api/resourceApi";
import '../../styles/ManageResources.css'

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
    const { name, files } = e.target;
    if (name === "image") {
      const newPreviews = Array.from(files).map(file => ({
        file,
        preview: URL.createObjectURL(file)
      }));
      setPreviewImages(newPreviews);
      setFormData({ ...formData, image: files[0] }); 
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
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null) data.append(key, formData[key]);
      });

      if (editingResource) {
        await updateResource(editingResource._id, data);
      } else {
        await createResource(data);
      }

      setShowModal(false);
      setFormData({ key: "", count: 0, translations: "{}", link: "", image: null });
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

  return (
    <div className="admin-dashboard" style={{paddingTop:'3em'}}>
      <h1>Resources Management</h1>
      <button onClick={() => setShowModal(true)} className="add-btn">+ Add Resource</button>
      <div className="resource-table">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <table className="resources-table">
          <thead>
            <tr>
              <th>Key</th>
              <th>Count</th>
              <th>Link</th>
              <th>Image</th>
              <th>Actions</th>
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
                  className="edit-btn">Edit</button>
                  <button onClick={() => handleDelete(res._id)}
                  className="delete-btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2>{editingResource ? "Edit Resource" : "Add Resource"}</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Key:
                <input name="key" value={formData.key} onChange={handleChange} required />
              </label>
              <label>
                Count:
                <input
                  type="number"
                  name="count"
                  value={formData.count}
                  onChange={handleChange}
                />
              </label>
              <label>
                Link:
                <input name="link" value={formData.link} onChange={handleChange} />
              </label>
              <label>
                Translations (JSON):
                <textarea
                  name="translations"
                  value={formData.translations}
                  onChange={handleChange}
                />
              </label>
              <label>
                Image:
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

              <button type="submit">{editingResource ? "Update" : "Create"}</button>
              <button type="button" onClick={() => setShowModal(false)}>
                Cancel
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
