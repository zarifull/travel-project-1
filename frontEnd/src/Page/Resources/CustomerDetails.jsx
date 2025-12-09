import React, { useState, useEffect } from "react";
import { useAuth } from "../../Context/AuthContext";
import { useParams } from "react-router-dom";
import {
  getCustomerById,
  addCommentToCustomer,
  replyToComment,
  deleteCommentFromCustomer,
  deleteReplyFromComment,
} from "../../api/customersDetailApi";
import "../../styles/CustomerDetails.css";
import { FaTrashAlt } from "react-icons/fa";
import { FaReply } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const CustomerDetail = ({ currentLang = "en" }) => {
  const { user: currentUser } = useAuth();
  const { id } = useParams();

  const [newComment, setNewComment] = useState("");
  const [replyText, setReplyText] = useState({});
  const [activeReplyId, setActiveReplyId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [customer, setCustomer] = useState({ photo: [], comments: [] });
  const [comments, setComments] = useState([]);
  const { t } = useTranslation();

  const colors = ["#4dabf7", "#ffa94d", "#da77f2", "#63e6be", "#f783ac", "#f48fb1"];

  useEffect(() => {
    fetchCustomer();
  }, [id]);

  const fetchCustomer = async () => {
    try {
      setLoading(true);
      const data = await getCustomerById(id);
      setCustomer(data);
      setComments(data.comments || []);
    } catch (error) {
      console.error("Error fetching customer details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const tempComment = {
      user: currentUser._id,
      username: currentUser.username,
      text: { [currentLang]: newComment },
      createdAt: new Date(),
      replies: [],
    };

    setComments([tempComment, ...comments]);
    setNewComment("");

    try {
      const res = await addCommentToCustomer(id, { text: { [currentLang]: newComment } });
      setComments(res.comments);
    } catch (error) {
      console.error("Error adding comment:", error);
      fetchCustomer();
    }
  };

  const handleReplySubmit = async (commentId) => {
    if (!replyText[commentId]?.trim()) return;

    try {
      const res = await replyToComment(id, commentId, {
        text: { [currentLang]: replyText[commentId] },
        createdAt: new Date(),
      });
      setComments(res.comments || []);
      setReplyText({ ...replyText, [commentId]: "" });
      setActiveReplyId(null);
    } catch (error) {
      console.error("Error replying to comment:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Delete this comment?")) return;
    try {
      await deleteCommentFromCustomer(id, commentId);
      fetchCustomer();
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleDeleteReply = async (commentId, replyId) => {
    if (!window.confirm("Delete this reply?")) return;
    try {
      await deleteReplyFromComment(id, commentId, replyId);
      fetchCustomer();
    } catch (error) {
      console.error("Error deleting reply:", error);
    }
  };

  if (loading) return <p style={{ textAlign: "center" }}>{t("common.loading")}</p>;
  if (!customer) return <p>{t("customers.customerNotFound")}</p>;

  return (
    <motion.div
      className="customer-detail-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container">
        <motion.h3
          className="customer-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {customer.name?.[currentLang] || customer.name?.en || "Our trip was nice"}
        </motion.h3>

        <motion.div
          className="customer-photos"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          {(customer.photo || []).map((imgObj, i) => (
            <motion.div
              key={i}
              className="customer-photo-box"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={typeof imgObj === "string" ? imgObj : imgObj.url}
                alt={`Customer ${i + 1}`}
                className="customer-photo"
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="customer-comments"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <h2>{t("customers.comments")} ({comments.length})</h2>

          {comments.map((comment, i) => {
            const bgColor = colors[i % colors.length];
            const firstLetter = comment.username?.charAt(0)?.toUpperCase() || "?";

            const canDeleteComment =
              currentUser?.role === "admin" ||
              comment.user === currentUser?._id ||
              comment.username === currentUser?.username;

            return (
              <motion.div
                key={comment._id || `temp-comment-${i}`}
                className="comment-box"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="comment-user-name">
                  <div className="comment-avatar" style={{ backgroundColor: bgColor }}>
                    {firstLetter}
                  </div>
                  <strong style={{ color: bgColor }}>{comment.username}</strong>
                </div>

                <p className="comment-text">
                  {comment.text?.[currentLang] || comment.text?.en || ""}
                </p>

                <div className="comment-btn-block">
                  <p className="comment-date">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </p>

                  {canDeleteComment && (
                    <motion.button
                      className="comment-delete"
                      onClick={() => handleDeleteComment(comment._id)}
                      whileHover={{ scale: 1.2, rotate: 5 }}
                    >
                      <FaTrashAlt />
                    </motion.button>
                  )}

                  <motion.button
                    className="reply-toggle-btn"
                    onClick={() =>
                      setActiveReplyId(activeReplyId === comment._id ? null : comment._id)
                    }
                    whileHover={{ scale: 1.1, rotate: -5 }}
                  >
                    {activeReplyId === comment._id ? "X" : <FaReply />}
                  </motion.button>
                </div>

                {activeReplyId === comment._id && (
                  <motion.div
                    className="reply-form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <input
                      type="text"
                      placeholder="Write a reply..."
                      value={replyText[comment._id] || ""}
                      onChange={(e) =>
                        setReplyText({ ...replyText, [comment._id]: e.target.value })
                      }
                    />
                    <button onClick={() => handleReplySubmit(comment._id)}
                      className="send-btn"><IoSend />
                    </button>
                  </motion.div>
                )}

                <div className="reply-section">
                  {(comment.replies || []).map((reply, j) => {
                    const canDeleteReply =
                      currentUser?.role === "admin" ||
                      reply.user === currentUser?._id ||
                      reply.username === currentUser?.username;

                    const firstLetter = reply.username?.charAt(0)?.toUpperCase() || "?";
                    const replyBg = "#a1c4fd";

                    return (
                      <motion.div
                        key={reply._id || `temp-reply-${j}`}
                        className="reply-box"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: j * 0.05, duration: 0.4 }}
                        whileHover={{ scale: 1.01 }}
                      >
                        <div className="comment-user-name">
                          <div
                            className="comment-avatar"
                            style={{ backgroundColor: replyBg }}
                          >
                            {firstLetter}
                          </div>
                          <strong>{reply.username}</strong>
                        </div>

                        <p className="comment-text">
                          {reply.text?.[currentLang] || reply.text?.en || ""}
                        </p>

                        <div className="comment-btn-block">
                          <p className="reply-date">
                            {new Date(reply.createdAt).toLocaleDateString()}
                          </p>

                          {canDeleteReply && (
                            <motion.button
                              className="delete-reply-btn"
                              onClick={() => handleDeleteReply(comment._id, reply._id)}
                              whileHover={{ scale: 1.2, rotate: 5 }}
                            >
                              <FaTrashAlt />
                            </motion.button>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}

          <motion.form
            onSubmit={handleCommentSubmit}
            className="comment-form"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <input
              type="text"
              placeholder={t("customers.writeComment")}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button type="submit" className="comment-send"><IoSend /></button>
          </motion.form>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CustomerDetail;
