import React from "react";
import { Link } from "react-router-dom";
import "../../styles/NotFound.css";

const NotFound = () => {
  return (
    <div className="notfound-container">
      <h1>404</h1>
      <p>Page not found</p>
      <Link to="/" className="back-home">Go Home</Link>
    </div>
  );
};

export default NotFound;
