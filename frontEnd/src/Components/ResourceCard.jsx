import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ResourceCard = ({ image, count, translations, link, resourceId }) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
  const {t} = useTranslation();

  const finalLink = link && link !== "" ? link : resourceId ? `/resource-details/${resourceId}` : "#";

  return (
    <div className="resours-box">
      <img className="resours-img" src={image} alt={translations[currentLang]} />
      <p className="resours-theme">+ {count} {translations[currentLang]}</p>
      <Link to={finalLink}>
       {t("resources.learnMore")} <span>➔</span>
      </Link>
    </div>
  );
};

export default ResourceCard;
