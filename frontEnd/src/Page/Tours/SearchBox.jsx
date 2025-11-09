import React, { useState } from 'react';
import '../../styles/SearchBox.css';
import { FaSearch } from "react-icons/fa";
import { useTranslation } from 'react-i18next';

const SearchBox = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof onSearch === 'function') {
      onSearch(searchTerm);
    }
  };

  return (
    <form className='search-box' onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder={t("tour.searchTours")}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className='search-inp'
      />
      <button type="submit"
      className='search-btn'
      ><FaSearch className="search-icon" />
        </button>
    </form>
  );
};

export default SearchBox;
