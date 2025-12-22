import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { toast } from "react-toastify";
import "../../styles/ManageTours.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Loading from "../../Components/Loading.jsx";

const ManageTours = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await axiosInstance.get("/tours");
        setTours(res.data.data || res.data);
      } catch (err) {
        console.error("Failed to fetch tours:", err);
        toast.error("Failed to load tours");
      } finally {
        setLoading(false);
      }
    };
    fetchTours();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm(t("common.confirmDeleteTour")))
    return;

    try {
      await axiosInstance.delete(`/tours/${id}`);
      setTours((prev) => prev.filter((tour) => tour._id !== id));
      toast.success("Tour deleted successfully");
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete tour");
    }
  };

  if (loading) return <Loading text={t("common.fetchingData")} />;

  return (
    <div className="admin-dashboard">
      <p className="manage-theme" style={{ paddingBottom: "0.5em" }}>
        {t("admin.manageTours")}
      </p>

      <Link to={`/add-tour`} className="add-btn">+ {t("manage.addTours")}</Link>

      {tours.length === 0 ? (
        <p>No tours found</p>
      ) : (
        <table className="tours-table">
          <thead>
            <tr>
              <th>#</th>
              <th>{t("tour.name")}</th>
              <th>{t("tour.location")}</th>
              <th>{t("tour.price")}</th>
              <th>{t("manage.actions")}</th>
            </tr>
          </thead>

          <tbody>
            {tours.map((tour, index) => (
              <tr key={tour._id}>
                <td>{index + 1}</td>
                <td>{tour.title?.[currentLang] || "-"}</td>
                <td>{tour.location?.[currentLang] || "-"}</td>
                <td>${tour.price}</td>

                <td>
                  <Link to={`/tour-details/${tour._id}`}>
                    <button className="detail-btn">{t("tour.details")}</button>
                  </Link>

                  <Link to={`/edit-tour/${tour._id}`}>
                    <button className="edit-btn">{t("common.edit")}</button>
                  </Link>

                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(tour._id)}
                  >
                    {t("common.delete")}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageTours;
