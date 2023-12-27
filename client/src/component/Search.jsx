import { CiSearch } from 'react-icons/ci';
import { blackIcon } from '../styles/icon';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Search() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?query=${searchQuery}`);
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="hidden md:flex w-1/2 bg-orange-100 items-center px-2 rounded-full h-10"
    >
      <CiSearch className={blackIcon} onClick={handleSubmit} />
      <input
        type="text"
        value={searchQuery}
        placeholder="Search"
        className="pl-8 pr-2 py-1 rounded bg-transparent flex-1 focus:outline-none"
        onChange={handleInputChange}
      />
    </form>
  );
}

export default Search;
