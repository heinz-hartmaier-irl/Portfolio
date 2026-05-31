export type RadioTrack = {
  title: string;
  artist: string;
  file: string;
  src: string;
};

const radioFiles = [
  { title: "Alright", artist: "Radio locale", file: "Alright.mp3" },
  { title: "Cream", artist: "Radio locale", file: "CREAM.mp3" },
  { title: "Daily", artist: "Radio locale", file: "Daily.mp3" },
  { title: "Vacation", artist: "Radio locale", file: "Vacation.mp3" },
  { title: "Waiting on You", artist: "Radio locale", file: "WAITING_ON_YOU.mp3" }
] as const;

export const tracks: RadioTrack[] = radioFiles.map((track) => ({
  ...track,
  src: `/api/music/${encodeURIComponent(track.file)}`
}));
