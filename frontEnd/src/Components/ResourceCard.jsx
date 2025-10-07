import React from 'react';
import { FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ResourceCard = ({image,count,translations}) => {
    const { i18n } = useTranslation();
    const currentLang = i18n.language; 
  return (
    <>
    <div className="resours-box">
      <img className="resours-img" src={image} alt={translations[currentLang]} />
      <p className="resours-theme">+ {count} {translations[currentLang]} </p>
      <Link to="/">
        Learn more <FaArrowRight className="link-icon" />
      </Link>
    </div>
    </>
  )
}

export default ResourceCard
