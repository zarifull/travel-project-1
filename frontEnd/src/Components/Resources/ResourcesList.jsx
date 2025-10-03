import React, { useEffect, useState } from "react";
import { getResources } from "../../api/resourceApi";
import ResourceCard from "./ResourceCard";
import { useTranslation } from "react-i18next";


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

  return (
    <div className="">
    <p className="resours-mainTheme">{t("hubspotByNumbers")}</p>
    <div className="resours-block">
    {resources.map((res) => (
        <ResourceCard
            key={res._id}
            image={res.image}
            count={res.count}
            translations={res.translations}
            link={res.link}
        />
        ))}
    </div>
      </div>
  )
}

export default ResourcesList
