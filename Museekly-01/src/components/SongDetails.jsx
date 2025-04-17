import React from 'react';

function SongDetails({ song }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto mt-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">{song.title}</h2>
      <h3 className="text-xl text-green-600 mb-4">{song.artist}</h3>
      
      {song.album && (
        <p className="text-gray-600 mb-6">
          <span className="font-semibold">Album:</span> {song.album}
        </p>
      )}
      
      <div className="border-t pt-4">
        <h4 className="text-lg font-semibold text-gray-700 mb-3">Paroles :</h4>
        <pre className="whitespace-pre-wrap font-sans text-gray-800 bg-gray-50 p-4 rounded-lg overflow-x-auto">
          {song.lyrics}
        </pre>
      </div>
    </div>
  );
}

export default SongDetails;