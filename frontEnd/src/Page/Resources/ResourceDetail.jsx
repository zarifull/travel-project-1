import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getResourceDetails } from "../../api/resourceDetailApi";
import "../../styles/resourceDetails.css";
import { useTranslation } from "react-i18next";

const ResourceDetailPage = () => {
  const { id } = useParams();
  const [details, setDetails] = useState([]);
  const { i18n } = useTranslation();
  const lang = i18n.language;

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await getResourceDetails(id);
        setDetails(data);
      } catch (error) {
        console.error("Error fetching resource details:", error);
      }
    };
    fetchDetails();
  }, [id]);

  return (
    <div className="resource-details-container">
      {details.length === 0 ? (
        <p>No data available</p>
      ) : (
        details.map((detail) => (
          <div key={detail._id} className="resource-detail-card">
            <div className="photo-gallery">
              {detail.photo?.map((img, index) => (
                <img key={index} src={img} alt={detail.name?.[lang] || "Resource"} />
              ))}
            </div>

            {detail.photo?.url?.length > 0 && (
              <img
                src={Array.isArray(detail.logo.url) ? detail.logo.url[0] : detail.logo.url}
                alt={detail.logo?.alt?.[lang] || "Logo"}
                className="resource-logo"
              />
            )}

            <h3>{detail.name?.[lang]}</h3>
            <p>{detail.comment?.[lang]}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ResourceDetailPage;
