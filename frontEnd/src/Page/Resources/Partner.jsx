import React, { useEffect, useState } from "react";
import "../../styles/Partner.css";
import { getResourceDetails } from "../../api/resourceDetailApi";
import { useTranslation } from "react-i18next";

const Partner = () => {
  const [photos, setPhotos] = useState([]);
  const [partnerName, setPartnerName] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const {t} = useTranslation();
  const resourceId = "68df34eb32660943bbb4e7be"; 

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const data = await getResourceDetails(resourceId);
        console.log("Fetched partner data:", data);

        if (Array.isArray(data.photo) && data.photo.length > 0) {
          setPhotos(data.photo);
        }

        if (data.name) {
          setPartnerName(data.name);
        }
      } catch (error) {
        console.error("Failed to fetch partners data", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPartners();
  }, []);

  return (
    <div className="partner-page">
      <section className="partner-hero">
        <h1 className="partner-title">
          {t("partners.title")}
        </h1>
      </section>

      {isLoading ? (
        <p style={{ textAlign: "center" }}>{t("partners.loading")}</p>
      ) : (
        <>
          <p className="partner-subtitle">
          {t("partners.subtitle")}
          </p>

          <section className="partner-logos">
            {photos.length > 0 ? (
              photos.map((photo, i) => (
                <div key={i} className="partner-card">
                  <img
                    src={photo}
                    alt={`Partner ${i + 1}`}
                    className="partner-logo"
                  />
                </div>
              ))
            ) : (
              <p style={{ textAlign: "center" }}>{t("partners.noPhotos")}</p>
            )}
          </section>

          <section className="partner-info">
            <h2>{t("partners.whyTitle")}</h2>
            <p>
              {t("partners.whyText")}
            </p>
          </section>
        </>
      )}
    </div>
  );
};

export default Partner;
