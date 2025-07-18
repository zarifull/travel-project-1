import React, { useState } from 'react';
import '../../styles/SearchBox.css';
import { FaSearch } from "react-icons/fa";

const SearchBox = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

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
        placeholder="Search tours..."
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
