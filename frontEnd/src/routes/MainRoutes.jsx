import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import React from 'react';
import Home from '../Static/Home';
import AboutUs from '../Static/AboutUs';
import Contacts from '../Static/Contacts';
import ToursList from '../Page/Tours/ToursList';
import Advertisment from '../Static/Advertisment';
import AddTour from '../Page/Tours/AddTour';
import TourDetails from '../Page/Tours/TourDetails';
import EditTour from '../Page/Tours/EditTour';
import SearchBox from '../Page/Tours/SearchBox';
import Signup from '../Page/Auth/Signup';
import Login from '../Page/Auth/Login';
import Profile from '../Static/Profile';
import ForgotPassword from '../Page/Auth/forgotPassword';
import PasswordSuccess from '../Page/Auth/PasswordSucces';
import ResetPassword from '../Page/Auth/ResetPassword';
import VerifyOtp from '../Page/Auth/VerifyOtp';
import PrivateRoute from './Privateroute';
import UserProfile from '../Page/User/UserProfile';
import UserBookings from '../Page/User/UserBookings';
import BookingPage from '../Static/BookinPage';
import SearchForm from '../Components/SearchForm';
import AdminDashboard from '../Page/Admin/AdminDashboard';
import TotalUsers from '../Page/Admin/TotalUsers';

function Main({ user, setUser }) {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    fetch('http://localhost:7070/api/tours?limit=1000')
      .then((res) => res.json())
      .then((data) => setTours(data.data))
      .catch((err) => console.log('Турларды алуу ката:', err));
  }, []);
  

  return (
    <>
      {/* {user && <Navbar user={user} setUser={setUser} />} */}
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Home  tours={tours} />} />
        <Route path="/search-bar" element={<SearchBox />} />
        <Route path="/tour-list" element={<ToursList tours={tours} />} />
        <Route path="/advertisment" element={<Advertisment />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/add-tour" element={<AddTour />} />
        <Route path="/tour-details/:id" element={<TourDetails tours={tours} />} />
        <Route path="/edit-tour/:id" element={<EditTour tours={tours} />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/password-success" element={<PasswordSuccess />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/auth/reset-password" element={<ResetPassword />} />
        <Route path="/auth/verify-otp" element={<VerifyOtp />} />
        <Route path="/my-profile" element={<UserProfile  setUser={setUser}  />} />
        <Route path="/my-bookings" element={<UserBookings />} />
        <Route path="/booking-page/:tourId" element={<BookingPage/>} />
        <Route path="/search-form" element={<SearchForm/>} />
        <Route path="/admin/dashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
        <Route path="/total-users" element={<PrivateRoute><TotalUsers /></PrivateRoute>} />
        


        <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      </Routes>
    </>
  );
}

export default Main;
