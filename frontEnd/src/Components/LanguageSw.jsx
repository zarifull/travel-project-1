import React from "react";
import { useTranslation } from "react-i18next";
import '../../src/styles/Header.css';

function LanguageSwitcher({ compact = false }) {
  const { i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  return (
    <select
      value={i18n.language}
      onChange={(e) => changeLanguage(e.target.value)}
      className="lang-switcher"
    >
      {compact ? (
        <>
          <option value="en">EN</option>
          <option value="ru">RU</option>
          <option value="kg">KG</option>
        </>
      ) : (
        <>
          <option value="en">🇬🇧 English ▾</option>
          <option value="ru">🇷🇺 Русский ▾</option>
          <option value="kg">🇰🇬 Кыргыз ▾</option>
        </>
      )}
    </select>
  );
}

export default LanguageSwitcher;
