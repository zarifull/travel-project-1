import {React, useState , useEffect,useCallback} from 'react';
import '../../styles/LandingPage.css';
import balon from '../../Assets/balon.png';
import camera from '../../Assets/camera.png';
import coffee from '../../Assets/coffee.png';
import directionBoard from '../../Assets/directionBoard.png';
import durbu from '../../Assets/durbu.png';
import plane from '../../Assets/plane.png';
import Advertisment from '../../Components/Advertisment';
import { Link } from 'react-router-dom';
import TourCard from '../../Components/TourCard';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../Context/AuthContext"; 
import axiosInstance from '../../api/axiosInstance';
import { useTranslation } from 'react-i18next';
import mainimg from '../../Assets/mainPhoto.png';
import ResourcesList from '../../Page/Resources/ResourcesList';
import TourSearchForm from './TourSearchForm';
import Advantages from './Advantages';
import {motion} from "framer-motion";


function LandingPage() {
  const { user } = useAuth();
  const [tours, setTours] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [guests, setGuests] = useState(1);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [selectedTourId, setSelectedTourId] = useState(null);

  const userId = user?._id; 
  const {t,i18n} = useTranslation();

  const handleCardClick = (tourId) => {
    setSelectedTourId(tourId);
    setVisible(true);
  };

  const fetchTours = useCallback(async () => {
    try {
      const res = await axiosInstance.get(`/tours?page=${page}&limit=4`);
      setTours(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Error fetching tours:", err.message);
    }
  }, [page]);

  useEffect(() => {
    fetchTours();
  }, [fetchTours]);


  const handleBooking = async () => {
    setLoading(true);
    setShowResults(false);
  
    try {
      const res = await fetch('http://localhost:7070/api/tours?limit=1000');
      const data = await res.json();
      const allTours = Array.isArray(data.data) ? data.data : [];
  
      const filtered = allTours.filter((tour) => {
        const locationName = typeof tour.location === "string" ? tour.location.toLowerCase() : "";
        const startDates = Array.isArray(tour.startDates) ? tour.startDates : [];
  
        const matchesDestination = destination ? locationName.includes(destination.toLowerCase().trim()) : true;
        const matchesDate = date ? startDates.some(start => start && start.toString().startsWith(date)) : true;
        const matchesGuests = tour.maxGuests ? guests <= tour.maxGuests : true;
  
        return matchesDestination && matchesDate && matchesGuests;
      });
  
      setTours(filtered); 
      setShowResults(true); 
      navigate('/tour-list', { state: { tours: filtered } }); 
  
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };
  const float1 = {
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };
  
  const float2 = {
    animate: {
      y: [0, 20, 0],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };
  
  const float3 = {
    animate: {
      x: [0, -15, 0],
      y: [0, 10, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };
  const planeDrop = {
    initial: {
      y: -200,
      scale: 0.4,
      opacity: 0,
    },
    animate: {
      y: 0,
      scale: 1,
      opacity: 1,
      transition: {
        duration: 2,
        ease: "easeOut",
      }
    },
  };
  
  const planeFloat = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }
    }
  };
  
  

  return (
    <div className="home">
      <div className="container">
        <div className="home-floating_block">
        <section className="home-image" >
        <img src={mainimg} alt="Travel main banner" className='home-mainimg'/>
        <TourSearchForm
        destination={destination}
        setDestination={setDestination}
        date={date}
        setDate={setDate}
        guests={guests}
        setGuests={setGuests}
        handleBooking={handleBooking}
        loading={loading}
      />

      {showResults && tours.length > 0 && (
        <div className="tour-results">
          {tours.map((tour) => (
            <TourCard key={tour._id} tour={tour} />
          ))}
        </div>
      )}
        
        <div className="home-floating-container">

                <motion.img
                  src={balon}
                  alt="balon"
                  className="floating-imges img-balon"
                  initial={{ y: 200, scale: 0.6, opacity: 0 }}
                  animate={{
                    y: [200, 100, 50, 0, -15, 0],
                    x: [0, 5, -5, 0, 3, -3], // slight horizontal drift
                    scale: [0.6, 0.75, 0.85, 1, 1, 1],
                    opacity: [0, 0.3, 0.6, 1, 1, 1],
                  }}
                  transition={{
                    duration: 12,
                    ease: "easeOut",
                    times: [0, 0.2, 0.4, 0.6, 0.8, 1],
                    repeat: Infinity,
                  }}
                />
              <motion.img
                src={camera}
                alt="camera"
                className="floating-imges img-camera"
                initial={{ scale: 0.2 }} 
                animate={{ scale: [0.2, 1, 0.8, 1] }} 
                transition={{
                  duration: 7,     
                  repeat: Infinity,
                  ease: "easeIn",
                }}
              />
              <motion.img
                src={plane}
                alt="plane"
                className="floating-imges img-plane"
                variants={planeDrop}
                initial="initial"
                animate="animate"
              />


              <motion.img
                src={coffee}
                alt="coffee"
                className="floating-imges img-coffee"
                variants={float1}
                animate="animate"
              />

              <motion.img
                src={directionBoard}
                alt="direction board"
                className="floating-imges img-drn"
                variants={float2}
                animate="animate"
              />

              <motion.img
                src={durbu}
                alt="durbu"
                className="floating-imges img-durbu"
                variants={float3}
                animate="animate"
              />

              </div>


        </section>  
        </div>  

            <motion.section  className="tour-pagination"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}>
            <span className="pagination-theme">{t("pagination.title")}</span>
            <div className="tour-pagination-block">
              <button
                className="tour-pagination-next"
                onClick={() => setPage(p => Math.max(p - 1, 1))}
                disabled={page === 1}
              >
                {t("pagination.previous")}
              </button>

              <div className="pagination-cards">
                {Array.isArray(tours) && tours.map(tour => {
                  if (!tour) return null;
                  return (
                    <div className="pagination-card-container" key={tour._id}>
                      <div className="flip-card">
                        <div className="flip-card-inner">

                          <div className="flip-card-front">
                            <img
                              src={tour.imageUrls?.[0] || "/placeholder.jpg"}
                              alt={`Main ${tour.title}`}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                borderRadius: "8px",
                              }}
                            />
                            <div className="dark-overlay"></div>
                            <div className="card-front-text">
                              <h3>{tour.title?.[i18n.language] || tour.title?.en}</h3>
                              <hr />
                              <p>{tour.subtitle?.[i18n.language] || `$ ${tour.price}`}</p>
                            </div>
                          </div>

                          <div className="flip-card-back">
                            <Link
                              to={`/tour-details/${tour._id}`}
                              className="pagination-link"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {t("pagination.more")} <span>➔</span>
                            </Link>
                          </div>

                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                className="tour-pagination-next"
                onClick={() => setPage(p => Math.min(p + 1, totalPages))}
                disabled={page === totalPages}
              >
                {t("pagination.next")}
              </button>
            </div>
            <span className="pagination-quantity">
              Page {page} of {totalPages}
            </span>
            </motion.section>

            <motion.section
              className="advantages"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}>
                <Advantages />
            </motion.section> 

            <motion.section
              className="home-advertisment"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}>
              <Advertisment />
            </motion.section>

            <section className="our-resours">
                <ResourcesList />
            </section>

      </div>
    </div>
 

  
  )
}

export default LandingPage;
