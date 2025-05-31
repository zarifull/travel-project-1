import React, { useEffect, useState , useRef} from 'react';
import './TourDetails.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useParams } from 'react-router-dom';
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineSettings } from "react-icons/md";import { Link } from 'react-router-dom';
import { RiFileEditFill } from "react-icons/ri";
import { RiDeleteBin5Fill } from "react-icons/ri";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const TourDetails = ({ tours }) => {
  const detailRef = useRef();

  const { id } = useParams();
  const [openMenu,setOpenMenu]=useState(false);
  const crudRef = useRef(null);

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
            <button className="crud-btn">
            <MdOutlineSettings  onClick={()=> setOpenMenu(!openMenu)} />
            {openMenu && (
              <div className="crud-links">
                  <Link className='crud-link' to={`/edit-tour/${tour._id}`}><RiFileEditFill  /> </Link>
                  <Link className='crud-link'  to={`/delete-tour/${tour._id}`}><RiDeleteBin5Fill  /> </Link>
              </div>
            )}
            </button>
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
