import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import "../../styles/EditTour.css";
import { useTranslation } from "react-i18next";
const LANGS = ["en", "ru", "kg"];

const EditTour = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState({
    title: { en: "", ru: "", kg: "" },
    description: { en: "", ru: "", kg: "" },
    location: { en: "", ru: "", kg: "" },
    price: "",
    duration: "",
    maxGuests: "",
    category: "",
    hotel: "",
    includes: [{ en: "", ru: "", kg: "" }],
    startDates: [""],
    imageUrls: [""],
  });

  const [newImages, setNewImages] = useState([]);
  const [previewPhotos, setPreviewPhotos] = useState([]);

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const res = await axiosInstance.get(`/tours/${id}`);
        const tour = res.data;

        const includes = tour.includes?.length
          ? tour.includes
          : [{ en: "", ru: "", kg: "" }];

        setFormData({
          title: tour.title,
          description: tour.description,
          location: tour.location,
          price: tour.price,
          duration: tour.duration,
          maxGuests: tour.maxGuests,
          category: tour.category,
          hotel: tour.hotel || "",
          includes,
          startDates: tour.startDates?.map((d) => d.slice(0, 10)) || [""],
          imageUrls: tour.imageUrls || [""],
        });

        setLoading(false);
      } catch (err) {
        setError("Failed to load tour.");
        setLoading(false);
      }
    };

    fetchTour();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleMultilangChange = (e, field, lang, index = null) => {
    const value = e.target.value;
    setFormData((prev) => {
      if (index !== null) {
        const newArray = [...prev[field]];
        newArray[index] = { ...newArray[index], [lang]: value };
        return { ...prev, [field]: newArray };
      } else {
        return { ...prev, [field]: { ...prev[field], [lang]: value } };
      }
    });
  };

  const addInclude = () => {
    setFormData((prev) => ({
      ...prev,
      includes: [...prev.includes, { en: "", ru: "", kg: "" }],
    }));
  };

  const removeInclude = (index) => {
    setFormData((prev) => {
      const newArray = [...prev.includes];
      newArray.splice(index, 1);
      return { ...prev, includes: newArray };
    });
  };

  const handleArrayChange = (e, index, field) => {
    const newArray = [...formData[field]];
    newArray[index] = e.target.value;
    setFormData((prev) => ({ ...prev, [field]: newArray }));
  };

  const addArrayItem = (field) => {
    setFormData((prev) => ({ ...prev, [field]: [...prev[field], ""] }));
  };

  const removeArrayItem = (field, index) => {
    setFormData((prev) => {
      const newArray = [...prev[field]];
      newArray.splice(index, 1);
      return { ...prev, [field]: newArray };
    });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImages((prev) => [...prev, ...files]);
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewPhotos((prev) => [...prev, ...previews]);
  };

  const removeNewPhoto = (index) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
    setPreviewPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const removeExistingPhoto = (url) => {
    setFormData((prev) => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((img) => img !== url),
    }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const submitData = new FormData();
    
    submitData.append("title", JSON.stringify(formData.title));
    submitData.append("description", JSON.stringify(formData.description));
    submitData.append("location", JSON.stringify(formData.location));
    submitData.append("includes", JSON.stringify(formData.includes));
    submitData.append("startDates", JSON.stringify(formData.startDates));

    submitData.append("price", formData.price);
    submitData.append("duration", formData.duration);
    submitData.append("maxGuests", formData.maxGuests);
    submitData.append("category", formData.category);
    submitData.append("hotel", formData.hotel);

    formData.imageUrls.forEach(url => {
      if (url && url.trim() !== "") {
        submitData.append("existingImageUrls", url);
      }
    });

    newImages.forEach(file => {
      submitData.append("photo", file);
    });

    await axiosInstance.put(`/tours/${id}`, submitData, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    alert(t("tour.alert.updatedSuccess"));
    navigate("/total-tours");
  } catch (err) {
    setError("Failed to update.");
  } finally {
    setLoading(false);

  }
};

  if (loading) return <p className="loading">Loading tour...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="edit-tour">
      <div className="container">
        <h2>{t("manage.editTour")}</h2>
        <form onSubmit={handleSubmit} className="edit-form">

          <label>{t("tour.name")} :</label>
          {LANGS.map((lang) => (
            <input
              key={lang}
              value={formData.title[lang]}
              onChange={(e) => handleMultilangChange(e, "title", lang)}
              placeholder={`Title (${lang})`}
              required
            />
          ))}

          <label>{t("tour.price")} :</label>
          <input
            name="price"
            value={formData.price}
            onChange={handleChange}
            type="number"
            required
          />

          <label>{t("tour.description")} :</label>
          {LANGS.map((lang) => (
            <textarea
              key={lang}
              value={formData.description[lang]}
              onChange={(e) => handleMultilangChange(e, "description", lang)}
              placeholder={`Description (${lang})`}
              rows="3"
            />
          ))}

          <label>{t("tour.duration")} :</label>
          <input
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            type="number"
            required
          />

          <label>{t("tour.maxGuests")}:</label>
          <input
            name="maxGuests"
            value={formData.maxGuests}
            onChange={handleChange}
            type="number"
            required
          />

          <label>{t("tour.location")} :</label>
          {LANGS.map((lang) => (
            <input
              key={lang}
              value={formData.location[lang]}
              onChange={(e) => handleMultilangChange(e, "location", lang)}
              placeholder={`Location (${lang})`}
              required
            />
          ))}

          <label>{t("tour.category")} :</label>
          <select className="editTour-select"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
             <option value="">{t("tour.categoryOptions.select")}</option>
              <option value="Adventure">{t("tour.categoryOptions.Adventure")}</option>
              <option value="Relax">{t("tour.categoryOptions.Relax")}</option>
              <option value="Cultural">{t("tour.categoryOptions.Cultural")}</option>
              <option value="City">{t("tour.categoryOptions.City")}</option>
              <option value="Other">{t("tour.categoryOptions.Other")}</option>
              <option value="Nature">{t("tour.categoryOptions.Nature")}</option>
          </select>

        
            <label className="name-form">{t("tour.hotel")} :</label>
            <input
              type="text"
              name="hotel"
              value={formData.hotel}
              onChange={handleChange}
              placeholder="Enter hotel name"
            />
        


          <label>{t("tour.includes")} :</label>
          {formData.includes.map((inc, index) => (
            <div key={index} >
              {LANGS.map((lang) => (
                <input
                  key={lang}
                  value={inc[lang]}
                  onChange={(e) => handleMultilangChange(e, "includes", lang, index)}
                  placeholder={`Include (${lang})`}
                  style={{ width: "90%", marginBottom: "4px" }}
                />
              ))}
              <button type="button" onClick={() => removeInclude(index)}>x</button>
            </div>
          ))}
          <button type="button" onClick={addInclude}>+ {t("manage.addInclude")}</button>

          <label>{t("tour.startDates")} :</label>
          {formData.startDates.map((date, index) => (
            <div key={index} className="array-item">
              <input
                type="date"
                value={date}
                onChange={(e) => handleArrayChange(e, index, "startDates")}
                style={{ width: "90%" }}
              />
              <button type="button" onClick={() => removeArrayItem("startDates", index)}>x</button>
            </div>
          ))}
          <button type="button" onClick={() => addArrayItem("startDates")}>+ {t("manage.addDate")}</button>

          <label>{t("tour.images")} URL:</label>
          {/* {formData.imageUrls.map((url, index) => (
            <div key={index} className="array-item">
              <input
                value={url}
                onChange={(e) => handleArrayChange(e, index, "imageUrls")}
                style={{ width: "90%" }}
              />
              <button type="button" onClick={() => removeArrayItem("imageUrls", index)}>x</button>
            </div>
          ))} */}
          {/* <button type="button" onClick={() => addArrayItem("imageUrls")}>+ {t("manage.addImage")}</button> */}
          <div className="existing-photos">
            {formData.imageUrls.map((url, i) => (
              <div key={i} className="photo-item">
                <img src={url} alt="tour" width="100" />
                <button type="button" onClick={() => removeExistingPhoto(url)}>x</button>
              </div>
            ))}
          </div>

          <input type="file" multiple onChange={handleFileChange} accept="image/*" />

          <div className="preview-photos">
            {previewPhotos.map((url, i) => (
              <div key={i} className="photo-item">
                <img src={url} alt="preview" width="100" />
                <button type="button" onClick={() => removeNewPhoto(i)}>x</button>
              </div>
            ))}
          </div>

          <button type="submit">{t("manage.updateTour")}</button>
          {success && <p className="success">{t("manage.tourUpdatedSuccesfully")} !</p>}
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default EditTour;
