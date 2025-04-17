// src/components/SongList.jsx
import React from 'react';
import { useSongContext } from '../context/SongContext';
import { getLyrics } from '../services/api';

const SongList = () => {
  const { 
    searchResults, 
    setSelectedSong, 
    setLyrics, 
    playSong, 
    isPlaying, 
    currentAudio, 
    pauseSong,
    setLoading,
    setError
  } = useSongContext();

  const handleSongSelect = async (song) => {
    setSelectedSong(song);
    setLoading(true);
    
    try {
      const lyricsData = await getLyrics(song.artist.name, song.title);
      setLyrics(lyricsData);
    } catch (error) {
      setError("Impossible de récupérer les paroles. Veuillez réessayer.");
      setLyrics("Paroles non disponibles pour cette chanson.");
    } finally {
      setLoading(false);
    }
  };

  const handlePlayPause = (e, song) => {
    e.stopPropagation(); // Empêcher le déclenchement de handleSongSelect
    
    if (isPlaying && currentAudio && song.preview === currentAudio.src) {
      pauseSong();
    } else {
      playSong(song.preview);
    }
  };

  if (!searchResults || searchResults.length === 0) {
    return <p className="no-results">Aucun résultat à afficher. Effectuez une recherche.</p>;
  }

  return (
    <div className="song-list-container">
      <h2>Résultats de recherche</h2>
      <ul className="song-list">
        {searchResults.map((song) => (
          <li key={song.id} className="song-item" onClick={() => handleSongSelect(song)}>
            <div className="song-image">
              <img src={song.album.cover_medium || '/default-album.png'} alt={song.album.title} />
            </div>
            <div className="song-info">
              <h3>{song.title}</h3>
              <p>{song.artist.name}</p>
              <p>Album: {song.album.title}</p>
            </div>
            {song.preview && (
              <button 
                className="play-button" 
                onClick={(e) => handlePlayPause(e, song)}
              >
                {isPlaying && currentAudio && song.preview === currentAudio.src ? 'Pause' : 'Écouter'}
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SongList;