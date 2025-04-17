// src/components/AudioPlayer.jsx
import React, { useEffect, useState, useRef } from 'react';
import { useSongContext } from '../context/SongContext';

const AudioPlayer = ({ previewUrl }) => {
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);
  const { isPlaying, playSong, pauseSong } = useSongContext();

  useEffect(() => {
    const audio = audioRef.current;
    
    if (audio) {
      audio.addEventListener('loadedmetadata', () => {
        setDuration(audio.duration);
      });
      
      audio.addEventListener('timeupdate', () => {
        setCurrentTime(audio.currentTime);
        setProgress((audio.currentTime / audio.duration) * 100);
      });
      
      return () => {
        audio.removeEventListener('loadedmetadata', () => {});
        audio.removeEventListener('timeupdate', () => {});
      };
    }
  }, []);

  const handlePlayPause = () => {
    if (isPlaying) {
      pauseSong();
    } else {
      playSong(previewUrl);
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const handleProgressChange = (e) => {
    const newProgress = e.target.value;
    setProgress(newProgress);
    
    if (audioRef.current) {
      audioRef.current.currentTime = (newProgress / 100) * duration;
    }
  };

  return (
    <div className="audio-player">
      <audio ref={audioRef} src={previewUrl} />
      
      <div className="player-controls">
        <button className="play-pause-button" onClick={handlePlayPause}>
          {isPlaying ? 'Pause' : 'Lecture'}
        </button>
        
        <div className="progress-container">
          <span className="time">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleProgressChange}
            className="progress-bar"
          />
          <span className="time">{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;