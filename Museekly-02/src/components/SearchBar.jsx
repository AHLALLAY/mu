// src/components/SearchBar.jsx
import React, { useState } from 'react';
import { searchSongs } from '../services/api';
import { useSongContext } from '../context/SongContext';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const { setSearchResults, setLoading, setError } = useSongContext();

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!query.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const results = await searchSongs(query);
      setSearchResults(results);
    } catch (error) {
      setError("Erreur lors de la recherche. Veuillez réessayer.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          className="search-input"
          placeholder="Rechercher une chanson ou un artiste..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Rechercher
        </button>
      </form>
    </div>
  );
};

export default SearchBar;