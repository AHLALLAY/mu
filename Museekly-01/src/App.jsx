import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import SongList from './components/SongList';
import SongDetails from './components/SongDetails';

function App() {
  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-8">
          Recherche de Paroles
        </h1>
        
        <div className="mb-8">
          <SearchBar 
            setSongs={setSongs} 
            setLoading={setLoading} 
            setError={setError} 
          />
        </div>
        
        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-600"></div>
            <p className="mt-2 text-gray-600">Chargement en cours...</p>
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error.message || "Une erreur est survenue"}</p>
              </div>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {songs.length > 0 && (
            <div className="lg:col-span-1">
              <SongList 
                songs={songs} 
                setSelectedSong={setSelectedSong} 
              />
            </div>
          )}
          
          {selectedSong && (
            <div className="lg:col-span-2">
              <SongDetails song={selectedSong} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;