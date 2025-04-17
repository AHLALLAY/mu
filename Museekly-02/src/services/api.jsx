// src/services/api.js
const API_BASE_URL = 'https://api.lyrics.ovh'; // API gratuite pour les paroles
const DEEZER_API = 'https://api.deezer.com'; // Pour les informations sur les chansons et l'aperçu audio

export const searchSongs = async (query) => {
  try {
    // Pour cet exemple, nous allons rechercher via l'API Deezer
    const response = await fetch(`${DEEZER_API}/search?q=${encodeURIComponent(query)}`);
    
    if (!response.ok) {
      throw new Error(`Erreur réseau: ${response.status}`);
    }
    
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Erreur lors de la recherche:', error);
    throw error;
  }
};

export const getLyrics = async (artist, title) => {
  try {
    const response = await fetch(`${API_BASE_URL}/v1/${encodeURIComponent(artist)}/${encodeURIComponent(title)}`);
    
    if (!response.ok) {
      throw new Error(`Erreur lors de la récupération des paroles: ${response.status}`);
    }
    
    const data = await response.json();
    return data.lyrics || "Paroles non disponibles";
  } catch (error) {
    console.error('Erreur lors de la récupération des paroles:', error);
    throw error;
  }
};

export const getSongDetails = async (songId) => {
  try {
    const response = await fetch(`${DEEZER_API}/track/${songId}`);
    
    if (!response.ok) {
      throw new Error(`Erreur réseau: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erreur lors de la récupération des détails:', error);
    throw error;
  }
};