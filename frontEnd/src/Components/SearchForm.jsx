import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function SearchForm() {
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [guests, setGuests] = useState(1);

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    navigate(`/tour-list?destination=${destination}&date=${date}&guests=${guests}`);
  };

  return (
    <form onSubmit={handleSearch}>
      <input type="text" placeholder="Where to?" value={destination} onChange={(e) => setDestination(e.target.value)} />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <input type="number" min="1" value={guests} onChange={(e) => setGuests(e.target.value)} />
      <button type="submit">
        <i className="fa fa-search"></i>
      </button>
    </form>
  );
}

export default SearchForm;
