import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/CustomersCard.css";
import { getCommentsForCustomer } from "../api/customersDetailApi"; 

const CustomerCard = ({ customer, currentLang }) => {
  const [showAll, setShowAll] = useState(false);
  const [comments, setComments] = useState(customer.comments || []);

  const initialCount = 3;
  const commentsToShow = showAll ? comments : comments.slice(0, initialCount);

  useEffect(() => {
    const fetchComments = async () => {
      if (!customer?._id) return;
      try {
        const latestComments = await getCommentsForCustomer(customer._id);
        setComments(Array.isArray(latestComments) ? latestComments : []);
      } catch (err) {
        console.error("Failed to fetch comments:", err);
      }
    };
    fetchComments();
  }, [customer?._id]);
  
  return (
    <div className="customer-card">
      <div className="photo-gallery">
        {customer.photo?.slice(0, 3).map((img, i) => (
          <img key={i} src={img} alt="Customer" className="photo" />
        ))}
      </div>

      <div className="comment-section">
        {commentsToShow.map((comment, index) => {
          const firstLetter = comment.username
            ? comment.username.charAt(0).toUpperCase()
            : "?";

          const colors = [
            "#4dabf7",
            "#ffa94d",
            "#da77f2",
            "#63e6be",
            "#f783ac",
            "#f48fb1",
          ];
          const bgColor = colors[index % colors.length];

          return (
            <div key={index} className="comment-card">
              <div
                className="comment-avatar"
                style={{ backgroundColor: bgColor}}
              >
                {firstLetter}
              </div>
              <div className="comment-body">
                <p>
                  <strong style={{ color: bgColor, fontWeight: "bold" }}>
                    {comment.username || "Anonymous"}
                  </strong>{" "}
                  : {comment.text?.[currentLang] || comment.text?.en || ""}
                </p>
              </div>
            </div>
          );
        })}

        {comments.length > initialCount && (
          <button className="more-btn" onClick={() => setShowAll(!showAll)}>
            {showAll
              ? "Show less ↑"
              : `...... (${comments.length - initialCount})`}
          </button>
        )}
      </div>

      <Link to={`/customer-detail/${customer._id}`} className="more-btn-detail">
        more →
      </Link>
    </div>
  );
};

export default CustomerCard;
