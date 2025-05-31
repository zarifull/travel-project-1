import './DeleteTour.css';
import axios from "axios";
import React, { useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';

const DeleteTour = () => {
  const { id } = useParams(); // ✅ get the id from the route
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      alert('No ID provided');
      return;
    }

    const handleDelete = async () => {
      try {
        console.log('Deleting tour with ID:', id);
        const response = await axios.delete(`http://localhost:7070/api/tours/${id}`);
        alert(response.data.message);
        navigate('/tours'); // ✅ go back or refresh tours page
      } catch (error) {
        alert('Delete failed: ' + (error.response?.data?.message || error.message));
      }
    };

    handleDelete();
  }, [id, navigate]);

  return (
    <div className="delete-tour">
      <p>Deleting tour...</p>
    </div>
  );
};

export default DeleteTour;
