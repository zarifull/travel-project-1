import {React, useState , useEffect,useCallback} from 'react';
import '../styles/Home.css';
import balon from '../Assets/balon.png';
import camera from '../Assets/camera.png';
import coffee from '../Assets/coffee.png';
import directionBoard from '../Assets/directionBoard.png';
import durbu from '../Assets/durbu.png';
import plane from '../Assets/plane.png';
import balloon from '../Assets/balloon.png';
import ship from '../Assets/ship.png';
import Advertisment from './Advertisment';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaArrowRightLong } from "react-icons/fa6";
import TourCard from '../Components/TourCard';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../Context/AuthContext"; // Adjust path if different



function Home() {
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

  const userId = user?._id; // ✅ Safe access even if user is null

  const handleCardClick = (tourId) => {
    setSelectedTourId(tourId);
    setVisible(true);
  };

  const fetchTours = useCallback(async () => {
    try {
      const res = await axios.get(`http://localhost:7070/api/tours?page=${page}&limit=4`);
      setTours(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Error fetching tours:", err.message);
    }
  }, [page]);

  useEffect(() => {
    fetchTours();
  }, [fetchTours]);

  if (!user) return <div>Loading...</div>; 

const handleBooking = async () => {
  setLoading(true);
  setShowResults(false);

  try {
    const res = await fetch('http://localhost:7070/api/tours?limit=1000');
    const data = await res.json();

    const filtered = data.data.filter((tour) => {
      const matchesDestination = destination
        ? tour.location?.toLowerCase().includes(destination.toLowerCase())
        : true;

      const matchesDate = date
        ? Array.isArray(tour.startDates) &&
          tour.startDates.some((start) => start?.startsWith(date))
        : true;

      return matchesDestination && matchesDate;
    });

    navigate('/tour-list', { state: { tours: filtered } });

  } catch (err) {
    console.error('Search error:', err);
  } finally {
    setLoading(false);
  }
 
};

// tours.forEach(tour => {
//   console.log("Tour ID:", tour._id);
// });

  return (
    <div className="home">
      <div className="container">
        <div className="home-image">
        </div>
        
        <div className="booking">
      <div className="booking-theme">Booking</div>
      <div className="booking-block">
        <div className="booking-box">

          <div className="selects select1">
            <i className="fa-solid booking-icons select-icon1 fa-earth-americas"></i>
            <label htmlFor='destination' className='label'>Destination</label>
            <input
              type='text'
              placeholder='Where to ?'
              className="bValue booking-inp"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>

          <div className="selects select2">
            <i className="fa-solid booking-icons select-icon2 fa-calendar-days"></i>
            <label htmlFor='date' className="label">Date</label>
            <input
              type='date'
              className="bValue booking-date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="selects select3">
            <i className="fa-solid booking-icons fa-suitcase-rolling"></i>
            <label htmlFor='guests' className="label">Guests</label>
            <input
              type='number'
              min="1"
              placeholder='2 adults'
              className="bValue booking-guests"
              value={guests}
              onChange={(e) => setGuests(parseInt(e.target.value))}
            />
          </div>

          <div className="booking-search">
            <button className='booking-btn' onClick={handleBooking}>
              <i className="fa-solid booking-icon fa-magnifying-glass"></i>
            </button>
          </div>

        </div>
      </div>

      {loading && <p style={{ textAlign: 'center', color: '#5c7cfa' }}>Searching tours...</p>}

      {showResults && tours.length > 0 && (
          <div className="tour-results">
            {tours.map((tour) => (
              <TourCard key={tour._id} tour={tour} />
            ))}
          </div>
        )}

    </div>    
        
          <div className="home-floating-container">
            <img src={balon} alt="balon" className='floating-imges img-balon'  />
            <img src={camera} alt="camera" className='floating-imges img-camera' />
            <img src={plane} alt="plane"  className='floating-imges img-plane'/>
            <img src={coffee} alt="coffee" className='floating-imges img-coffee' />
            <img src={directionBoard} alt="direction board" className='floating-imges img-drn' />
            <img src={durbu} alt="durbu"className='floating-imges img-durbu' />
          </div>
          
  <section className="tour-pagination">
  <span className="pagination-theme">Available Tours</span>
  <div className="tour-pagination-block">
    <button
      className="tour-pagination-next"
      onClick={() => setPage(p => Math.max(p - 1, 1))}
      disabled={page === 1}
    >
      ⬅ Previous
    </button>

    <div className="pagination-cards">
    {Array.isArray(tours) && tours.map(tour => {
      // console.log("Tours in Home:", tours);

  if (!tour) return null; // skip undefined/null tours
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
            <h3>{tour.title}</h3>
            <hr />
            <p>{tour.subtitle || `$ ${tour.price}`}</p>
          </div>
        </div>
  
        <div className="flip-card-back">
          <Link
            to={`/tour-details/${tour._id}`}
            className="pagination-link"
            onClick={(e) => e.stopPropagation()}
          >
            MORE <FaArrowRightLong />
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
      Next ➡
    </button>
  </div>
  <span className="pagination-quantity">
    Page {page} of {totalPages}
  </span>
</section>



    <section className="advantages">
              <p className='adv-theme'>We got the Goods</p>
          <div className="adv-block">
                <div className="adv-box1 adv-boxes">
                      <svg  className='adv-img1 advimges' xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 512 512" width="64px" height="64px"><path d="M 407.7832 72.003906 A 8 8 0 0 0 405.73047 72.330078 L 54.839844 176 L 16 176 A 8 8 0 0 0 8 184 L 8 440 A 8 8 0 0 0 16 448 L 496 448 A 8 8 0 0 0 504 440 L 504 184 A 8 8 0 0 0 496 176 L 445.91016 176 L 415.65039 77.650391 A 8 8 0 0 0 407.7832 72.003906 z M 402.67969 89.910156 L 429.16992 176 L 111.31055 176 L 402.67969 89.910156 z M 24 192 L 384 192 L 384 208 A 8 8 0 0 0 400 208 L 400 192 L 456 192 L 456 432 L 400 432 L 400 424 A 8 8 0 0 0 384 424 L 384 432 L 24 432 L 24 192 z M 472 192 L 488 192 L 488 432 L 472 432 L 472 192 z M 189.61328 223.7832 A 25.849 25.849 0 0 0 172.09961 231.34375 L 151.06641 252.37695 L 101.61914 225.74805 A 8 8 0 0 0 92.169922 227.13672 L 75.34375 243.96484 A 8 8 0 0 0 75.935547 255.8125 L 115.36719 288.07617 L 92.144531 311.30078 L 67.199219 301.11133 A 8 8 0 0 0 58.519531 302.85938 L 41.6875 319.6875 A 8 8 0 0 0 43.228516 332.20508 L 83.582031 356.41797 L 107.80078 396.77148 A 8 8 0 0 0 120.31641 398.3125 L 137.14453 381.48242 A 8 8 0 0 0 138.89453 372.80273 L 128.69922 347.85547 L 151.92578 324.63281 L 184.18945 364.06445 A 8 8 0 0 0 196.03516 364.65625 L 212.86328 347.83008 A 8 8 0 0 0 214.25195 338.38086 L 187.625 288.93164 L 208.65625 267.90039 A 25.724 25.724 0 0 0 216.22852 249.60938 A 25.849 25.849 0 0 0 189.61328 223.7832 z M 391.76562 224.00391 A 8 8 0 0 0 384 232 L 384 256 A 8 8 0 0 0 392 264 A 8 8 0 0 0 400 256 L 400 232 A 8 8 0 0 0 391.76562 224.00391 z M 190.50977 239.73828 A 9.848 9.848 0 0 1 197.34375 256.58398 L 172.09961 281.82422 A 8 8 0 0 0 170.71289 291.27539 L 197.33984 340.72461 L 190.9707 347.09375 L 158.70703 307.6582 A 8 8 0 0 0 146.85742 307.06641 L 113.62695 340.30078 A 8 8 0 0 0 111.87695 348.98047 L 122.06641 373.92773 L 116.24219 379.75195 L 96.273438 346.4707 A 7.99 7.99 0 0 0 93.529297 343.72656 L 60.246094 323.75781 L 66.070312 317.93359 L 91.015625 328.12305 A 8 8 0 0 0 99.697266 326.37305 L 132.93359 293.14062 A 8 8 0 0 0 132.3418 281.29102 L 92.90625 249.02734 L 99.275391 242.6582 L 148.72461 269.28516 A 8 8 0 0 0 158.17578 267.89844 L 183.41602 242.65625 A 9.848 9.848 0 0 1 190.50977 239.73828 z M 240 240 A 8 8 0 0 0 232 248 L 232 296 A 8 8 0 0 0 240 304 L 360 304 A 8 8 0 0 0 368 296 L 368 248 A 8 8 0 0 0 360 240 L 240 240 z M 248 256 L 352 256 L 352 288 L 248 288 L 248 256 z M 391.76562 272.00391 A 8 8 0 0 0 384 280 L 384 304 A 8 8 0 0 0 392 312 A 8 8 0 0 0 400 304 L 400 280 A 8 8 0 0 0 391.76562 272.00391 z M 240 312 A 8 8 0 0 0 240 328 L 360 328 A 8 8 0 0 0 360 312 L 240 312 z M 391.76562 320.00391 A 8 8 0 0 0 384 328 L 384 352 A 8 8 0 0 0 392 360 A 8 8 0 0 0 400 352 L 400 328 A 8 8 0 0 0 391.76562 320.00391 z M 240 336 A 8 8 0 0 0 240 352 L 360 352 A 8 8 0 0 0 360 336 L 240 336 z M 240 360 A 8 8 0 0 0 240 376 L 280 376 A 8 8 0 0 0 280 360 L 240 360 z M 304 360 A 8 8 0 0 0 304 376 L 312 376 A 8 8 0 0 0 312 360 L 304 360 z M 391.76562 368.00391 A 8 8 0 0 0 384 376 L 384 400 A 8 8 0 0 0 392 408 A 8 8 0 0 0 400 400 L 400 376 A 8 8 0 0 0 391.76562 368.00391 z"/></svg>
                      <p>Ticket insurence</p>
                      <span className='adv-article'>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                      quisquam ab provident 
                      dignissimos recusandae.</span>
                </div>

                    <div className="adv-box2 adv-boxes">
                        <img src={balloon} alt=""  className='adv-img2 advimges' />
                        <p>Activities</p>
                        <span className='adv-article'>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        quisquam ab ab provident 
                        recusandae.</span>
                    </div>

                    <div className="adv-box3 adv-boxes">
                        <img src={ship} alt=""  className='adv-img3 advimges'  />
                        <p>Travel options</p>
                        <span className='adv-article'>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        quisquam ab provident ab provident 
                        dignissimos recusandae.</span>
                    </div>

                    <div className="adv-box4 adv-boxes">
                        <svg  className='adv-img4 advimges'  xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 100 100" width="100px" height="100px"><path d="M 32.582031 29 C 30.628031 29 28.820281 30.057812 27.863281 31.757812 L 12.130859 59.507812 C 12.117859 59.529812 12.118422 59.553172 12.107422 59.576172 C 11.427422 60.365172 11 61.379 11 62.5 C 11 64.981 13.019 67 15.5 67 L 16.302734 67 C 17.696734 73.839 23.756 79 31 79 C 39.271 79 46 72.271 46 64 C 46 63.662 45.971219 63.332 45.949219 63 L 46 63 C 46 60.794 47.794 59 50 59 C 52.206 59 54 60.794 54 63 L 54.050781 63 C 54.028781 63.332 54 63.662 54 64 C 54 72.271 60.729 79 69 79 C 76.244 79 82.303266 73.839 83.697266 67 L 84.5 67 C 86.981 67 89 64.981 89 62.5 C 89 61.379 88.572578 60.365172 87.892578 59.576172 C 87.881578 59.553172 87.882141 59.529812 87.869141 59.507812 L 72.138672 31.761719 C 71.180672 30.058719 69.371969 29 67.417969 29 C 64.430969 29 62 31.430969 62 34.417969 L 62 36 C 62 36.553 62.448 37 63 37 C 63.552 37 64 36.553 64 36 L 64 34.417969 C 64 32.533969 65.533969 31 67.417969 31 C 68.649969 31 69.791484 31.667141 70.396484 32.744141 L 84.728516 58.023438 C 84.651516 58.019438 84.579 58 84.5 58 L 83 58 C 82.916 58 82.839719 58.028828 82.761719 58.048828 C 80.452719 52.731828 75.156 49 69 49 C 63.579 49 58.834219 51.901656 56.199219 56.222656 C 55.027219 54.309656 52.69 53 50 53 C 47.31 53 44.972781 54.309656 43.800781 56.222656 C 41.165781 51.901656 36.421 49 31 49 C 24.844 49 19.547281 52.731828 17.238281 58.048828 C 17.160281 58.028828 17.084 58 17 58 L 15.5 58 C 15.421 58 15.348484 58.019437 15.271484 58.023438 L 29.605469 32.740234 C 30.209469 31.666234 31.350031 31 32.582031 31 C 34.466031 31 36 32.533969 36 34.417969 L 36 36 C 36 36.553 36.448 37 37 37 C 37.552 37 38 36.553 38 36 L 38 34.417969 C 38 31.430969 35.569031 29 32.582031 29 z M 31 51 C 38.168 51 44 56.832 44 64 C 44 71.168 38.168 77 31 77 C 23.832 77 18 71.168 18 64 C 18 56.832 23.832 51 31 51 z M 69 51 C 76.168 51 82 56.832 82 64 C 82 71.168 76.168 77 69 77 C 61.832 77 56 71.168 56 64 C 56 56.832 61.832 51 69 51 z M 31 54 C 25.486 54 21 58.486 21 64 C 21 69.514 25.486 74 31 74 C 36.514 74 41 69.514 41 64 C 41 58.486 36.514 54 31 54 z M 69 54 C 63.486 54 59 58.486 59 64 C 59 69.514 63.486 74 69 74 C 74.514 74 79 69.514 79 64 C 79 58.486 74.514 54 69 54 z M 31 55 C 35.962 55 40 59.037 40 64 C 40 68.963 35.962 73 31 73 C 26.038 73 22 68.963 22 64 C 22 59.037 26.038 55 31 55 z M 50 55 C 52.648 55 54.80175 56.660094 54.96875 58.746094 C 54.89375 58.945094 54.815047 59.142703 54.748047 59.345703 C 53.650047 57.921703 51.933 57 50 57 C 48.067 57 46.349953 57.921703 45.251953 59.345703 C 45.185953 59.142703 45.10625 58.945094 45.03125 58.746094 C 45.19825 56.660094 47.352 55 50 55 z M 69 55 C 73.962 55 78 59.037 78 64 C 78 68.963 73.962 73 69 73 C 64.038 73 60 68.963 60 64 C 60 59.037 64.038 55 69 55 z M 15.5 60 L 16.558594 60 C 16.204594 61.276 16 62.613 16 64 C 16 64.338 16.028781 64.668 16.050781 65 L 15.5 65 C 14.122 65 13 63.879 13 62.5 C 13 61.121 14.122 60 15.5 60 z M 83.441406 60 L 84.5 60 C 85.878 60 87 61.121 87 62.5 C 87 63.879 85.878 65 84.5 65 L 83.949219 65 C 83.971219 64.668 84 64.338 84 64 C 84 62.613 83.795406 61.276 83.441406 60 z"/></svg>
                        <p>Sightseeing</p>
                        <span className='adv-article'>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        quisquam ab  recusandae recusandae.</span>
                    </div>


                 
        </div>
        </section> 

       <section className="home-advertisment">
        <Advertisment />
       </section>

      </div>
    </div>
 

  
  )
}

export default Home
