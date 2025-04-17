import axios from 'axios';

// Remarque: Vous devrez utiliser une API réelle comme lyrics.ovh ou une autre
const API_URL = 'https://api.lyrics.ovh';

export const searchLyrics = async (query) => {
  try {
    const response = await axios.get(`${API_URL}/suggest/${query}`);
    console.log(response.data.data);

    return response.data.data.map(item => ({
      
      id: item.id,
      title: item.title,
      artist: item.artist.name,
      album: item.album?.title || 'Inconnu'
    }));
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Fonction pour obtenir les paroles (à implémenter si nécessaire)
export const getLyrics = async (artist, title) => {
  try {
    const response = await axios.get(`${API_URL}/v1/${artist}/${title}`);
    return response.data.lyrics;
  } catch (error) {
    console.error('Lyrics Error:', error);
    return 'Paroles non disponibles';
  }
};