import { useState, useEffect, useRef } from "react";

interface UseAudioProps {
  src: string;
  autoPlay?: boolean;
}

interface UseAudioReturn {
  playing: boolean;
  duration: number;
  currentTime: number;
  play: () => void;
  pause: () => void;
  seek: (time: number) => void;
}

export const useAudio = ({ src, autoPlay = false }: UseAudioProps): UseAudioReturn => {
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(src);
    const audio = audioRef.current;

    audio.addEventListener("loadedmetadata", () => {
      setDuration(audio.duration);
    });

    audio.addEventListener("timeupdate", () => {
      setCurrentTime(audio.currentTime);
    });

    if (autoPlay) {
      audio.play();
      setPlaying(true);
    }

    return () => {
      audio.pause();
      audio.remove();
    };
  }, [src, autoPlay]);

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setPlaying(true);
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setPlaying(false);
    }
  };

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  return {
    playing,
    duration,
    currentTime,
    play,
    pause,
    seek,
  };
};

export default useAudio;
