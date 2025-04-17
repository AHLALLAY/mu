// src/components/SongDetails.jsx
import React from 'react';
import { useSongContext } from '../context/SongContext';
import AudioPlayer from './AudioPlayer';

const SongDetails = () => {
  const { selectedSong, lyrics, loading } = useSongContext();

  if (loading) {
    return <div className="loading">Chargement des paroles...</div>;
  }

  if (!selectedSong) {
    return null;
  }

  return (
    <div className="song-details-container">
      <div className="song-header">
        <div className="song-image-large">
          <img 
            src={selectedSong.album.cover_big || selectedSong.album.cover_medium || '/default-album.png'} 
            alt={selectedSong.album.title} 
          />
        </div>
        <div className="song-meta">
          <h1>{selectedSong.title}</h1>
          <h2>{selectedSong.artist.name}</h2>
          <p>Album: {selectedSong.album.title}</p>
          {selectedSong.preview && <AudioPlayer previewUrl={selectedSong.preview} />}
        </div>
      </div>
      
      <div className="lyrics-container">
        <h3>Paroles</h3>
        {lyrics ? (
          <pre className="lyrics">{lyrics}</pre>
        ) : (
          <p>Paroles non disponibles pour cette chanson.</p>
        )}
      </div>
    </div>
  );
};

export default SongDetails;