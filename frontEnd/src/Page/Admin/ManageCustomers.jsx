import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getAllCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../../api/customersDetailApi.js"; 
import '../../styles/ManageCustomers.css';

const ManageCustomer = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [formData, setFormData] = useState({
    resourceDetailId: "",
    name: { en: "", ru: "", kg: "" },
    photo: [],
    comments: [],
  });
  const [previewPhotos, setPreviewPhotos] = useState([]);
  const [existingPhotos, setExistingPhotos] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const data = await getAllCustomers();
      setCustomers(data);
    } catch (err) {
      setError("Failed to load customers");
    } finally {
      setLoading(false);
    }
  };

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

  const handleRemoveExistingPhoto = (url) => {
    if (!window.confirm("Delete this photo?")) return;
    setExistingPhotos((prev) => prev.filter((img) => img !== url));
  };

  const handleEdit = (customer) => {
    setEditingCustomer(customer);
    setFormData({
      resourceDetailId: customer.resourceDetailId || "",
      name: customer.name || { en: "", ru: "", kg: "" },
      photo: [],
      comments: customer.comments || [],
    });
    setPreviewPhotos([]);
    setExistingPhotos(customer.photo || []);
    setShowModal(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this customer?")) return;
    try {
      await deleteCustomer(id);
      fetchCustomers();
    } catch (err) {
      setError("Failed to delete customer");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("📤 Sending data:", {
      resourceDetailId: formData.resourceDetailId,
      name: formData.name,
      newPhotos: formData.photo.map((f) => f.name),
      existingPhotos,
    });
  
    try {
      const submitData = new FormData();
      submitData.append("resourceDetailId", formData.resourceDetailId);
      submitData.append("name", JSON.stringify(formData.name));
  
      formData.photo.forEach((file) => submitData.append("photo", file));
      existingPhotos.forEach((url) => submitData.append("existingPhoto", url));
  
      if (editingCustomer) {
        await updateCustomer(editingCustomer._id, submitData);
        alert("✅ Customer updated successfully!");
        setEditingCustomer(null);
      } else {
        await createCustomer(submitData);
        alert("✅ Customer created successfully!");
      }
  
      setFormData({
        resourceDetailId: "",
        name: { en: "", ru: "", kg: "" },
        photo: [],
        comments: [],
      });
      setPreviewPhotos([]);
      setExistingPhotos([]);
      setShowModal(false);
      fetchCustomers();
    } catch (err) {
      console.error("Error saving customer:", err);
      setError(err.response?.data?.message || "❌ Error saving customer");
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div className="manage-customer">
      <h1>Manage Customers</h1>
      <Link className="add-btn" to='/add-customer-detail'>+ Add Customer</Link>

      {loading ? <p>Loading...</p> : error ? <p style={{ color: "red" }}>{error}</p> : null}

      <div className="customer-list">
        {customers.map((c) => (
          <div key={c._id} className="customer-box">
            <h3 className="customer-theme">{c.name?.en || "No Name"}</h3>
            <div className="customer-photos">
              {c.photo?.map((p, i) => (
                <img key={i} src={p} alt="customer" width={80} />
              ))}
            </div>
            <div className="customer-actions">
              <button onClick={() => handleEdit(c)}
              className="edit-btn">✏️ Edit</button>
              <button onClick={() => handleDelete(c._id)}
              className="delete-btn">🗑 Delete</button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2>{editingCustomer ? "Edit Customer" : "Add Customer"}</h2>
            <form onSubmit={handleSubmit}>
              <label>Resource Detail ID:</label>
              <input
                type="text"
                value={formData.resourceDetailId}
                onChange={(e) => setFormData({ ...formData, resourceDetailId: e.target.value })}
                required
              />

              <label>Names:</label>
              {["en", "ru", "kg"].map((lang) => (
              <input
                key={lang}
                type="text"
                placeholder={`Name (${lang})`}
                value={formData.name?.[lang] || ""}
                onChange={(e) => handleTextChange(lang, "name", e.target.value)}
              />
            ))}


              <label>Photos:</label>
              <input type="file" multiple onChange={handleFileChange} />
              
              {existingPhotos.length > 0 && (
                <div className="preview-row">
                  {existingPhotos.map((url, i) => (
                    <div key={i} className="image-item">
                      <img src={url} alt="existing" width={80} />
                      <button type="button" onClick={() => handleRemoveExistingPhoto(url)}>🗑</button>
                    </div>
                  ))}
                </div>
              )}
              
              {previewPhotos.length > 0 && (
                <div className="preview-row">
                  {previewPhotos.map((url, i) => (
                    <img key={i} src={url} alt="preview" width={80} />
                  ))}
                </div>
              )}

              <div className="form-actions">
                <button type="submit" className="edit-btn">
                  {loading ? "Saving..." : editingCustomer ? "Update" : "Create"}
                </button>
                <button
                  type="button"
                  className="delete-btn"
                  onClick={() => {
                    setShowModal(false);
                    setEditingCustomer(null);
                    setFormData({
                      resourceDetailId: "",
                      name: { en: "", ru: "", kg: "" },
                      photo: [],
                      comments: [],
                    });
                    setPreviewPhotos([]);
                    setExistingPhotos([]);
                  }}
                >
                  Cancel
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCustomer;
