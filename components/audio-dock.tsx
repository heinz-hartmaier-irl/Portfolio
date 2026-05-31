"use client";

import { ChevronDown, GripVertical, Pause, Play, Radio, SkipForward, Volume2 } from "lucide-react";
import { motion, useDragControls } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { tracks } from "@/lib/radio";

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${remainingSeconds}`;
}

function EchoRings({
  active,
  roundedClassName
}: {
  active: boolean;
  roundedClassName: string;
}) {
  return (
    <span className="pointer-events-none absolute inset-0 z-0">
      {[0, 1, 2].map((ring) => (
        <motion.span
          key={ring}
          className={`absolute inset-0 border border-rose/35 ${roundedClassName}`}
          initial={false}
          animate={
            active
              ? {
                  opacity: [0.22, 0],
                  scale: [1, 1.45],
                  rotate: [0, ring % 2 === 0 ? 4 : -4]
                }
              : { opacity: 0, scale: 1, rotate: 0 }
          }
          transition={
            active
              ? {
                  duration: 1.35,
                  repeat: Infinity,
                  repeatDelay: ring * 0.12,
                  ease: "easeOut"
                }
              : { duration: 0.2 }
          }
          style={{
            inset: ring * 2 - 2,
            transformOrigin: "center"
          }}
        />
      ))}
    </span>
  );
}

export function AudioDock() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const dragControls = useDragControls();
  const [trackIndex, setTrackIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.05);
  const [open, setOpen] = useState(false);
  const track = tracks[trackIndex];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.src = track.src;
    audio.load();
    setProgress(0);
    setCurrentTime(0);
    setDuration(0);
    if (playing) {
      audio.play().catch(() => setPlaying(false));
    }
  }, [track.src, playing]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
  }, [volume]);

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

  const seekToProgress = (nextProgress: number) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const nextTime = (nextProgress / 100) * duration;
    audio.currentTime = nextTime;
    setCurrentTime(nextTime);
    setProgress(nextProgress);
  };

  const icon = (
    <span className="relative grid h-10 w-10 place-items-center rounded-md bg-rose/[0.16] text-rose">
      <Radio size={18} />
    </span>
  );

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <audio
        ref={audioRef}
        preload="none"
        onLoadedMetadata={(event) => {
          const audio = event.currentTarget;
          setDuration(audio.duration || 0);
          audio.volume = volume;
        }}
        onTimeUpdate={(event) => {
          const audio = event.currentTarget;
          setCurrentTime(audio.currentTime);
          setDuration(audio.duration || 0);
          setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0);
        }}
        onEnded={nextTrack}
      />

      {!open ? (
        <motion.button
          type="button"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => setOpen(true)}
        className="relative isolate grid h-12 w-12 place-items-center rounded-full border border-line/30 bg-navy/90 text-text shadow-glow backdrop-blur-xl"
        aria-label="Ouvrir la radio"
        title="Radio"
      >
        <EchoRings active={playing} roundedClassName="rounded-full" />
        <span className="relative z-10">
          <Radio size={18} />
        </span>
      </motion.button>
      ) : (
        <motion.aside
          drag
          dragControls={dragControls}
          dragListener={false}
          dragMomentum={false}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          whileDrag={{ scale: 1.02 }}
          className="relative isolate w-[min(22rem,calc(100vw-2rem))] cursor-grab rounded-lg border border-line/30 bg-navy/90 p-3 pt-10 shadow-glow backdrop-blur-xl active:cursor-grabbing"
        >
          <EchoRings active={playing} roundedClassName="rounded-lg" />
          <button
            type="button"
            className="focus-ring absolute left-2 top-2 grid h-8 w-8 place-items-center rounded-md border border-line/30 text-muted"
            onPointerDown={(event) => dragControls.start(event)}
            aria-label="Déplacer la radio"
            title="Déplacer"
          >
            <GripVertical size={16} />
          </button>

          <div className="relative z-10 flex items-center gap-3">
            {icon}
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
            <button
              type="button"
              className="focus-ring grid h-9 w-9 place-items-center rounded-md border border-line/30 text-muted"
              onClick={() => setOpen(false)}
              aria-label="Réduire la radio"
            >
              <ChevronDown size={17} />
            </button>
          </div>

          <div className="mt-3 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[11px] tabular-nums text-muted">{formatTime(currentTime)}</span>
              <input
                type="range"
                min={0}
                max={100}
                step={0.1}
                value={progress}
                onChange={(event) => seekToProgress(Number(event.currentTarget.value))}
                aria-label="Position de lecture"
                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-line/20 accent-orange"
              />
              <span className="text-[11px] tabular-nums text-muted">{formatTime(duration)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Volume2 size={14} className="text-muted" />
              <input
                type="range"
                min={0}
                max={100}
                step={1}
                value={Math.round(volume * 100)}
                onChange={(event) => setVolume(Number(event.currentTarget.value) / 100)}
                aria-label="Volume"
                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-line/20 accent-gold"
              />
              <span className="w-10 text-right text-[11px] tabular-nums text-muted">
                {Math.round(volume * 100)}%
              </span>
            </div>
          </div>
        </motion.aside>
      )}
    </div>
  );
}
