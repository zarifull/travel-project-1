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
      const data = await getResourceDetails(id);
      setDetails(data);
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
            {detail.photo && <img src={detail.photo} alt={detail.name?.[lang]} />}
            <h3>{detail.name?.[lang]}</h3>
            <p>{detail.comment?.[lang]}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ResourceDetailPage;
