import React, { useEffect, useState , useRef} from 'react';
import './TourDetails.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineSettings } from "react-icons/md";
import { RiFileEditFill } from "react-icons/ri";
import { RiDeleteBin5Fill } from "react-icons/ri";
import axios from 'axios';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const TourDetails = ({ tours }) => {
  const detailRef = useRef();

  const { id } = useParams();
  const [openMenu,setOpenMenu]=useState(false);
  const crudRef = useRef(null);
  const navigate = useNavigate();


  useEffect(()=>{
    const handleClickOutside = (event) =>{
      if(crudRef.current && !crudRef.current.contains(event.target)){
        setOpenMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  },[])

  if (!tours || !Array.isArray(tours) || tours.length === 0) {
    return <p>Loading tours...</p>;
  }

  const tour = tours.find((t) => t._id === id);

  if (!tour) {
    return <p>Tour not found</p>;
  }



  
  const handleDelete = async () => {
    const confirmed = window.confirm('Are you sure you want to delete this tour?');
    if (!confirmed) return;
  
    try {
      const response = await axios.delete(`http://localhost:7070/api/tours/${tour._id}`);
      alert(response.data.message);
      navigate('/tours'); // go to tours list after successful deletion
    } catch (error) {
      alert('Delete failed: ' + (error.response?.data?.message || error.message));
    }
  };
  

  return (
    <section className="tour-details">
      <div className="container">
        <section className="tourDetails-container">
          <h2 className='details-title'>{tour.title}</h2>
          <div className="detail-slider">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            loop={tour.imageUrls?.length > 2}
            spaceBetween={20}
            slidesPerView={1}
            className='slider-prev'
          >

            {tour.imageUrls?.length > 0 ? (
              tour.imageUrls.map((img, index) => (
                <SwiperSlide key={index}>
                  <img src={img} alt={`Slide ${index + 1}`} className="custom-slide-image" />
                </SwiperSlide>
              ))
            ) : (
              <SwiperSlide>
                <img src="/default.jpg" alt="Default" className="custom-slide-image" />
              </SwiperSlide>
            )}

            </Swiper>
          </div>

          <menu className="detail-crud">
            <div className="crud-btn">
            <MdOutlineSettings  onClick={()=> setOpenMenu(!openMenu)} />
            {openMenu && (
              <div className="crud-links">
                  <Link className='crud-link' to={`/edit-tour/${tour._id}`}><RiFileEditFill  /> </Link>
                  <Link
                        className="crud-link delete-btn"
                        onClick={handleDelete}
                        title="Delete Tour"
                        
                      >
                        <RiDeleteBin5Fill />
                      </Link>
              </div>
            )}
            </div>
          </menu>
      
          <div className="detail-info">
            <div className="detail-description">
            <p className=' detail-descrpn'><strong>Description: </strong> {tour.description}</p>
            </div>
            <p className='detail-box detail-location' ><strong> <FaLocationDot /> Location:</strong> {tour.location}</p>
            <p className='detail-box detail-duration'><strong> Duration:</strong>  {tour.duration} days</p>
            <p className='detail-box detail-price'><strong>Price:</strong> ${tour.price}</p>
            <p className='detail-box detail-category'><strong>category:</strong> {tour.category}</p>
            <div className="detail-box detail-startDates">
                <strong>Start Dates:</strong>
                <ul>
                  {tour.startDates?.map((date, i) => (
                    <li key={i}>{new Date(date).toLocaleDateString()}</li>
                  ))}
                </ul>
              </div>

              <div className="detail-box detail-includes">
                <strong>Includes:</strong>
                <ul>
                  {tour.includes?.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>


            <p className='detail-box detail-ispopular'><strong>Popular:</strong> {tour.isPopular ? '👍 👍 👍 👍 👍' : '👎 👎 👎'}</p>

          </div>
        </section>
      </div>
    </section>
  );
};

export default TourDetails;
