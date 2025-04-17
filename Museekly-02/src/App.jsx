// src/App.jsx
import React from 'react';
import { SongProvider, useSongContext } from './context/SongContext';
import SearchBar from './components/SearchBar';
import SongList from './components/SongList';
import SongDetails from './components/SongDetails';
import ErrorMessage from './components/ErrorMessage';
import Loading from './components/Loading';
import './assets/styles/main.css';

const App = () => {
  return (
    <SongProvider>
      <div className="app-container">
        <header className="app-header">
          <h1>LyricsFinder</h1>
          <p className="app-description">
            Recherchez et découvrez les paroles de vos chansons préférées
          </p>
          <SearchBar />
        </header>
        
        <AppContent />
      </div>
    </SongProvider>
  );
};

const AppContent = () => {
  const { loading, error, selectedSong } = useSongContext();

  return (
    <main className="app-content">
      {error && <ErrorMessage message={error} />}
      {loading ? (
        <Loading />
      ) : (
        <div className="content-container">
          <div className={`search-results ${selectedSong ? 'with-details' : ''}`}>
            <SongList />
          </div>
          
          {selectedSong && (
            <div className="song-details">
              <SongDetails />
            </div>
          )}
        </div>
      )}
    </main>
  );
};

export default App;