import React, { useState } from 'react';
import '../../styles/AddTour.css';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axiosInstance from '../../api/axiosInstance';

const AddTour = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language; 
  const navigate = useNavigate();

  const [title, setTitle] = useState({ en: '', ru: '', kg: '' });
  const [description, setDescription] = useState({ en: '', ru: '', kg: '' });
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');
  const [location, setLocation] = useState({ en: '', ru: '', kg: '' });
  const [category, setCategory] = useState('');
  const [hotel, setHotel] = useState('');
  const [maxGuests, setMaxGuests] = useState('');
  const [images, setImages] = useState([]);
  const [imageFile, setImageFile] = useState([]);
  const [includes, setIncludes] = useState([]);
  const [currentInclude, setCurrentInclude] = useState({ en: '', ru: '', kg: '' });
  const [startDates, setStartDates] = useState([]);
  const [errors, setErrors] = useState({});

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFile(files);
    setImages(files);
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!title.en.trim() || !title.ru.trim() || !title.kg.trim()) {
      newErrors.title = t("tour.errors.titleRequired");
      isValid = false;
    }

    if (!description.en.trim() || !description.ru.trim() || !description.kg.trim()) {
      newErrors.description = t("tour.errors.descriptionRequired");
      isValid = false;
    }

    if (!price || isNaN(price) || Number(price) < 0) {
      newErrors.price = t("tour.errors.priceInvalid");
      isValid = false;
    }

    if (!duration) {
      newErrors.duration = t("tour.errors.durationRequired");
      isValid = false;
    }

    if (!location.en.trim() || !location.ru.trim() || !location.kg.trim()) {
      newErrors.location = t("tour.errors.locationRequired");
      isValid = false;
    }

    if (!category.trim()) {
      newErrors.category = t("tour.errors.categoryRequired");
      isValid = false;
    }

    if (!hotel.trim()) {
      newErrors.hotel = t("tour.errors.hotelRequired");
      isValid = false;
    }

    if (!maxGuests || isNaN(maxGuests) || Number(maxGuests) < 1) {
      newErrors.maxGuests = t("tour.errors.maxGuestsInvalid");
      isValid = false;
    }

    if (images.length === 0) {
      newErrors.images = t("tour.errors.imagesRequired");
      isValid = false;
    }

    if (includes.length === 0 || includes.some(i => !i.en || !i.ru || !i.kg)) {
      newErrors.includes = t("tour.errors.includesRequired");
      isValid = false;
    }

    if (startDates.length === 0) {
      newErrors.startDates = t("tour.errors.startDatesRequired");
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    try {
      const formData = new FormData();
  
      formData.append("title", JSON.stringify(title));
      formData.append("description", JSON.stringify(description));
      formData.append("location", JSON.stringify(location));
      formData.append("includes", JSON.stringify(includes));
      formData.append("startDates", JSON.stringify(startDates));
  
      formData.append("price", price ? Number(price) : 0);
      formData.append("duration", duration ? Number(duration) : 0);
      formData.append("maxGuests", maxGuests ? Number(maxGuests) : 1);
      formData.append("category", category || "");
      formData.append("hotel", hotel || "");
  
      if (imageFile.length > 0) {
        imageFile.forEach(file => formData.append("images", file));
      }
  
      const response = await axiosInstance.post("/tours", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        timeout: 60000, 
      });
      
      
  
      alert(t("tour.success"));
      navigate("/tour-list");
  
    } catch (err) {
      console.error("Network error:", err);
      alert("❌ Ошибка сети же сервер катасы! Текшерип көрүңүз.");
    }
    console.log("CATEGORY:", category);

  };
  

  return (
    <div className="add-tour">
      <div className="container">
        <p className="addTour-theme">{t("tour.title")}</p>
        <form className="form-block form-container" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className='name-form'>{t("tour.name")} :</label>
            {['en', 'ru', 'kg'].map(lang => (
              <div key={lang}>
                <label>({lang.toUpperCase()})</label>
                <input
                  className='form-inp'
                  value={title[lang]}
                  onChange={e => setTitle({ ...title, [lang]: e.target.value })}
                />
              </div>
            ))}
            {errors.title && <p className="error-message addTour-error">{errors.title}</p>}
          </div>

          <div className="form-group">
            <label className='name-form'>{t("tour.description")} :</label>
            {['en', 'ru', 'kg'].map(lang => (
              <div key={lang}>
                <label>({lang.toUpperCase()})</label>
                <textarea
                  value={description[lang]}
                  onChange={e => setDescription({ ...description, [lang]: e.target.value })}
                />
              </div>
            ))}
            {errors.description && <p className="error-message addTour-error">{errors.description}</p>}
          </div>

          <div className="form-group">
            <label className='name-form'>{t("tour.price")} :</label>
            <input type="number" value={price} onChange={e => setPrice(e.target.value)} />
            {errors.price && <p className="error-message addTour-error">{errors.price}</p>}
          </div>

          <div className="form-group">
            <label className='name-form'>{t("tour.duration")} :</label>
            <select value={duration} onChange={e => setDuration(e.target.value)}>
              <option value="">{t("tour.durationOptions.select")}</option>
              <option value="1">{t("tour.durationOptions.1")}</option>
              <option value="2">{t("tour.durationOptions.2")}</option>
              <option value="3">{t("tour.durationOptions.3")}</option>
              <option value="4">{t("tour.durationOptions.4")}</option>
              <option value="5">{t("tour.durationOptions.5")}</option>
              <option value="6">{t("tour.durationOptions.6")}</option>
              <option value="7">{t("tour.durationOptions.7")}</option>
              <option value="8">{t("tour.durationOptions.8")}</option>
            </select>
            {errors.duration && <p className="error-message addTour-error">{errors.duration}</p>}
          </div>

          <div className="form-group">
            <label className='name-form'>{t("tour.location")} :</label>
            {['en', 'ru', 'kg'].map(lang => (
              <div key={lang}>
                <label>({lang.toUpperCase()})</label>
                <input
                  value={location[lang]}
                  onChange={e => setLocation({ ...location, [lang]: e.target.value })}
                  className='form-inp'
                />
              </div>
            ))}
            {errors.location && <p className="error-message addTour-error">{errors.location}</p>}
          </div>

          <div className="form-group">
            <label className='name-form'>{t("tour.maxGuests")} :</label>
            <input type="number" value={maxGuests} min={1} onChange={e => setMaxGuests(e.target.value)} />
            {errors.maxGuests && <p className="error-message addTour-error">{errors.maxGuests}</p>}
          </div>

          <div className="form-group">
            <label className='name-form'>{t("tour.category")} :</label>
            <select className='add-select' value={category} onChange={e => setCategory(e.target.value)}>
              <option value="">{t("tour.categoryOptions.select")}</option>
              <option value="Adventure">{t("tour.categoryOptions.Adventure")}</option>
              <option value="Relax">{t("tour.categoryOptions.Relax")}</option>
              <option value="Cultural">{t("tour.categoryOptions.Cultural")}</option>
              <option value="City">{t("tour.categoryOptions.City")}</option>
              <option value="Other">{t("tour.categoryOptions.Other")}</option>
              <option value="Nature">{t("tour.categoryOptions.Nature")}</option>
            </select>
            {errors.category && <p className="error-message addTour-error">{errors.category}</p>}
          </div>

          <div className="form-group addTour-img">
            <label className='name-form'>{t("tour.images")} :</label>
            <input type="file" multiple onChange={handleImageChange} />
            {errors.images && <p className="error-message addTour-error">{errors.images}</p>}
            <div className="tour-img-preview">
              {images.map((img, i) => (
                <img key={i} src={URL.createObjectURL(img)} alt={`preview-${i}`} className="addTour-imgs" />
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className='name-form'>{t("tour.includes")} :</label>
            {['en', 'ru', 'kg'].map(lang => (
              <div key={lang}>
                <label>({lang.toUpperCase()})</label>
              <input
                key={lang}
                value={currentInclude[lang]}
                onChange={e => setCurrentInclude({ ...currentInclude, [lang]: e.target.value })}
                className='form-inp'
              />
              </div>
            ))}
            <button type="button" className='addIncludes-btn' onClick={() => {
              if (currentInclude.en && currentInclude.ru && currentInclude.kg) {
                setIncludes([...includes, currentInclude]);
                setCurrentInclude({ en: '', ru: '', kg: '' });
              }
            }}>
              + {t("manage.addInclude")}
            </button>
            <ul>
              {includes.map((inc, i) => (
                <li key={i}>
                  EN: {inc.en}, RU: {inc.ru}, KG: {inc.kg}
                  <button type="button" onClick={() => setIncludes(includes.filter((_, idx) => idx !== i))}>❌</button>
                </li>
              ))}
            </ul>
            {errors.includes && <p className="error-message addTour-error">{errors.includes}</p>}
          </div>

          <div className="form-group">
            <label className='name-form'>{t("tour.startDates")} :</label>
            <input type="date" onChange={e => {
              const date = e.target.value;
              if (date && !startDates.includes(date)) setStartDates([...startDates, date]);
            }} />
            <ul>
              {startDates.map((date, i) => (
                <li key={i}>
                  {new Date(date).toLocaleDateString()}
                  <button type="button" onClick={() => setStartDates(startDates.filter((_, idx) => idx !== i))}>❌</button>
                </li>
              ))}
            </ul>
            {errors.startDates && <p className="error-message addTour-error">{errors.startDates}</p>}
          </div>

          <div className="form-group">
            <label className='name-form'>{t("tour.hotel")} :</label>
            <input value={hotel} onChange={e => setHotel(e.target.value)} className='form-inp' />
            {errors.hotel && <p className="error-message addTour-error">{errors.hotel}</p>}
          </div>

          <button type="submit" className="addTour-btn">{t("tour.addButton")}</button>
        </form>
      </div>
    </div>
  );
};

export default AddTour;
