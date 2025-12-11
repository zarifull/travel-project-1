import React, { useEffect, useState } from "react";
import { getResources } from "../../api/resourceApi";
import ResourceCard from "../../Components/ResourceCard";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const ResourcesList = () => {
  const { t } = useTranslation();
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const data = await getResources();
        setResources(data);
      } catch (err) {
        setError("Failed to load resources");
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  if (loading) return <p>{t("loading")}...</p>;
  if (error) return <p className="error">{error}</p>;

  const getInitial = (index) => {
    switch (index) {
      case 0:
        return { opacity: 0, x: -100 }; 
      case 1:
        return { opacity: 0, y: -50 }; 
      case 2:
        return { opacity: 0, x: 100 }; 
      default:
        return { opacity: 0, y: 20 }; 
    }
  };

  return (
    <div className="">
      <p className="resours-mainTheme">{t("resources.hubspotByNumbers")}</p>
      <div className="resours-block">
        {resources.map((res, index) => (
          <motion.div
            key={res._id}
            initial={getInitial(index)}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <ResourceCard
              image={res.image}
              count={res.count}
              translations={res.translations}
              link={res.link}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ResourcesList;
