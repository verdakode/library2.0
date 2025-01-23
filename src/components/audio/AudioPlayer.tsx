import React from "react";

interface AudioPlayerProps {
  src: string;
  title?: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, title }) => {
  return (
    <div className="audio-player">
      <h3>{title}</h3>
      <audio controls>
        <source src={src} />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default AudioPlayer;
