import React, { useEffect, useState } from "react";
import "../../styles/Partner.css";
import { getResourceDetails } from "../../api/resourceDetailApi";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const Partner = () => {
  const [photos, setPhotos] = useState([]);
  const [partnerName, setPartnerName] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();
  const resourceId = "68df34eb32660943bbb4e7be";

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const data = await getResourceDetails(resourceId);

        if (Array.isArray(data.photo)) setPhotos(data.photo);
        if (data.name) setPartnerName(data.name);
      } catch (error) {
        console.error("Failed to fetch partners data", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPartners();
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
    }),
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 },
    },
  };

  return (
    <div className="partner-page">
      <div className="container">
        <motion.section
          className="partner-hero"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <h1 className="partner-title">{t("partners.title")}</h1>
        </motion.section>

        {isLoading ? (
          <motion.p
            className="partner-loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {t("partners.loading")}
          </motion.p>
        ) : (
          <>
            <motion.p
              className="partner-subtitle"
              initial="hidden"
              animate="visible"
              variants={fadeUp}
            >
              {t("partners.subtitle")}
            </motion.p>

            <motion.section
              className="partner-logos"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              {photos.length > 0 ? (
                photos.map((photo, i) => (
                  <motion.div
                    key={i}
                    className="partner-card"
                    custom={i}
                    variants={fadeUp}
                  >
                    <img
                      src={photo}
                      alt={`Partner ${i + 1}`}
                      className="partner-logo"
                    />
                  </motion.div>
                ))
              ) : (
                <p className="partner-no-photos">{t("partners.noPhotos")}</p>
              )}
            </motion.section>

            <motion.section
              className="partner-info"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
            >
              <h2>{t("partners.whyTitle")}</h2>
              <p>{t("partners.whyText")}</p>
            </motion.section>
          </>
        )}
      </div>
    </div>
  );
};

export default Partner;
