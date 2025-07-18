import React, { useState } from 'react';
import '../../styles/AddTour.css'
import { useNavigate } from 'react-router-dom';


const AddTour = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');
  const [location, setLocation] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [images, setImages] = useState([]);  
  const [imageFile,setImageFile] = useState([]);
  const [category,setCategory]=useState('');
  const[isPopular,setIsPopular]=useState(false);
  const [includes, setIncludes] = useState([]);
  const [startDates, setStartDates] = useState([]);


  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = 'Турдун аты сөзсүз керек';
      isValid = false;
      
    } else if (title.trim().length < 3) {
      newErrors.title = 'Аталыш өтө кыска';
      isValid = false;
    } else if (title.trim().length > 100) {
      newErrors.title = 'Аталыш өтө узун';
      isValid = false;
    }

    if (!description.trim()) {
      newErrors.description = 'Сүрөттөмө керек';
      isValid = false;
    }

    if (!price) {
      newErrors.price = 'Баасы керек';
      isValid = false;
    } else if (isNaN(price) || Number(price) < 0) {
      newErrors.price = 'Баа туура эмес';
      isValid = false;
    }

    if (!duration) {
      newErrors.duration = 'Узактыгын тандаңыз';
      isValid = false;
    }
    if (startDates.length === 0) {
      newErrors.startDates = 'Кеминде бир башталыш датасы керек';
      isValid = false;
    }
       
    if (!location.trim()) {
      newErrors.location = 'Жайгашкан жери керек';
      isValid = false;
    }
    if(!category.trim()){
      newErrors.category = 'Категория жазыныз';
      isValid = false
    }
    if (images.length === 0) {
      newErrors.images = 'Сүрөт сөзсүз керек';
      isValid = false;
    }
    if (includes.length === 0 || includes.some(i => !i.trim())) {
      newErrors.includes = 'Кеминде бир “includes” кошуңуз';
      isValid = false;
    }


    setErrors(newErrors);
    console.log("Validation Errors:", newErrors); 
    return isValid;
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFile(files); // massive file
    setImages(files); // ✅ store all files
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const formData = new FormData();
          formData.append('title', title);
          formData.append('description', description);
          formData.append("price", Number(price));
          formData.append('duration', duration);
          formData.append('location', location);
          formData.append('category',category)
          formData.append('includes', JSON.stringify(includes));
          formData.append('startDates', JSON.stringify(startDates));
          formData.append('isPopular', isPopular ? "true" : "false");


          imageFile.forEach((file) => {
            formData.append('images', file); // Must match backend field name
          });

          console.log([...formData.entries()]);
          console.log(price, duration,category);  // Бекенге өтүүчү маалыматты көр
          console.log("Images file: ", images);

      try {
        const response = await fetch('http://localhost:7070/api/tours', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          alert("Тур ийгиликтүү кошулду 👍")
          console.log('Тур ийгиликтүү кошулду!');
          navigate('/tours?page=1');
        } else {
          alert("Турду кошууда ката кетти 👎")
          console.error('Турду кошууда ката кетти.');
          const errorData = await response.json();
          console.log(errorData);
        }

        

      } catch (error) {
        console.error('Тармак катасы:', error);
      }

    }

    const isValid = validateForm();
    console.log("Is form valid?", isValid);
  };



  
  return (
    <div className="add-tour">
      <div className="container">
        <p className="addTour-theme">Add a new travel</p>
        <form className='form-block form-container' onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Name : </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder=''
            />
            {errors.title && <p className="error-message addTour-error">{errors.title}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="description">Description : </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {errors.description && <p className="error-message addTour-error">{errors.description}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="price">Price: </label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            {errors.price && <p className="error-message addTour-error">{errors.price}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="duration">Duration : </label>
            <select
              id="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className='duration'
            >
              <option value="">select</option>
              <option value="1">1 day </option>
              <option value="2">2 days</option>
              <option value="3">3 days</option>
              <option value="7">1 week</option>
              <option value="custom">Ыңгайлаштырылган</option>
            </select>
            {errors.duration && <p className="error-message addTour-error">{errors.duration}</p>}
          </div>

          <div className="form-group">
          <label htmlFor="startDates">Start Dates:</label>
          <input
            type="date"
            className='startDates'
            onChange={(e) => {
              const date = e.target.value;
              if (date && !startDates.includes(date)) {
                setStartDates([...startDates, date]);
              }
            }}
          />

          <ul className="formLists-list">
            {startDates.map((date, index) => (
              <li key={index} className="formgroup-Item">
                {new Date(date).toLocaleDateString()}
                <button
                  type="button"
                  onClick={() => {
                    const updatedDates = [...startDates];
                    updatedDates.splice(index, 1);
                    setStartDates(updatedDates);
                  }}
                  className="removeBtn"
                >
                  ❌
                </button>
              </li>
            ))}
              </ul>
              {errors.startDates&& <p className="error-message addTour-error">{errors.startDates}</p>}

            </div>


          <div className="form-group">
            <label htmlFor="location">Location : </label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            {errors.location && <p className="error-message addTour-error">{errors.location}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="category">Category :</label>
            <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className='category'
              >
                <option value="">select</option>
                <option value="Adventure">Adventure</option>
                <option value="Relax">Relax</option>
                <option value="Cultural">Cultural</option>
                <option value="City">City</option>
                <option value="Other">Other</option>
                <option value="Nature">Nature</option>
              </select>
              {errors.category && <p className="error-message addTour-error">{errors.category}</p>}
          </div>


          <div className="form-group addTour-img">
            <label htmlFor="images">Images : </label>
            <input type="file" id="images" multiple onChange={handleImageChange} />
            {errors.images && <p className="error-message addTour-error">{errors.images}</p>}
            {images && images.map((img,i)=>(
              <img
              key={i}
                src={URL.createObjectURL(img)}
                alt={`preview-${i}`}
                style={{ maxWidth: '100px' }}
                className='addTour-imgs'
              />
            ))}
          </div>

          <div className="form-group">
            <label htmlFor="includes">Includes:</label>
            <input
              type="text"
              id="includes"
              className="includes"
              placeholder="Мисалы: Гид кызматтары"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  const value = e.target.value.trim();
                  if (value) {
                    setIncludes([...includes, value]);
                    e.target.value = '';
                  }
                }
              }}
            />

            <ul className="formLists-list">
              {includes.map((item, index) => (
                <li key={index} className="formgroup-Item">
                  {item}
                  <button
                    type="button"
                    className="removeBtn"
                    onClick={() => {
                      const updated = [...includes];
                      updated.splice(index, 1);
                      setIncludes(updated);
                    }}
                  >
                    ❌
                  </button>
                </li>
              ))}
            </ul>
            {errors.includes && <p className="error-message addTour-error">{errors.includes}</p>}
          </div>

          <div className="form-group addTour-ifd" >
            <label htmlFor="isPopular">Popular:</label>
            <input
              type="checkbox"
              id="isPopular"
              checked={isPopular}
              onChange={(e) => setIsPopular(e.target.checked)}
              style={{}}
            />
          </div>
          <button type="submit"  className="add-btn">
            Кошуу
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTour;
