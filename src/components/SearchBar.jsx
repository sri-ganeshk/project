import React from 'react';

const SearchBar = ({ searchMovies, setSearchMovies, onSearch }) => {
  const handleSearch = (e) => {
    setSearchMovies(e.target.value);
    onSearch();
  };

  return (
    <input
      type="text"
      placeholder="Search for movies..."
      value={searchMovies}
      onChange={handleSearch}
      className="w-full px-4 py-2 rounded-md text-black text-lg"
    />
  );
};

export default SearchBar;
