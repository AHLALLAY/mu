import React from 'react';

function SongList({ songs, setSelectedSong }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Résultats</h2>
      <ul className="divide-y divide-gray-200">
        {songs.map((song) => (
          <li 
            key={song.id} 
            onClick={() => setSelectedSong(song)}
            className="py-3 px-2 hover:bg-green-50 cursor-pointer transition-colors duration-200"
          >
            <div className="font-medium text-gray-900">{song.title}</div>
            <div className="text-sm text-gray-600">{song.artist}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SongList;