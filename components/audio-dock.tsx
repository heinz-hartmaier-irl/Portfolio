"use client";

import { Pause, Play, Radio, SkipForward, Volume2 } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { tracks } from "@/lib/content";

export function AudioDock() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [trackIndex, setTrackIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const track = tracks[trackIndex];

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.src = track.src;
    setProgress(0);
    if (playing) {
      audioRef.current.play().catch(() => setPlaying(false));
    }
  }, [track.src, playing]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }
    audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  };

  const nextTrack = () => {
    setTrackIndex((index) => (index + 1) % tracks.length);
  };

  return (
    <motion.aside
      drag
      dragMomentum={false}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      whileDrag={{ scale: 1.02 }}
      className="fixed bottom-4 right-4 z-50 w-[min(22rem,calc(100vw-2rem))] cursor-grab rounded-lg border border-line/30 bg-navy/90 p-3 shadow-glow backdrop-blur-xl active:cursor-grabbing"
    >
      <audio
        ref={audioRef}
        preload="none"
        onTimeUpdate={(event) => {
          const audio = event.currentTarget;
          setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0);
        }}
        onEnded={nextTrack}
      />
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-md bg-rose/[0.16] text-rose">
          <Radio size={18} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-text">{track.title}</p>
          <p className="truncate text-xs text-muted">{track.artist}</p>
        </div>
        <button
          type="button"
          className="focus-ring grid h-9 w-9 place-items-center rounded-md bg-gold text-ink"
          onClick={togglePlay}
          aria-label={playing ? "Mettre en pause" : "Lire la musique"}
        >
          {playing ? <Pause size={17} /> : <Play size={17} />}
        </button>
        <button
          type="button"
          className="focus-ring grid h-9 w-9 place-items-center rounded-md border border-line/30 text-muted"
          onClick={nextTrack}
          aria-label="Musique suivante"
        >
          <SkipForward size={17} />
        </button>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <Volume2 size={14} className="text-muted" />
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-line/20">
          <div className="h-full rounded-full bg-orange" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </motion.aside>
  );
}
