import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getResourceDetailById, getCommentsForResourceDetail, addCommentToResourceDetail } from "../../api/resourceDetailApi";
import "../../styles/CustomerDetails.css";

const CustomerDetail = ({ currentLang = "en" }) => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const data = await getResourceDetailById(id);
        setCustomer(data);

        setComments(data.comments || []);
      } catch (error) {
        console.error("Error fetching customer details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomer();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const res = await addCommentToResourceDetail(id, {
        user: "Anonymous",
        text: { [currentLang]: newComment },
      });

      setComments(res.comments);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;
  if (!customer) return <p>Customer not found</p>;

  return (
    <div className="customer-detail-page">
    <h1 className="customer-title">Our Happy Customers</h1>

      <div className="customer-photos">
        {customer.photo?.map((img, i) => (
          <img key={i} src={img} alt={`Customer ${i + 1}`} className="customer-photo" />
        ))}
      </div>

      <div className="customer-comments">
        <h2>Comments ({comments.length})</h2>
        {comments.map((comment, i) => {
          const firstLetter = comment.user?.charAt(0).toUpperCase() || "?";
          const colors = [
            "#4dabf7",
            "#ffa94d",
            "#da77f2",
            "#63e6be",
            "#f783ac",
            "#f48fb1",
          ];
          const bgColor = colors[i % colors.length];

          return (
            <div key={i} className="comment">
              <div className="comment-avatar" style={{ backgroundColor: bgColor }}>
                {firstLetter}
              </div>
              <div className="comment-body">
                <strong style={{ color: bgColor }}>{comment.user || "Anonymous"}</strong> :{" "}
                {comment.text?.[currentLang] || comment.text?.en || ""}
              </div>
            </div>
          );
        })}

        <form onSubmit={handleCommentSubmit} className="comment-form">
          <input
            type="text"
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button type="submit">Post</button>
        </form>
      </div>
    </div>
  );
};

export default CustomerDetail;
