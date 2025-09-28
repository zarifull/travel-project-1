import React from "react";
import { useTranslation } from "react-i18next";

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  return (
    <select
      value={i18n.language}
      onChange={(e) => changeLanguage(e.target.value)}
      style={{
        border: "none",
        fontSize: "1em",
        background: "transparent",
        cursor: "pointer",
      }}
    >
      <option value="en">🇬🇧 En</option>
      <option value="ru">🇷🇺 Рус</option>
      <option value="kg">🇰🇬 Кг</option>
    </select>
  );
}

export default LanguageSwitcher;
