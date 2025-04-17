import React, { useState } from 'react';
import { searchLyrics } from '../services/api';

function SearchBar({ setSongs, setLoading, setError }) {
  const [query, setQuery] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const results = await searchLyrics(query);
      setSongs(results);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="w-full max-w-md mx-auto mb-8"
    >
      <div className="flex items-center border-b-2 border-green-500 py-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Entrez un titre ou un artiste"
          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
        />
        <button 
          type="submit"
          className="flex-shrink-0 bg-green-500 hover:bg-green-700 border-green-500 hover:border-green-700 text-sm border-4 text-white py-1 px-2 rounded"
          disabled={!query.trim()}
        >
          Rechercher
        </button>
      </div>
    </form>
  );
}

export default SearchBar;