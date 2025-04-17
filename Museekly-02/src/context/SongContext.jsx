// src/context/SongContext.jsx
import React, { createContext, useState, useContext } from 'react';

const SongContext = createContext();

export const useSongContext = () => useContext(SongContext);

export const SongProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [lyrics, setLyrics] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const playSong = (previewUrl) => {
    // Arrêter l'audio en cours s'il y en a un
    if (currentAudio) {
      currentAudio.pause();
    }
    
    if (previewUrl) {
      const audio = new Audio(previewUrl);
      setCurrentAudio(audio);
      audio.play();
      setIsPlaying(true);
      
      audio.addEventListener('ended', () => {
        setIsPlaying(false);
      });
    }
  };

  const pauseSong = () => {
    if (currentAudio) {
      currentAudio.pause();
      setIsPlaying(false);
    }
  };

  const value = {
    searchResults,
    setSearchResults,
    selectedSong,
    setSelectedSong,
    lyrics,
    setLyrics,
    isPlaying,
    setIsPlaying,
    currentAudio,
    setCurrentAudio,
    playSong,
    pauseSong,
    loading,
    setLoading,
    error,
    setError
  };

  return <SongContext.Provider value={value}>{children}</SongContext.Provider>;
};