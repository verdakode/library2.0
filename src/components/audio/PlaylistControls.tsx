import React from "react";

interface PlaylistControlsProps {
  onPrevious: () => void;
  onNext: () => void;
  onShuffle: () => void;
  isPlaying: boolean;
  onPlayPause: () => void;
}

export const PlaylistControls: React.FC<PlaylistControlsProps> = ({
  onPrevious,
  onNext,
  onShuffle,
  isPlaying,
  onPlayPause,
}) => {
  return (
    <div className="playlist-controls">
      <button onClick={onPrevious}>Previous</button>
      <button onClick={onPlayPause}>{isPlaying ? "Pause" : "Play"}</button>
      <button onClick={onNext}>Next</button>
      <button onClick={onShuffle}>Shuffle</button>
    </div>
  );
};

export default PlaylistControls;
