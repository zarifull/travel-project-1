import React, { useState, useEffect, useCallback, useMemo, Suspense } from "react";
import "../../styles/LandingPage.css";
import TourCard from "../../Components/TourCard";
import TourSearchForm from "./TourSearchForm";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import axiosInstance from "../../api/axiosInstance";
import { useTranslation } from "react-i18next";
import mainimg from "../../Assets/mainPhoto.png";
import { Link } from "react-router-dom";
import balon from "../../Assets/balon.png";
import camera from "../../Assets/camera.png";
import coffee from "../../Assets/coffee.png";
import directionBoard from "../../Assets/directionBoard.png";
import durbu from "../../Assets/durbu.png";
import plane from "../../Assets/plane.png";

const Advertisment = React.lazy(() => import("../../Components/Advertisment"));
const ResourcesList = React.lazy(() => import("../../Page/Resources/ResourcesList"));
const Advantages = React.lazy(() => import("./Advantages"));

function LandingPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [tours, setTours] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState(1);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const { t, i18n } = useTranslation();

  const float1 = useMemo(() => ({
    animate: { y: [0, -15, 0], transition: { duration: 4, repeat: Infinity, ease: "easeInOut" } }
  }), []);

  const float2 = useMemo(() => ({
    animate: { y: [0, 20, 0], transition: { duration: 5, repeat: Infinity, ease: "easeInOut" } }
  }), []);

  const float3 = useMemo(() => ({
    animate: { x: [0, -15, 0], y: [0, 10, 0], transition: { duration: 6, repeat: Infinity, ease: "easeInOut" } }
  }), []);

  const planeDrop = useMemo(() => ({
    initial: { y: -200, scale: 0.4, opacity: 0 },
    animate: { y: 0, scale: 1, opacity: 1, transition: { duration: 5, ease: "easeOut" } }
  }), []);

  const fetchTours = useCallback(async () => {
    try {
      const res = await axiosInstance.get(`/tours?page=${page}&limit=4`);
      setTours(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Error fetching tours:", err.message);
    }
  }, [page]);

  useEffect(() => { fetchTours(); }, [fetchTours]);

  const handleBooking = async () => {
    setLoading(true);
    setShowResults(false);
  
    try {
      const res = await axiosInstance.get('/tours', { params: { limit: 1000 } });
      const allTours = Array.isArray(res.data.data) ? res.data.data : [];
  
      const filtered = allTours.filter((tour) => {
        const locationName = String(tour.location || "").toLowerCase();
        const startDates = Array.isArray(tour.startDates) ? tour.startDates : [];
  
        const matchesDestination = destination
          ? locationName.includes(destination.toLowerCase().trim())
          : true;
  
        const matchesDate = date
          ? startDates.some(start => start && new Date(start).toISOString().startsWith(date))
          : true;
  
        const matchesGuests = tour.maxGuests
          ? guests <= tour.maxGuests
          : true;
  
        return matchesDestination && matchesDate && matchesGuests;
      });
  
      setTours(filtered);
      setShowResults(true);
  
      navigate('/tour-list', { state: { tours: filtered } });
  
    } catch (err) {
      console.error('Search error:', err);
      alert("Error fetching tours. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  
  
  return (
    <div className="home">
      <div className="container">
        <div className="home-floating_block">
          <section className="home-image">
            <img src={mainimg} loading="lazy" alt="" className="home-mainimg" />

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
                {tours.map((tour) => (<TourCard key={tour._id} tour={tour} />))}
              </div>
            )}

        <Suspense fallback={null}>
          <div className="home-floating-container">

          <motion.img
                        src={balon}
                        alt="balon"
                        className="floating-imges img-balon"
                        initial={{ y: 200, scale: 0.6, opacity: 0 }}
                        animate={{
                          y: [200, 100, 50, 0, -15, 0],
                          x: [0, 5, -5, 0, 3, -3],
                          scale: [0.6, 0.75, 0.85, 1, 1, 1],
                          opacity: [0, 0.3, 0.6, 1, 1, 1],
                        }}
                        transition={{
                          duration: 8,
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
                        transition={{ duration: 7, repeat: Infinity, ease: "easeIn" }}
                      />

            <motion.img
              src={plane}
              className="floating-imges img-plane"
              variants={planeDrop}
              initial="initial"
              animate="animate"
              alt="plane"
            />

            <motion.img
              src={coffee}
              className="floating-imges img-coffee"
              variants={float1}
              animate="animate"
              alt="coffee"
            />

            <motion.img
              src={directionBoard}
              className="floating-imges img-drn"
              variants={float2}
              animate="animate"
              alt="directionBoard"
            />

            <motion.img
              src={durbu}
              className="floating-imges img-durbu"
              variants={float3}
              animate="animate"
              alt="durbu"
            />

          </div>
        </Suspense>

          </section>
        </div>

        <motion.section className="tour-pagination" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <span className="pagination-theme">{t("pagination.title")}</span>
          <div className="tour-pagination-block">
            <button className="tour-pagination-next" onClick={() => setPage(p => Math.max(p-1,1))} disabled={page===1}>{t("pagination.previous")}</button>
            <div className="pagination-cards">
              {Array.isArray(tours) && tours.map(tour => tour && (
                <div className="pagination-card-container" key={tour._id}>
                  <div className="flip-card">
                    <div className="flip-card-inner">
                      <div className="flip-card-front">
                        <img src={tour.imageUrls?.[0] || "/placeholder.jpg"} alt={tour.title} style={{ width:"100%", height:"100%", objectFit:"cover", borderRadius:"8px" }}/>
                        <div className="dark-overlay"></div>
                        <div className="card-front-text">
                          <h3>{tour.title?.[i18n.language] || tour.title?.en}</h3>
                          <hr/>
                          <p>{tour.subtitle?.[i18n.language] || `$${tour.price}`}</p>
                        </div>
                      </div>
                      <div className="flip-card-back">
                        <Link to={`/tour-details/${tour._id}`} className="pagination-link">{t("pagination.more")} <span>➔</span></Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="tour-pagination-next" onClick={() => setPage(p => Math.min(p+1,totalPages))} disabled={page===totalPages}>{t("pagination.next")}</button>
          </div>
          <span className="pagination-quantity">Page {page} of {totalPages}</span>
        </motion.section>
              
        <motion.section className="advantages" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <Suspense fallback={<div>Loading...</div>}><Advantages /></Suspense>
        </motion.section>

        <Suspense fallback={<div>Loading...</div>}><motion.section className="home-advertisment"><Advertisment /></motion.section></Suspense>

        <Suspense fallback={<div>Loading...</div>}><section className="our-resours"><ResourcesList /></section></Suspense>
      </div>
    </div>
  );
}

export default LandingPage;
