import { Routes, Route } from "react-router-dom";
import { useState, useEffect, Suspense, lazy } from "react";
import React from "react";
import PrivateRoute from "./Privateroute";
import NotFound from "../Page/NotFound/notFound";
import axiosInstance from "../api/axiosInstance";

const LandingPage = lazy(() => import("../Static/LandingPage/LandingPage"));
const ToursList = lazy(() => import("../Page/Tours/ToursList"));
const TourDetails = lazy(() => import("../Page/Tours/TourDetails"));
const AboutUs = lazy(() => import("../Static/AboutUs"));
const Contacts = lazy(() => import("../Static/Contacts"));
const Advertisment = lazy(() => import("../Components/Advertisment"));

const AddTour = lazy(() => import("../Page/Tours/AddTour"));
const EditTour = lazy(() => import("../Page/Tours/EditTour"));
const SearchBox = lazy(() => import("../Page/Tours/SearchBox"));
const SearchForm = lazy(() => import("../Components/SearchForm"));

const Signup = lazy(() => import("../Page/Auth/Signup"));
const Login = lazy(() => import("../Page/Auth/Login"));
const ForgotPassword = lazy(() => import("../Page/Auth/forgotPassword"));
const PasswordSuccess = lazy(() => import("../Page/Auth/PasswordSucces"));
const ResetPassword = lazy(() => import("../Page/Auth/ResetPassword"));
const VerifyOtp = lazy(() => import("../Page/Auth/VerifyOtp"));

const Profile = lazy(() => import("../Static/Profile"));
const UserProfile = lazy(() => import("../Page/User/UserProfile"));
const UserBookings = lazy(() => import("../Page/User/UserBookings"));
const BookingPage = lazy(() => import("../Static/BookinPage"));

const AdminDashboard = lazy(() => import("../Page/Admin/AdminDashboard"));
const TotalUsers = lazy(() => import("../Page/Admin/ManageUsers"));
const TotalTours = lazy(() => import("../Page/Admin/ManageTours"));
const TotalBookings = lazy(() => import("../Page/Admin/ManageBookings"));
const AdminSettings = lazy(() => import("../Page/Admin/AdminSettings"));
const ManageResources = lazy(() => import("../Page/Admin/ManageResources"));
const ManageResourceDetails = lazy(() => import("../Page/Admin/ManageResourceDetails"));
const ManageCustomers = lazy(() => import("../Page/Admin/ManageCustomers"));

const Partner = lazy(() => import("../Page/Resources/Partner"));
const CustomerList = lazy(() => import("../Page/Resources/CustomerList"));
const CustomerDetails = lazy(() => import("../Page/Resources/CustomerDetails"));
const AddCustomerDetail = lazy(() => import("../Page/Resources/AddCustomerDeatil"));
const ResourceDetails = lazy(() => import("../Page/Resources/ResourceDetail"));

const Loader = () => (
  <p style={{ textAlign: "center", marginTop: "30px" }}>Loading...</p>
);

const Main = ({ user, setUser }) => {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await axiosInstance.get("/tours?limit=1000");
        setTours(res.data.data); 
      } catch (err) {
        console.error("Error fetching tours:", err);
      }
    };
  
    fetchTours();
  }, []);

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<LandingPage tours={tours} />} />

        <Route path="/search-bar" element={<SearchBox />} />
        <Route path="/tour-list" element={<ToursList tours={tours} />} />
        <Route path="/advertisment" element={<Advertisment />} />

        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contacts" element={<Contacts />} />

        <Route path="/add-tour" element={<AddTour />} />
        <Route path="/edit-tour/:id" element={<PrivateRoute><EditTour /></PrivateRoute>} />

        <Route path="/tour-details/:id" element={<TourDetails tours={tours} />} />

        <Route path="/signup" element={<Signup setUser={setUser} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/password-success" element={<PasswordSuccess />} />
        <Route path="/auth/reset-password" element={<ResetPassword />} />
        <Route path="/auth/verify-otp" element={<VerifyOtp />} />

        <Route path="/my-profile" element={<UserProfile setUser={setUser} />} />
        <Route path="/my-bookings" element={<UserBookings />} />

        <Route path="/booking-page/:id" element={<BookingPage />} />
        <Route path="/search-form" element={<SearchForm />} />

        <Route path="/admin/dashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
        <Route path="/total-users" element={<PrivateRoute><TotalUsers /></PrivateRoute>} />
        <Route path="/total-tours" element={<PrivateRoute><TotalTours /></PrivateRoute>} />
        <Route path="/total-bookings" element={<PrivateRoute><TotalBookings /></PrivateRoute>} />
        <Route path="/admin-settings" element={<PrivateRoute><AdminSettings /></PrivateRoute>} />
        <Route path="/manage-resources" element={<PrivateRoute><ManageResources /></PrivateRoute>} />
        <Route path="/manage-resourceDetails" element={<ManageResourceDetails />} />
        <Route path="/manage-customers" element={<ManageCustomers />} />

        <Route path="/resources/partners" element={<Partner />} />
        <Route path="/resources/customers-list" element={<CustomerList />} />
        <Route path="/customer-detail/:id" element={<CustomerDetails />} />
        <Route path="/add-customer-detail" element={<AddCustomerDetail />} />
        <Route path="/resource-details" element={<ResourceDetails />} />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default Main;
